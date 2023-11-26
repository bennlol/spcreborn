var xe=Object.defineProperty;var ye=(t,e,n)=>e in t?xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ee=(t,e,n)=>(ye(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(o){if(o.ep)return;o.ep=!0;const d=n(o);fetch(o.href,d)}})();function V(){}function me(t){return t()}function oe(){return Object.create(null)}function P(t){t.forEach(me)}function he(t){return typeof t=="function"}function ge(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function $e(t){return Object.keys(t).length===0}function i(t,e){t.appendChild(e)}function A(t,e,n){t.insertBefore(e,n||null)}function T(t){t.parentNode&&t.parentNode.removeChild(t)}function ke(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function p(t){return document.createElement(t)}function z(t){return document.createTextNode(t)}function _(){return z(" ")}function O(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function be(t){return function(e){return e.preventDefault(),t.call(this,e)}}function a(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ce(t){return Array.from(t.childNodes)}function X(t,e){e=""+e,t.data!==e&&(t.data=e)}function J(t,e){t.value=e??""}function K(t,e,n,l){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,l?"important":"")}let F;function R(t){F=t}function Le(){if(!F)throw new Error("Function called outside component initialization");return F}function Ee(t){Le().$$.on_mount.push(t)}const B=[],re=[];let I=[];const ie=[],He=Promise.resolve();let ne=!1;function Se(){ne||(ne=!0,He.then(_e))}function le(t){I.push(t)}const te=new Set;let U=0;function _e(){if(U!==0)return;const t=F;do{try{for(;U<B.length;){const e=B[U];U++,R(e),je(e.$$)}}catch(e){throw B.length=0,U=0,e}for(R(null),B.length=0,U=0;re.length;)re.pop()();for(let e=0;e<I.length;e+=1){const n=I[e];te.has(n)||(te.add(n),n())}I.length=0}while(B.length);for(;ie.length;)ie.pop()();ne=!1,te.clear(),R(t)}function je(t){if(t.fragment!==null){t.update(),P(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(le)}}function Te(t){const e=[],n=[];I.forEach(l=>t.indexOf(l)===-1?e.push(l):n.push(l)),n.forEach(l=>l()),I=e}const Q=new Set;let N;function W(){N={r:0,c:[],p:N}}function G(){N.r||P(N.c),N=N.p}function L(t,e){t&&t.i&&(Q.delete(t),t.i(e))}function j(t,e,n,l){if(t&&t.o){if(Q.has(t))return;Q.add(t),N.c.push(()=>{Q.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}function se(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function Y(t){t&&t.c()}function D(t,e,n){const{fragment:l,after_update:o}=t.$$;l&&l.m(e,n),le(()=>{const d=t.$$.on_mount.map(me).filter(he);t.$$.on_destroy?t.$$.on_destroy.push(...d):P(d),t.$$.on_mount=[]}),o.forEach(le)}function q(t,e){const n=t.$$;n.fragment!==null&&(Te(n.after_update),P(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ae(t,e){t.$$.dirty[0]===-1&&(B.push(t),Se(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function we(t,e,n,l,o,d,r,c=[-1]){const f=F;R(t);const s=t.$$={fragment:null,ctx:[],props:d,update:V,not_equal:o,bound:oe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:oe(),dirty:c,skip_bound:!1,root:e.target||f.$$.root};r&&r(s.root);let u=!1;if(s.ctx=n?n(t,e.props||{},(m,x,...g)=>{const v=g.length?g[0]:x;return s.ctx&&o(s.ctx[m],s.ctx[m]=v)&&(!s.skip_bound&&s.bound[m]&&s.bound[m](v),u&&Ae(t,m)),x}):[],s.update(),u=!0,P(s.before_update),s.fragment=l?l(s.ctx):!1,e.target){if(e.hydrate){const m=Ce(e.target);s.fragment&&s.fragment.l(m),m.forEach(T)}else s.fragment&&s.fragment.c();e.intro&&L(t.$$.fragment),D(t,e.target,e.anchor),_e()}R(f)}class ve{constructor(){ee(this,"$$");ee(this,"$$set")}$destroy(){q(this,1),this.$destroy=V}$on(e,n){if(!he(n))return V;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(e){this.$$set&&!$e(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Me="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Me);function Oe(t,e,n){const l=new Date;l.setTime(l.getTime()+n*24*60*60*1e3),document.cookie=`${t}=${encodeURIComponent(e)};expires=${l.toUTCString()};path=/`}function Pe(t){const e=document.cookie.split(";");for(let n=0;n<e.length;n++){const l=e[n].trim();if(l.startsWith(`${t}=`))return decodeURIComponent(l.substring(t.length+1))}return null}function Ne(t){let e;return{c(){e=p("section"),e.innerHTML='<div class="flex justify-center"><p class="text-gray-700 ml-10 mr-auto my-1 float-left">©EBReborn</p> <a href="https://github.com/bennlol/ebreborn" class="text-gray-700 absolute mx-10 my-1">EBReborn is open-source on https://github.com/bennlol/ebreborn</a> <p class="text-gray-700 ml-auto mr-10 my-1 float-right">Beta</p></div> <div class="w-full h-[5px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>'},m(n,l){A(n,e,l)},p:V,i:V,o:V,d(n){n&&T(e)}}}class Z extends ve{constructor(e){super(),we(this,e,null,Ne,ge,{})}}function ue(t,e,n){const l=t.slice();return l[13]=e[n],l[15]=n,l}function ae(t){let e,n,l,o,d,r,c,f,s,u,m,x,g,v,E,k,C,S,H,$,w,b,y;return $=new Z({}),{c(){e=p("div"),n=p("section"),n.innerHTML='<h1 class="font-extrabold -mt-2 tracking-wide text-[64px] w-full text-center font-mono p-4">SPC Reborn</h1> <div class="w-1/3 mx-auto -mt-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-[3px]"></div>',l=_(),o=p("div"),d=p("div"),r=p("form"),c=p("h3"),c.textContent="Log in",f=_(),s=p("input"),u=_(),m=p("p"),x=_(),g=p("input"),v=_(),E=p("p"),k=_(),C=p("button"),C.textContent="Submit",S=_(),H=p("div"),Y($.$$.fragment),a(n,"class","w-full "),a(c,"class","text-3xl font-semibold pb-3 font-mono"),a(s,"class","border-solid p-1 rounded-md border-2 w-80 "),a(s,"type","text"),a(s,"name","username"),a(s,"placeholder","Username"),a(g,"class","border-solid p-1 rounded-md border-2 w-80"),a(g,"type","password"),a(g,"name","password"),a(g,"placeholder","Password"),a(C,"class","inline-block transition duration-150 ease-in-out rounded-lg py-1 px-8 w-80 bg-gradient-to-r from-amber-500 to-red-500 text-lg font-bold font-sans hover:outline-stone-800 active:outline-stone-800 focus:outline-stone-800 outline-offset-0 outline-none outline-2"),a(C,"type","submit"),a(C,"name","submit"),C.value="Login",a(r,"class","w-fit mx-auto px-7 pt-8 pb-12 center-content text-center space-y-2 "),a(d,"class","shadow-[0_3px_10px_rgba(0,0,0,0.20)] w-fit m-auto rounded-md"),a(o,"class","mt-32 flex items-center justify-center"),a(e,"class","justify-center"),a(H,"class","absolute w-full bottom-0")},m(h,M){A(h,e,M),i(e,n),i(e,l),i(e,o),i(o,d),i(d,r),i(r,c),i(r,f),i(r,s),J(s,t[1]),i(r,u),i(r,m),i(r,x),i(r,g),J(g,t[2]),i(r,v),i(r,E),i(r,k),i(r,C),A(h,S,M),A(h,H,M),D($,H,null),w=!0,b||(y=[O(s,"input",t[8]),O(g,"input",t[9]),O(r,"submit",be(t[6]))],b=!0)},p(h,M){M&2&&s.value!==h[1]&&J(s,h[1]),M&4&&g.value!==h[2]&&J(g,h[2])},i(h){w||(L($.$$.fragment,h),w=!0)},o(h){j($.$$.fragment,h),w=!1},d(h){h&&(T(e),T(S),T(H)),q($),b=!1,P(y)}}}function fe(t){let e,n,l,o,d,r,c,f,s,u,m,x;return m=new Z({}),{c(){e=p("div"),n=p("div"),n.innerHTML="",l=_(),o=p("div"),o.innerHTML="",d=_(),r=p("div"),r.innerHTML="",c=_(),f=p("h1"),f.textContent="Loading...",s=_(),u=p("div"),Y(m.$$.fragment),a(n,"class","absolute inline-block h-[80px] w-[80px] animate-spin rounded-full border-8 border-solid border-current border-white border-r-yellow-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"),K(n,"animation-duration","1.3s"),a(n,"role","status"),a(o,"class","absolute inline-block h-[120px] w-[120px] animate-spin rounded-full border-8 border-solid border-current border-white border-r-red-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"),K(o,"animation-direction","reverse"),K(o,"animation-duration","2s"),a(o,"role","status"),a(r,"class","absolute inline-block h-[160px] w-[160px] animate-spin rounded-full border-8 border-solid border-current border-white border-r-pink-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"),K(r,"animation-duration","3s"),a(r,"role","status"),a(f,"class","mt-60 text-[32px] font-mono"),a(u,"class","absolute w-full bottom-0"),a(e,"class","w-full h-screen flex flex-col justify-center items-center")},m(g,v){A(g,e,v),i(e,n),i(e,l),i(e,o),i(e,d),i(e,r),i(e,c),i(e,f),i(e,s),i(e,u),D(m,u,null),x=!0},i(g){x||(L(m.$$.fragment,g),x=!0)},o(g){j(m.$$.fragment,g),x=!1},d(g){g&&T(e),q(m)}}}function ce(t){let e,n,l,o,d,r,c=t[1].toUpperCase()+"",f,s,u,m,x,g,v,E,k,C,S,H,$=se(t[5].classes),w=[];for(let b=0;b<$.length;b+=1)w[b]=de(ue(t,$,b));return k=new Z({}),{c(){e=p("div"),n=p("div"),l=p("div"),o=p("h1"),d=p("b"),d.textContent="Hello,",r=_(),f=z(c),s=_(),u=p("div"),u.innerHTML='<svg class="h-8 w-8 cursor-pointer text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',m=_(),x=p("div"),g=_(),v=p("div");for(let b=0;b<w.length;b+=1)w[b].c();E=_(),Y(k.$$.fragment),a(d,"class","font-bold text-black"),a(o,"class","text-center text-3xl py-1 tracking-wide font-semibold text-neutral-800 bg-white w-full h-full"),a(u,"role","button"),a(u,"tabindex","0"),a(l,"class","w-full flex"),a(x,"class","bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-[3px]"),a(n,"class","mx-auto w-1/3 my-6 items-center justify-center"),a(v,"class","mx-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:mx-32 gap-4"),a(e,"class","w-full h-full")},m(b,y){A(b,e,y),i(e,n),i(n,l),i(l,o),i(o,d),i(o,r),i(o,f),i(l,s),i(l,u),i(n,m),i(n,x),i(e,g),i(e,v);for(let h=0;h<w.length;h+=1)w[h]&&w[h].m(v,null);i(e,E),D(k,e,null),C=!0,S||(H=[O(u,"click",t[7]),O(u,"keydown",t[7])],S=!0)},p(b,y){if((!C||y&2)&&c!==(c=b[1].toUpperCase()+"")&&X(f,c),y&32){$=se(b[5].classes);let h;for(h=0;h<$.length;h+=1){const M=ue(b,$,h);w[h]?w[h].p(M,y):(w[h]=de(M),w[h].c(),w[h].m(v,null))}for(;h<w.length;h+=1)w[h].d(1);w.length=$.length}},i(b){C||(L(k.$$.fragment,b),C=!0)},o(b){j(k.$$.fragment,b),C=!1},d(b){b&&T(e),ke(w,b),q(k),S=!1,P(H)}}}function de(t){let e,n,l=t[13]+"",o,d,r,c=t[5].grades[t[15]]+"",f,s;return{c(){e=p("div"),n=p("h5"),o=z(l),d=_(),r=p("p"),f=z(c),s=_(),a(n,"class","text-2xl text-center p-2 font-medium flex-wrap break-words leading-tight text-neutral-800"),a(r,"class","p-1 font-mono font-bold text-5xl text-neutral-600 text-center"),a(e,"class","block rounded-lg bg-white p-6 m-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.06)]")},m(u,m){A(u,e,m),i(e,n),i(n,o),i(e,d),i(e,r),i(r,f),i(e,s)},p(u,m){m&32&&l!==(l=u[13]+"")&&X(o,l),m&32&&c!==(c=u[5].grades[u[15]]+"")&&X(f,c)},d(u){u&&T(e)}}}function pe(t){let e,n,l,o,d,r,c=t[1].toUpperCase()+"",f,s,u,m,x,g,v,E,k,C,S,H,$,w,b;return H=new Z({}),{c(){e=p("div"),n=p("div"),l=p("div"),o=p("h1"),d=p("b"),d.textContent="Hello,",r=_(),f=z(c),s=_(),u=p("div"),u.innerHTML='<svg class="h-8 w-8 cursor-pointer text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',m=_(),x=p("div"),g=_(),v=p("div"),E=p("div"),k=p("form"),k.innerHTML='<h3 class="text-3xl font-semibold pb-3 font-mono">Settings</h3> <h4 class="text-2xl font-mono pb-20">Coming Soon!</h4>',C=_(),S=p("div"),Y(H.$$.fragment),a(d,"class","font-bold"),a(o,"class","text-center text-3xl py-1 tracking-wide font-semibold bg-white w-full h-full"),a(u,"role","button"),a(u,"tabindex","0"),a(l,"class","w-full flex"),a(x,"class","bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-[3px]"),a(n,"class","mx-auto w-1/3 my-6 items-center justify-center"),a(k,"class","w-[400px] mx-auto px-7 pt-5 pb-7 center-content text-center space-y-2 "),a(E,"class","shadow-[0_3px_10px_rgba(0,0,0,0.20)] w-fit m-auto rounded-md"),a(v,"class","mt-32 flex items-center justify-center"),a(e,"class","w-full h-full"),a(S,"class","absolute w-full bottom-0")},m(y,h){A(y,e,h),i(e,n),i(n,l),i(l,o),i(o,d),i(o,r),i(o,f),i(l,s),i(l,u),i(n,m),i(n,x),i(e,g),i(e,v),i(v,E),i(E,k),A(y,C,h),A(y,S,h),D(H,S,null),$=!0,w||(b=[O(u,"click",t[7]),O(u,"keydown",t[7]),O(k,"submit",be(t[6]))],w=!0)},p(y,h){(!$||h&2)&&c!==(c=y[1].toUpperCase()+"")&&X(f,c)},i(y){$||(L(H.$$.fragment,y),$=!0)},o(y){j(H.$$.fragment,y),$=!1},d(y){y&&(T(e),T(C),T(S)),q(H),w=!1,P(b)}}}function Ue(t){let e,n,l,o,d,r=!t[0]&&!t[4]&&ae(t),c=!t[0]&&t[4]&&fe(),f=t[0]&&!t[3]&&ce(t),s=t[0]&&t[3]&&pe(t);return{c(){e=p("main"),r&&r.c(),n=_(),c&&c.c(),l=_(),f&&f.c(),o=_(),s&&s.c(),a(e,"class","w-full min-h-screen items-center")},m(u,m){A(u,e,m),r&&r.m(e,null),i(e,n),c&&c.m(e,null),i(e,l),f&&f.m(e,null),i(e,o),s&&s.m(e,null),d=!0},p(u,[m]){!u[0]&&!u[4]?r?(r.p(u,m),m&17&&L(r,1)):(r=ae(u),r.c(),L(r,1),r.m(e,n)):r&&(W(),j(r,1,1,()=>{r=null}),G()),!u[0]&&u[4]?c?m&17&&L(c,1):(c=fe(),c.c(),L(c,1),c.m(e,l)):c&&(W(),j(c,1,1,()=>{c=null}),G()),u[0]&&!u[3]?f?(f.p(u,m),m&9&&L(f,1)):(f=ce(u),f.c(),L(f,1),f.m(e,o)):f&&(W(),j(f,1,1,()=>{f=null}),G()),u[0]&&u[3]?s?(s.p(u,m),m&9&&L(s,1)):(s=pe(u),s.c(),L(s,1),s.m(e,null)):s&&(W(),j(s,1,1,()=>{s=null}),G())},i(u){d||(L(r),L(c),L(f),L(s),d=!0)},o(u){j(r),j(c),j(f),j(s),d=!1},d(u){u&&T(e),r&&r.d(),c&&c.d(),f&&f.d(),s&&s.d()}}}function Be(t,e,n){let l=!1,o="",d="",r=!1,c=!1,f={classes:[],grades:[],token:""};Ee(()=>{n(1,o=Pe("username")),o===null&&n(1,o="")});const s=async()=>{n(4,c=!0);const v=new AbortController;setTimeout(()=>v.abort(),3e4);try{const E=await fetch("/api/grades",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:d}),signal:v.signal});if(E.ok){const k=await E.json();n(5,f.classes=k.classes,f),n(5,f.grades=k.grades,f),Oe("username",o,14),n(0,l=!0),n(4,c=!1)}else throw new Error("Authentication failed")}catch(E){console.error("Login failed:",E.message),n(4,c=!1)}};function u(){s()}function m(){n(3,r=!r)}function x(){o=this.value,n(1,o)}function g(){d=this.value,n(2,d)}return[l,o,d,r,c,f,u,m,x,g]}class Ve extends ve{constructor(e){super(),we(this,e,Be,Ue,ge,{})}}new Ve({target:document.getElementById("app")});
