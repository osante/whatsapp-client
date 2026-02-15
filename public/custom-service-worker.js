self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  console.log('[Service Worker] Push received:', data);

  const options = {
    body: data.body || '',
    icon: data.icon || '/assets/icons/icon-192x192.png',
    data: { url: data.url || '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'New Notification', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(clients.openWindow(url));
});
