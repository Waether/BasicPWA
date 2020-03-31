console.log("Handle Install triggered !");

if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() { console.log('Service Worker Registered'); });
}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        addBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});
