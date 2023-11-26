<script lang="ts">
  let loggedin:boolean = false;
  import { onMount } from 'svelte';
  import { setCookie, getCookie, deleteCookie } from './lib/cookie';
  import axios from 'axios';
  import Footer from './lib/Footer.svelte';

  let username = '';
  let password = '';
  let showSettings = false;
  let loading = false;
  // let accessToken = "";
  let userdata = {
    classes: [],
    grades: [],
    token: "",
  }
  onMount(() => {

      username = getCookie('username');
      // userdata.token = getCookie('token')
      // if (userdata.token===null){
      //     loggedin= false;
      // } else {
      //     get_grades_token();
      // }
      if (username === null) {
          username = '';
      }
  });

  const login = async () => {
      try {
          const response = await fetch("/api/token", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  username: username,
                  password: password,
              }),
          });

      if (!response.ok) {
          throw new Error("Authentication failed");
      }
      const data = await response.json();
      // accessToken = data.access_token;
      setCookie("token",data.access_token,0.1);
      loggedin = true;

      // get_grades()


  } catch (error) {
    console.error("Login failed:", error.message);
  }

};

const get_grades = async () => {
  loading = true;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
          const response = await fetch("/api/grades", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  username: username,
                  password: password,
              }),
              signal: controller.signal,
          });

      if (!response.ok) {
          throw new Error("Authentication failed");
          loading = false
      } else {

        const data = await response.json();
        userdata.classes = data.classes;
        userdata.grades = data.grades;
        // userdata.token = data.access_token
        // setCookie("token",data.access_token,0.02);
        setCookie('username', username, 14);
        loggedin = true;
        loading = false
        // console.log(userdata.classes);
        // console.log(userdata.grades)
        
        // setCookie("token",data.access_token,0.1);
        // loggedin = true;
      }

  } catch (error) {
    console.error("Login failed:", error.message);
    loading = false
  }
};

const get_grades_token = async () => {
  try {
    const response = await fetch("/api/access", {
      headers: {
        Authorization: `Bearer ${userdata.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();
    // console.log(data.user.sub);
    username = data.username;
    userdata.classes = data.classes;
    userdata.grades = data.grades
    // await get_grades();
    loggedin = true;
  } catch (error) {
    console.error("Token access failed:", error.message);
    loggedin = false;
  }
};

  function handleSubmit() {
    // Perform form submission logic here, e.g., API calls or validation
    // Reset form fields
    get_grades();
  }

  function toggleSettings() {
    showSettings = !showSettings;
  }

</script>


<main class = "w-full min-h-screen items-center">
  {#if !loggedin && !loading}
  <div class="justify-center">
    <section class="w-full  ">
      <h1 class = " font-extrabold -mt-2 tracking-wide text-[64px] w-full text-center font-mono p-4">SPC Reborn</h1>
      <div class=" w-1/3 mx-auto -mt-8  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-[3px]"/>
      <!-- <img class="mx-auto" alt="phoenix" src="/src/assets/phoenix.jpg" style="width:80px;height:80px;"/> -->
    </section>
    <div class=" mt-32 flex items-center justify-center">
      <div class=" shadow-[0_3px_10px_rgba(0,0,0,0.20)] w-fit m-auto rounded-md">
          <form on:submit|preventDefault={handleSubmit} class = " w-fit mx-auto px-7 pt-8 pb-12 center-content text-center space-y-2 ">
              <h3 class = "text-3xl font-semibold pb-3 font-mono">Log in</h3>
              <input bind:value={username}  class = "border-solid p-1 rounded-md border-2 w-80 " type="text" name="username" placeholder="Username" />
              <p/>
              <input bind:value={password}  class = "border-solid p-1 rounded-md border-2 w-80" type="password" name="password" placeholder="Password" />
              <p/>
              <button class ="inline-block transition duration-150 ease-in-out rounded-lg py-1 px-8 w-80 bg-gradient-to-r from-amber-500 to-red-500 text-lg font-bold font-sans hover:outline-stone-800 active:outline-stone-800 focus:outline-stone-800 outline-offset-0  outline-none outline-2" type="submit" name="submit" value="Login">Submit</button>
          </form>
      </div>      
    </div>
  </div>
  <div class="absolute w-full bottom-0">
    <Footer/>
  </div>
    
    {/if}
    {#if !loggedin && loading}
    <div class="w-full h-screen flex flex-col justify-center items-center">
      <div class="absolute inline-block h-[80px] w-[80px] animate-spin rounded-full border-8 border-solid border-current border-white border-r-yellow-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style="animation-duration: 1.3s;" role="status">
      </div>
      <div class="absolute inline-block h-[120px] w-[120px] animate-spin rounded-full border-8 border-solid border-current border-white border-r-red-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style="animation-direction: reverse; animation-duration: 2s;" role="status">
      </div>
      <div class="absolute inline-block h-[160px] w-[160px] animate-spin rounded-full border-8 border-solid border-current border-white border-r-pink-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" style="animation-duration: 3s;" role="status">
      </div>
      <h1 class=" mt-60 text-[32px] font-mono">Loading...</h1>
      <div class="absolute w-full bottom-0">
        <Footer/>
      </div>
    </div>
    {/if}
    {#if loggedin && !showSettings}
    <div class="w-full h-full">
    <div class="mx-auto w-1/3 my-6 items-center justify-center">
      <div class="w-full flex">
        <h1 class= "text-center text-3xl py-1 tracking-wide font-semibold text-neutral-800 bg-white w-full h-full"><b class="font-bold text-black">Hello,</b> {username.toUpperCase()}</h1>
        <div on:click={toggleSettings} on:keydown={toggleSettings}  role="button" tabindex="0">

          <svg class="h-8 w-8 cursor-pointer text-black" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </div>
      </div>
      <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-[3px]"/>
    </div>
    <div class="mx-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:mx-32 gap-4">
      {#each userdata.classes as className, i}
      <div class="block rounded-lg bg-white p-6 m-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.06)]">
        <h5 class="text-2xl text-center p-2 font-medium flex-wrap break-words leading-tight text-neutral-800">
          {className}
        </h5>
        <p class="p-1 font-mono font-bold text-5xl text-neutral-600 text-center">
          {userdata.grades[i]}
        </p>
      </div>
      {/each}
    </div>
    <Footer/>

  </div>
  {/if}
  {#if loggedin && showSettings}
  <div class="w-full h-full">
    <div class="mx-auto w-1/3 my-6 items-center justify-center">
      <div class="w-full flex">
        <h1 class= "text-center text-3xl py-1 tracking-wide font-semibold bg-white w-full h-full"><b class="font-bold">Hello,</b> {username.toUpperCase()}</h1>
        <div on:click={toggleSettings} on:keydown={toggleSettings}  role="button" tabindex="0">

          <svg class="h-8 w-8 cursor-pointer text-black" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </div>
      </div>
      <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-[3px]"/>
    </div>
    <!-- form code -->
      <div class=" mt-32 flex items-center justify-center">
        <div class=" shadow-[0_3px_10px_rgba(0,0,0,0.20)] w-fit m-auto rounded-md">
            <form on:submit|preventDefault={handleSubmit} class = " w-[400px] mx-auto px-7 pt-5 pb-7 center-content text-center space-y-2 ">
                <h3 class = "text-3xl font-semibold pb-3 font-mono">Settings</h3>
                <h4 class = "text-2xl font-mono pb-20">Coming Soon!</h4>
                <!-- <div>
                  <p>Display Name:</p>
                  <input bind:value={username}  class = "border-solid p-1 rounded-md border-2 w-80 " type="text" name="username" placeholder="Username" />
                </div>
                <p/>
                <input bind:value={password}  class = "border-solid p-1 rounded-md border-2 w-80" type="password" name="password" placeholder="Password" />
                <p/>
                <button class ="inline-block transition duration-150 ease-in-out rounded-lg py-1 px-8 w-80 bg-gradient-to-r from-amber-500 to-red-500 text-lg font-bold font-sans hover:outline-stone-800 active:outline-stone-800 focus:outline-stone-800 outline-offset-0  outline-none outline-2" type="submit" name="submit" value="Login">Submit</button> -->
            </form>
        </div>      
      </div>
    </div>
    <!-- Bottom footer -->
    <div class="absolute w-full bottom-0">
      <Footer/>
    </div>
  {/if}
</main>
