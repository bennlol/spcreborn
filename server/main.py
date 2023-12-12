from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service

from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
# from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse

# from jose import JWTError, jwt
from passlib.context import CryptContext
# from datetime import datetime, timedelta
from pydantic import BaseModel

import uvicorn

from multiprocessing import Pool
import time
# import asyncio
from pathlib import Path
import os

URL = "https://ebr.edgear.net/progress"
MAX_DRIVERS = 20
MIN_WAITING_DRIVERS = 3
MAX_WAITING_DRIVERS = 6
CHROME_OPTIONS= webdriver.ChromeOptions()
CHROME_OPTIONS.add_argument('--headless')
CHROME_OPTIONS.add_argument('--disable-gpu')
CHROME_OPTIONS.add_argument("--no-sandbox") #running it in a docker container
CHROME_OPTIONS.add_argument("--disable-dev-shm-usage")
# chrome_prefs = {}
# CHROME_OPTIONS.experimental_options["prefs"] = chrome_prefs
# chrome_prefs["profile.default_content_settings"] = {"images": 2}
CHROME_OPTIONS.add_argument('--log-level=3')
CHROME_OPTIONS.add_argument('--disable-software-rasterizer')
CHROME_OPTIONS.add_argument('--disable-features=site-per-process')

# FIREFOX_OPTIONS = webdriver.FirefoxOptions()
# FIREFOX_OPTIONS.set_preference("browser.cache.disk.enable", False)
# FIREFOX_OPTIONS.set_preference("browser.cache.memory.enable", False)
# FIREFOX_OPTIONS.add_argument("--headless")
# FIREFOX_OPTIONS.set_preference("layers.acceleration.disabled", True)
# chrome_driver_path = "/usr/bin/chromedriver"

class Driver:
    def __init__(self):
        self.driver = webdriver.Chrome(options=CHROME_OPTIONS)
        self.timeUsed = time.time()
        self.driver.get(URL)
        self.used = False
        self.released = True
        
    def use(self):
        self.released = False
        self.used = True
        self.timeUsed = time.time()
        
    def release(self):
        self.used = False
    
    def refresh(self):
        self.driver.get(URL)
        self.released = True
        
    def restart(self):
        self.driver.quit()
        self.driver = webdriver.Chrome(options=CHROME_OPTIONS)
        self.driver.get(URL)
        self.used = False
        self.released = True
        self.timeUsed = time.time()
    
    def kill(self):
        self.driver.quit()
    
def cleanDrivers() -> None:
    for i in range(len(drivers)-1,-1,-1):
        driver = drivers[i]
        if (driver.used == False):
            notusedsum = sum([1 for x in drivers if x.used==False])
            if notusedsum>MAX_WAITING_DRIVERS:
                driver.kill()
                drivers.pop(i)
            elif (driver.used == False and driver.released == False):
                driver.refresh()
        elif (driver.used and time.time() - driver.timeUsed>30):
            driver.restart()
    notusedsum = sum([1 for x in drivers if x.used==False])
    if notusedsum<=MIN_WAITING_DRIVERS:
        drivers.append(Driver())
            

def getDriver():
    for driver in drivers:
        if (driver.released==True and driver.used == False):
            driver.use()
            return driver
    if len(drivers) < MAX_DRIVERS:
        drivers.append(Driver())
        return drivers[-1]
    starttime = time.time()
    while time.time()-starttime<60:
        for driver in drivers:
            if (driver.released==True and driver.used == False):
                driver.use()
                return driver
        if len(drivers) < MAX_DRIVERS:
            drivers.append(Driver())
            return drivers[-1]
    raise "Driver Exhaustion"

SECRET_KEY = "X76TLa3*&e!P5%weQTgsmx^T^eGtUtAnZdQt!HNS!5u!4yW8dbRzaMNcqtqt2mC!rEdTn62MxCp" #just for testing
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
drivers = [Driver(), Driver(), Driver()]
memoryDB = {}
def get_grades(username, password):
    # begin = time.time()
    # options = webdriver.ChromeOptions() #newly added 
    # options.add_argument('--headless')
    # # options.add_argument('--disable-gpu')
    # # options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
    # # options.add_argument("window-size=2000x1000")

    # driver = webdriver.Chrome(options=options)
    # driver = browser_pool.apply_async(webdriver.Chrome, args=(options,))
    browser = getDriver()
    # print(time.time()-begin)
    # # print(time.time()-start)
    # # time.sleep(10)
    browser.driver.find_element("id", "isc_G").send_keys(username)
    # # time.sleep(4)
    browser.driver.find_element("id", "isc_I").send_keys(password)
    # # time.sleep(4)
    browser.driver.find_element("id", "isc_C").click()
    # # time.sleep(2)
    try:
        xpath = f"//*[contains(text(), 'Grade')]"
        WebDriverWait(browser.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, xpath))  # Replace with the actual XPath of the popup
        )
        time.sleep(0.5)
        browser.driver.find_element(By.XPATH, xpath).click()
    except:
        browser.driver.find_element("id", "isc_9Q").click()
        time.sleep(0.5)
        xpath = f"//*[contains(text(), 'Grade')]"
        element = browser.driver.find_element(By.XPATH, xpath).click()
    
    # Click on the element
    # driver.find_element("id", "isc_8X").click()
    xpath = f"//*[contains(text(), 'Tardy')]"
    WebDriverWait(browser.driver, 5).until(
        EC.presence_of_element_located((By.XPATH, xpath))  # Replace with the actual XPath of the popup
    )

    # Extract text from the entire page
    page = browser.driver.find_element(By.TAG_NAME, 'body').text.split("\n")
    browser.release()
    tardyIndex = page.index("Tardy")
    page = page[tardyIndex+1:]
    pagenospace = ["".join(line.split(" ")) for line in page]
    perIndexes = [pagenospace[x-1] for x in range(len(page)) if page[x] and page[x][-1]=="."]
    classes = [page[x] for x in range(len(page)) if len(pagenospace[x])>4 and pagenospace[x][-1]!="."][:len(perIndexes)]
    # access_token = create_jwt_token(data={"sub": username}, expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES)
    # memoryDB[username] = [classes, perIndexes, time.time()]
    return {'classes':classes, 'grades':perIndexes}


# def create_jwt_token(data: dict, expires_delta: timedelta):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# # Function to decode JWT token
# def decode_jwt_token(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         raise credentials_exception

# # Function to verify password
# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# # Function to get hashed password
# def get_password_hash(password):
#     return pwd_context.hash(password)

app = FastAPI()           

class UserCredentials(BaseModel):
    username: str
    password: str

build_path = Path(__file__).parent.parent / "client" / "dist"

# @app.post("/api/token")
# def login_for_access_token(credentials: UserCredentials):
#     username = credentials.username
#     password = credentials.password
#     #check if user
#     expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_jwt_token(data={"sub": username}, expires_delta=expires)
#     return {"access_token": access_token, "token_type": "bearer"}

# # Protected endpoint that requires token
# @app.get("/api/access")
# async def protected_route(current_user: dict = Depends(decode_jwt_token)):
#     if current_user in memoryDB:
#         return {"username": current_user, "classes": memoryDB[current_user][0], "grades": memoryDB[current_user][1]}
#     raise HTTPException(
#             status_code=401,
#             detail="Incorrect Token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )

@app.post("/api/grades")
def login(credentials: UserCredentials, background_tasks: BackgroundTasks):
    try:
        start = time.time()
        assert len(str(credentials.username))<11
        assert len(str(credentials.username))<10
        grades = get_grades(str(credentials.username), str(credentials.password))
        background_tasks.add_task(cleanDrivers)
        print("Time2Query: "+str(time.time()-start))
        return grades
    except Exception as e:
        background_tasks.add_task(cleanDrivers)
        raise HTTPException(status_code=500, detail=str(e))

app.mount("/", StaticFiles(directory=build_path, html=True), name="dist")
# @repeat_every(seconds=10)  # 1 hour


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
