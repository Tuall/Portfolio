const version = 12
const staticCacheName = `V${version}-staticFiles`

addEventListener('install', evt => {
  skipWaiting()
  evt.waitUntil(
    caches.open(staticCacheName).then(staticCache => {
      // Nice to have
      staticCache.addAll([
        'fonts/Tofino-Regular.otf',
        'images/arrow.svg',
        'images/avatarpic.jpg'
      ])
      // Must have
      return staticCache.addAll([
        'css/bundle.css',
        'js/bundle.js',
        'index.html'
      ])
    })
  )
})

addEventListener('fetch', evt => {
  const request = evt.request

  if (request.headers.get('Accept').includes('text/html')) {
    evt.respondWith(
      fetch(request).catch(error => {
        return caches.match('index.html')
      })
    )
    return
  }

  if (request.headers.get('Accept').includes('image')) {
    evt.respondWith(
      caches.match(request).then(responseFromCache => {
        if (responseFromCache) {
          return responseFromCache
        }

        return fetch(request).then(responseFromFetch => {
          // Put a copy in the cache
          const copy = responseFromFetch.clone()
          evt.waitUntil(
            caches.open(imageCacheName).then(imageCache => {
              return imageCache.put(request, copy)
            })
          )
          return responseFromFetch
        })
      })
    )
    return
  }

  // For every other assets
  evt.respondWith(
    caches.match(request).then(responseFromCache => {
      if (responseFromCache) {
        return responseFromCache
      }
      return fetch(request)
    })
  )
})

addEventListener('activate', evt => {
  evt.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName != staticCacheName) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return clients.claim()
      })
  )
})
