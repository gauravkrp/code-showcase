const VERSION = "v1";


// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Clean up old caches by looping through all of the
  // caches and deleting any old caches or caches that
  // are not defined in the list
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(
          cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          }
        )
      )
    })
  );
})

// .ajaxComplete(function( event, request, settings )
var cacheName = 'fetch-v1';

// Call Fetch Event 
self.addEventListener('ajaxComplete', (e, request, settings) => {
  console.log('Service Worker: Fetching', e, request, settings);
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // The response is a stream and in order the browser 
        // to consume the response and in the same time the 
        // cache consuming the response it needs to be 
        // cloned in order to have two streams.
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName)
          .then(cache => {
            // Add response to cache
            console.log('Service Worker: Caching Data');
            console.log(resClone);
            cache.put(e.request, resClone);
          });
        return res;
      }).catch(
        err => caches.match(e.request)
          .then(res => res)
      )
  );
});

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './proxy.php',
  'https://www.domain.com/api',
];
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log("(9)served from service worker: ", event.request.url);
  // serve as soon as possible from cache
  event.respondWith(fromCache(event.request));
  // update cache
  event.waitUntil(
    update(event.request)
  );
});

/**
 * 
 * Helper methods
 */

function fromCache(request) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request);
  });
}

function update(request) {
  caches.open(CACHE_NAME).then(cache => {
    fetch(request).then(response => {
      cache.put(request, response)
    });
  });
}
