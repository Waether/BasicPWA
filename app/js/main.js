const app = (() => {
  'use strict';

  let mySubscription = null;
  let isSubscribed = false;
  let swRegistration = null;

  const pushButton = document.querySelector('.js-push-btn');

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!');
    return;
  }

  Notification.requestPermission(status => {
    console.log('Notification permission status:', status);
  });

  function initializeUI() {

    pushButton.addEventListener('click', () => {
      pushButton.disabled = true;
      if (isSubscribed) {
        unsubscribeUser();
      } else {
        subscribeUser();
      }
    });

    swRegistration.pushManager.getSubscription()
        .then(subscription => {
          isSubscribed = (subscription !== null);
          updateSubscriptionOnServer(subscription);
          if (isSubscribed) {
            console.log('User IS subscribed.');
          } else {
            console.log('User is NOT subscribed.');
          }
          updateBtn();
        });
  }

  // VAPID Key
  const applicationServerPublicKey = 'BA-pfSa54gV6e1qJ9LUNjv8HBgD9wS7uIyXpipj2J699VIymFneA2o4wyaFuQXCI9CmAskIXBPkoyhckkLnMk04';
  // VAPID Key

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
        .then(subscription => {
          console.log('User is subscribed:', subscription);
          updateSubscriptionOnServer(subscription);
          isSubscribed = true;
          updateBtn();
        })
        .catch(err => {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Failed to subscribe the user: ', err);
          }
          updateBtn();
        });
  }

  function unsubscribeUser() {

    swRegistration.pushManager.getSubscription()
        .then(subscription => {
          if (subscription) {
            return subscription.unsubscribe();
          }
        })
        .catch(err => {
          console.log('Error unsubscribing', err);
        })
        .then(() => {
          updateSubscriptionOnServer(null);
          console.log('User is unsubscribed');
          isSubscribed = false;
          updateBtn();
        });

  }

  function updateSubscriptionOnServer(subscription) {
    if (subscription)
      mySubscription = subscription;
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Push Messaging Blocked';
      pushButton.disabled = true;
      updateSubscriptionOnServer(null);
      return;
    }

    if (isSubscribed) {
      pushButton.style.backgroundColor = 'red';
      pushButton.textContent = 'Disable Push Messaging';
    } else {
      pushButton.style.backgroundColor = 'green';
      pushButton.textContent = 'Enable Push Messaging';
    }
    pushButton.disabled = false;
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
          .then(swReg => {
            console.log('Service Worker is registered', swReg);

            swRegistration = swReg;

            initializeUI();
          })
          .catch(err => {
            console.error('Service Worker Error', err);
          });
    });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }

  const submitButton = document.querySelector('.submit-feed');
  const feedField = document.querySelector('.submit-feed-input');

  submitButton.addEventListener('click', () => {
    console.log("Adding " + feedField.value + " to notify list !");

    const data = {
      subscription: mySubscription,
      feed: feedField.value
    };
    if (mySubscription) {
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:80/public/addFeed',
        success: function(data) {
          console.log('success');
          console.log(JSON.stringify(data));
        },
        error: function(err) {
          console.log('failed');
          console.log(JSON.stringify(err));
        }
      });
    }

    feedField.value = "";
  });

})();

