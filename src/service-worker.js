// src/service-worker.js
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

// 1. Precarga de archivos (Magia de Vite PWA)
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// 2. Lógica de Notificaciones del PDF 
self.addEventListener('message', (event) => {
  // Verificamos que el mensaje sea para mostrar notificación [cite: 31]
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    
    // Mostramos la notificación usando la API del navegador 
    self.registration.showNotification("¡Pokédex Actualizada!", {
      body: "Has capturado o consultado un nuevo Pokémon", // [cite: 37]
      icon: "/pwa-192x192.png", // Asegúrate de tener este icono en public [cite: 38]
      vibrate: [200, 100, 200], // Vibración como pide el PDF [cite: 39]
      tag: "poke-notify" // [cite: 40]
    });
  }
});