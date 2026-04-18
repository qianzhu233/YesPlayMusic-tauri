/* eslint-disable no-console */

import { register } from 'register-service-worker';

const isTauri =
  typeof window !== 'undefined' &&
  (window.__TAURI__ !== undefined ||
    window.__TAURI_INTERNALS__ !== undefined ||
    navigator.userAgent.includes('Tauri'));

if (isTauri && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
}

if (!process.env.IS_ELECTRON && !isTauri) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      // console.log(
      //   "App is being served from cache by a service worker.\n" +
      //     "For more details, visit https://goo.gl/AFskqB"
      // );
    },
    registered() {
      // console.log("Service worker has been registered.");
    },
    cached() {
      // console.log("Content has been cached for offline use.");
    },
    updatefound() {
      // console.log("New content is downloading.");
    },
    updated() {
      // console.log("New content is available; please refresh.");
    },
    offline() {
      // console.log(
      //   "No internet connection found. App is running in offline mode."
      // );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
