const runtimeCaching = [
    {
        urlPattern: /^https:\/\/.*/i,
        handler: "NetworkFirst",
        options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 10,
            expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            cacheableResponse: { statuses: [0, 200] }
        }
    },
    {
        urlPattern: /^\/$/i,
        handler: "NetworkFirst",
        options: {
            cacheName: "start-page",
            expiration: { maxEntries: 1, maxAgeSeconds: 86400 },
            cacheableResponse: { statuses: [0, 200] },
        }
    },
    {
        urlPattern: ({ request }) => request.destination === "document",
        handler: "NetworkFirst",
        options: {
            cacheName: "pages",
            expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
        },
    },
    {
        urlPattern: ({ request }) =>
            ["script", "style", "worker"].includes(request.destination),
        handler: "StaleWhileRevalidate",
        options: { cacheName: "assets" },
    },
];

module.exports = runtimeCaching;
