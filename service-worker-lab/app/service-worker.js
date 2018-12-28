
// Get files from app.json
const filesToCache = [
    '/',
    'style/main.css',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
]

// Cache name
const staticCache = 'pages-cache-v1';

self.addEventListener('install', event => {
    console.log("Service Worker installing");
    self.skipWaiting();
    event.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    )
});

self.addEventListener('activate', event => {
    console.log("Service Worker activating");
});

self.addEventListener('fetch', event => {
    console.log("fetching: ", event.request.url);
})