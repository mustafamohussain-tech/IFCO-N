// عامل الخدمة: بس لإشعارات الهاتف (تذكير مواعيد الزيارات).
// ما بيه أي fetch/cache — التطبيق يشتغل مثل ما هو بدون أي تخزين إضافي.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (e) {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'إنجازات الفيحاء', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: d.tag || 'ifco',
    renotify: true,
    dir: 'rtl',
    lang: 'ar',
    data: { url: d.url || './index.html' }
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './index.html';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
