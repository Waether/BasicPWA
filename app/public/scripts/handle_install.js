console.log("Handle Install loaded !");

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// let deferredPrompt;
// const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';
//
// window.addEventListener('beforeinstallprompt', (e) => {
//     console.log('addEventListener');
//     e.preventDefault();
//     deferredPrompt = e;
//     addBtn.style.display = 'block';
//
//     addBtn.addEventListener('click', (e) => {
//         addBtn.style.display = 'none';
//         deferredPrompt.prompt();
//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') {
//                 console.log('User accepted the install prompt');
//             } else {
//                 console.log('User dismissed the install prompt');
//             }
//             deferredPrompt = null;
//         });
//     });
// });
