const installButton = document.getElementById('buttonInstall');
let deferredPrompt;

// Event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt fired');
  
  // Prevent the default browser behavior
  event.preventDefault();
  
  // Store the event for later use
  deferredPrompt = event;
  
  // Show the install button
  installButton.style.display = 'block';
});

// Event listener for install button click
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    try {
      // Show the installation prompt
      deferredPrompt.prompt();
      
      // Wait for the user to make a choice
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      
      // Reset the deferredPrompt variable
      deferredPrompt = null;
      
      // Hide the install button
      installButton.style.display = 'none';
    } catch (err) {
      console.error('Error during app installation:', err);
    }
  }
});

// Event listener for appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed as a PWA', event);
  
  
});
