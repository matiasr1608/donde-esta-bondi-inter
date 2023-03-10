/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-0b008d8b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "bba4d5c991113a7054b8.json",
    "revision": null
  }, {
    "url": "images/android_1.jpg",
    "revision": "00bfb3aff8f0690237b33ebd13f6b173"
  }, {
    "url": "images/iphone_1.jpg",
    "revision": "bbbc88a6755865f38e7533c6c519fc31"
  }, {
    "url": "images/iphone_2.jpg",
    "revision": "f96a339d02c14750e03dbad33b217a22"
  }, {
    "url": "images/layers-2x.png",
    "revision": "4f0283c6ce28e888000e978e537a6a56"
  }, {
    "url": "images/layers.png",
    "revision": "a6137456ed160d7606981aa57c559898"
  }, {
    "url": "images/logo_192_blue.png",
    "revision": "dae2b20efe73c407fef896cab751ab3b"
  }, {
    "url": "images/logo_225_blue.png",
    "revision": "16bfb3979f98c7ca1209cb749f7aca58"
  }, {
    "url": "images/logo_225_transparent.png",
    "revision": "8bc5ff69e17b5fb16ec4a1abbe7d23e5"
  }, {
    "url": "images/marker-icon.png",
    "revision": "2273e3d8ad9264b7daa5bdbf8e6b47f8"
  }, {
    "url": "index.bundle.js",
    "revision": "3f8fa4c5fc4d57cd46f19b76eac91d67"
  }, {
    "url": "index.css",
    "revision": "1310091379a29f6e70dd0aeed8a7eb6d"
  }, {
    "url": "index.html",
    "revision": "5e2ed02187695a18ab9e215515cca01f"
  }, {
    "url": "routes.bundle.js",
    "revision": "9b834e1aebfcddd25c90045cc30a2610"
  }, {
    "url": "routes.css",
    "revision": "0bc2600ad3d90677614d8111177688d8"
  }, {
    "url": "routes.html",
    "revision": "3ebda0be733cfead05bd24bebdcb51a2"
  }, {
    "url": "src_all_js-src_index_js.bundle.js",
    "revision": "ca2b23c67d93c808c8387bb6e371a43f"
  }, {
    "url": "vendors-node_modules_jquery_dist_jquery_js-node_modules_leaflet_locatecontrol_src_L_Control_L-7387eb.bundle.js",
    "revision": "df060a6a58f19e0e3a422dc74e91838f"
  }, {
    "url": "vendors-node_modules_jquery_dist_jquery_js-node_modules_leaflet_locatecontrol_src_L_Control_L-7387eb.css",
    "revision": "6a3b8ef7af0db6ed7f08834096a7cee7"
  }], {});

}));
