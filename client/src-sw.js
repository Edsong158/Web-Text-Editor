import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache and route all static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigation requests
const pageCache = new NetworkFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
  ],
});

registerRoute(
  ({ request }) => request.mode === 'navigate',
  ({ event }) => pageCache.handle({ event })
);

// Cache API responses
const apiCache = new CacheFirst({
  cacheName: 'api-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 60 * 60, // Cache for 1 hour
    }),
  ],
});

// Match requests to specific APIs and use the API cache strategy
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  ({ event }) => apiCache.handle({ event })
);

// Cache other assets with a CacheFirst strategy
registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/,
  new CacheFirst({
    cacheName: 'static-assets-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100, // Cache up to 100 entries
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
      }),
    ],
  })
);