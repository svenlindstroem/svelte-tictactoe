<script>
  "use strict";

  let deferredInstallPrompt = null;
  let installButton;

  // could use onMount here as well
  document.addEventListener("DOMContentLoaded", event => {
    installButton = document.getElementById("buttonInstall");
    installButton.addEventListener("click", installPWA);
  });

  window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);
  window.addEventListener("appinstalled", logAppInstalled);

  function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute("hidden");
  }

  function installPWA(evt) {
    deferredInstallPrompt.prompt();
    // Hide the install button, it can't be called twice.
    evt.srcElement.setAttribute("hidden", true);
    deferredInstallPrompt.userChoice.then(choice => {
      if (choice.outcome === "accepted") {
        console.log("User accepted the A2HS prompt", choice);
      } else {
        console.log("User dismissed the A2HS prompt", choice);
      }
      deferredInstallPrompt = null;
    });
  }

  function logAppInstalled(evt) {
    console.log("Tic Tac Toe was installed.", evt);
  }
</script>

<style>
  button {
    font-size: 2vw;
  }
</style>

<div>
  <button id="buttonInstall" aria-label="Install" hidden>Install</button>
</div>
