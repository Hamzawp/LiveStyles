import { section1, section2 } from "./sections.js";

document.getElementById("toggleDesignMode").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["changes.js"],
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleDesignMode,
    args: [section1, section2],
  });
});

// Enable color picker
function toggleDesignMode(section1, section2) {
  document.designMode = document.designMode === "on" ? "off" : "on";
  alert("Hamza's Mode is now " + document.designMode);

  if (!window.changesMade) {
    window.changesMade = {};
  }

  if (document.designMode === "on") {
    document.body.style.cursor = "crosshair";
    //confused whether to keep it or not
    let divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.border = "1px solid black";
    }

    let colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.position = "fixed";
    colorPicker.style.zIndex = "1000000000";
    colorPicker.id = "dynamicColorPicker";
    document.body.appendChild(colorPicker);

    if (typeof addSettingsButton === "function") {
      addSettingsButton();
    }

    document.addEventListener("click", (event) => {
      colorPicker.style.top = event.pageY + "px";
      colorPicker.style.left = event.pageX + "px";
      colorPicker.style.display = "block";

      const element = event.target;
      const elementIdentifier = element.id
        ? `#${element.id}`
        : element.className
        ? `.${element.className.split(" ").join(".")}`
        : element.tagName.toLowerCase();
        
      if (section1.includes(event.target.tagName.toLowerCase())) {
        colorPicker.oninput = (e) => {
          element.style.backgroundColor = e.target.value;
          if (!window.changesMade[elementIdentifier]) {
            window.changesMade[elementIdentifier] = {};
          }
          window.changesMade[elementIdentifier]["background-color"] = e.target.value;
        };
      } else if (section2.includes(event.target.tagName.toLowerCase())) {
        colorPicker.oninput = (e) => {
          element.style.color = e.target.value;
          if (!window.changesMade[elementIdentifier]) {
            window.changesMade[elementIdentifier] = {};
          }
          window.changesMade[elementIdentifier]["color"] = e.target.value;
        };
      }
    });
  } else {
    addSettingsButton();
    const colorPicker = document.getElementById("dynamicColorPicker");
    if (colorPicker) {
      colorPicker.remove();

      alert("Changes made: " + JSON.stringify(window.changesMade, null, 2));
    }
  }
}