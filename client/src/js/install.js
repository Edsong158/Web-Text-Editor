const butInstall = document.getElementById('buttonInstall');

// Show install button when beforeinstallprompt event occurs
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    showInstallButton();
});

// Handle install button click
butInstall.addEventListener('click', async () => {
    const eventPrompt = window.deferredPrompt;
    if (!eventPrompt) {
        return;
    }
    eventPrompt.prompt();
    window.deferredPrompt = null;
    hideInstallButton();
});

// Handle appinstalled event
window.addEventListener('appinstalled', () => {
    window.deferredPrompt = null;
});

function showInstallButton() {
    butInstall.classList.remove('hidden');
}

function hideInstallButton() {
    butInstall.classList.add('hidden');
}
