function addSettingsButton() {
    if (document.getElementById("open-popup")) {
        document.getElementById("open-popup").remove();
    };
  
    const button = document.createElement("button");
    button.id = "open-popup";
    button.innerText = "Settings";
  
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.backgroundColor = "#4e4e4e";
    button.style.color = "white";
    button.style.padding = "15px 32px";
    button.style.fontSize = "20px";
    button.style.border = "1px solid #3b3b3b";
    button.style.borderRadius = "12px";
    button.style.cursor = "pointer";
    button.style.zIndex = "10000";
  
    button.addEventListener("click", togglePopup);
  
    document.body.appendChild(button);
  }
  
  function togglePopup() {
    let popup = document.getElementById("popup");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "popup";
      popup.innerHTML = `
        <div class="settings-window">
          <div class="header" style="display: flex; justify-content: space-between;">
            <h1 style="font-size: 1.5em;">Changes made:</h1>
            <br/>
            <button id="copy" tooltip="Copy to clipboard" style="border: 2px solid; width: 100px; border-radius:10px">Copy</button>
            <button id="clear" style="border: 2px solid; width: 100px; border-radius:10px">Clear</button>
            <br/>
            <button class="close-button" id="close-popup" style="cursor: pointer; font-size: 1.5em;">&times;</button>
          </div>
          <div class="settings-body">
            <pre id="changes-data">${JSON.stringify(window.changesMade, null, 2)}</pre>
          </div>
        </div>
      `;
      popup.style.position = "fixed";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.backgroundColor = "white";
      popup.style.borderRadius = "10px";
      popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      popup.style.width = "700px";
      popup.style.height = "500px";
      popup.style.zIndex = "10001";
      popup.style.overflow = "auto";
      popup.style.padding = "20px";
      popup.style.color = "black";
  
      document.body.appendChild(popup);
  
      document.getElementById("close-popup").addEventListener("click", () => {
        popup.remove();
      });
  
      document.getElementById("copy").addEventListener("click", () => {
        const changesData = document.getElementById("changes-data").textContent;
        navigator.clipboard.writeText(changesData)
          .then(() => {
            alert("Copied to clipboard!");
          })
          .catch((err) => {
            console.error("Error copying to clipboard: ", err);
            alert("Failed to copy to clipboard.");
          });
      });

      document.getElementById("clear").addEventListener("click", () => {
        window.location.reload();
    });    
    } else {
      popup.remove();
    }
  }
  