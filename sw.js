var cacheName = 'Activity-Sheet';
var filesToCache = ['/',
'/index.html',
'/js/app.js',
'/css/app.css',
'/css/bootstrap.min.css',
'/fonts/fontawesome-webfont.eot'];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
































// const cacheName = 'toDoContents';
// const cacheList = ['/','/index.html','/js/app.js','/css/app.css','/css/bootstrap.min.css', '/fonts/fontawesome-webfont.eot'];

// self.addEventListener('install',(event)=>{
//     event.waitUntil(caches.open(cacheName).then((cache)=>{
//         console.log("Caches opened ")
//         cache.addAll(cacheList)
//     }));
//     console.log("Installed service worker");
// });

// self.addEventListener('fetch',(event)=>{
//     console.log('Event : ', event.request);
//     event.respondWith(caches.match(event.request).then((response)=>{
//         if(response){
//             return response
//         }
//         return event.request;
//     }));
//     console.log("Fetched service worker");
// });

