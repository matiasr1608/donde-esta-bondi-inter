if(!self.define){let e,s={};const o=(o,r)=>(o=new URL(o+".js",r).href,s[o]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=s,document.head.appendChild(e)}else e=o,importScripts(o),s()})).then((()=>{let e=s[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(r,l)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let a={};const n=e=>o(e,i),c={module:{uri:i},exports:a,require:n};s[i]=Promise.all(r.map((e=>c[e]||n(e)))).then((e=>(l(...e),a)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"about.html",revision:"ac4c69ab074ae65482d71ccf1f59e06a"},{url:"assets/for_all-a6a19f26.css",revision:null},{url:"assets/for_all-daa5477a.js",revision:null},{url:"assets/index-abbba2f8.css",revision:null},{url:"assets/L.Control-3c32fa88.css",revision:null},{url:"assets/L.Control.Locate-034beaad.js",revision:null},{url:"assets/main-d91e9fbd.js",revision:null},{url:"assets/routes-467f2e62.js",revision:null},{url:"css/custom_index.css",revision:"431c3ac3d056444f9ea87e8457f7ae47"},{url:"index.html",revision:"68068b3a56b6d8fd1d0cf234af0ac5e0"},{url:"js/all.js",revision:"058e7d40e05bf24b84702ad9819bc29e"},{url:"privacy_police.html",revision:"a1263f650ce10ed9636e6a8c22094324"},{url:"registerSW.js",revision:"21c054736e79539f24c79417aa1159fc"},{url:"routes.html",revision:"93c0392adba56f2d3c3a9e44b8074093"},{url:"terms.html",revision:"a83cd5ff61266b7cf1fd49435291bb1f"},{url:"logos/logo_512.png",revision:"d7fb4e94ea083b749b9e48367508a4bd"},{url:"logos/maskable_logo_x96.png",revision:"26fd960b84267b3eb7ca400eb6eb9a0c"},{url:"logos/maskable_logo_x128.png",revision:"3ca0f8e6ff977f69cd6b43290ccea0b4"},{url:"logos/maskable_logo_x192.png",revision:"8616dd1c944c60f55d88139fad35f349"},{url:"logos/maskable_logo_x384.png",revision:"296d8e557a01a35b976dbe09fed20b91"},{url:"logos/maskable_logo_x512.png",revision:"a29e883e2c405d6de73d310eb0c94f8c"},{url:"logo_512.png",revision:"d7fb4e94ea083b749b9e48367508a4bd"},{url:"marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"manifest.webmanifest",revision:"ef199d8c4451bbb5330bd27066b46484"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
