/* eslint-disable @v3group/no-fetch, no-restricted-globals, no-console */

async function handleGeneratePixelRequest(event, {index, domain}) {
    try {
        const url = `https://${domain.d}/static/pixel.gif?${Date.now()}`;
        const response = await fetch(url);

        event.ports[0].postMessage({status: response.ok, index});
    } catch (error) {
        event.ports[0].postMessage({status: false, index});
    }
}

self.addEventListener('message', (event) => {
    const {action, data} = event.data;

    switch (action) {
        case 'generatePixelRequest':
            handleGeneratePixelRequest(event, data);
            break;
    }
});

self.addEventListener('install', (installEvent) => {
    installEvent.waitUntil(
        new Promise((resolve) => {
            console.log('installed');
            resolve();
        }),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        self.clients.claim(),
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .catch((error) => {
                console.error('[pwa] ', error);
                throw new Response('Fetch failed! Check your network connection.');
            }),
    );
});
