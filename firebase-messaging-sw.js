// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '758635491332'
});

const messaging = firebase.messaging();
