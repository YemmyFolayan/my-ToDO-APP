const cacheName = 'toDoContents';
const cacheList = ['/','/index.html','/js/app.js','/css/app.css','/css/bootstrap.min.css', '/fonts/fontawesome-webfont.eot'];

self.addEventListener('install',(event)=>{
    event.waitUntil(caches.open(cacheName).then((cache)=>{
        console.log("Caches opened ")
        cache.addAll(cacheList)
    }));
    console.log("Installed service worker");
});

self.addEventListener('fetch',(event)=>{
    console.log('Event : ', event.request);
    event.respondWith(caches.match(event.request).then((response)=>{
        if(response){
            return response
        }
        return event.request;
    }));
    console.log("Fetched service worker");
});
