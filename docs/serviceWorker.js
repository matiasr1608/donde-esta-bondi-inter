if(!self.define){let e,s={};const o=(o,r)=>(o=new URL(o+".js",r).href,s[o]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=s,document.head.appendChild(e)}else e=o,importScripts(o),s()})).then((()=>{let e=s[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(r,l)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let n={};const a=e=>o(e,i),d={module:{uri:i},exports:n,require:a};s[i]=Promise.all(r.map((e=>d[e]||a(e)))).then((e=>(l(...e),n)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"about.html",revision:"815112ecf82944ea93f4a7fd1aecb9fd"},{url:"assets/for_all-75f931ed.js",revision:null},{url:"assets/for_all-f752904f.css",revision:null},{url:"assets/index-abbba2f8.css",revision:null},{url:"assets/L.Control-3c32fa88.css",revision:null},{url:"assets/L.Control.Locate-505f7852.js",revision:null},{url:"assets/main-7c37a969.js",revision:null},{url:"assets/routes-d2d7dc2d.js",revision:null},{url:"css/custom_index.css",revision:"431c3ac3d056444f9ea87e8457f7ae47"},{url:"index.html",revision:"ef9651f1577d547f40cffd3a52235952"},{url:"js/all.js",revision:"058e7d40e05bf24b84702ad9819bc29e"},{url:"privacy_police.html",revision:"8c861895570bb47827d3f469a90e2154"},{url:"registerSW.js",revision:"21c054736e79539f24c79417aa1159fc"},{url:"routes.html",revision:"f4d62557ba106af1b510ff6606869626"},{url:"terms.html",revision:"1441d3b51127b3beda461afe0e20eb7d"},{url:"logos/logo_512.png",revision:"d7fb4e94ea083b749b9e48367508a4bd"},{url:"logos/maskable_logo_x96.png",revision:"26fd960b84267b3eb7ca400eb6eb9a0c"},{url:"logos/maskable_logo_x128.png",revision:"3ca0f8e6ff977f69cd6b43290ccea0b4"},{url:"logos/maskable_logo_x192.png",revision:"8616dd1c944c60f55d88139fad35f349"},{url:"logos/maskable_logo_x384.png",revision:"296d8e557a01a35b976dbe09fed20b91"},{url:"logos/maskable_logo_x512.png",revision:"a29e883e2c405d6de73d310eb0c94f8c"},{url:"logo_512.png",revision:"d7fb4e94ea083b749b9e48367508a4bd"},{url:"marker-icon-2x.png",revision:"401d815dc206b8dc1b17cd0e37695975"},{url:"marker-icon.png",revision:"2273e3d8ad9264b7daa5bdbf8e6b47f8"},{url:"marker-shadow.png",revision:"44a526eed258222515aa21eaffd14a96"},{url:"manifest.webmanifest",revision:"ef199d8c4451bbb5330bd27066b46484"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));