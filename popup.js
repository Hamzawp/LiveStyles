import { section1, section2 } from "./sections.js";

document.getElementById("toggleDesignMode").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleDesignMode,
    args: [section1, section2],
  });
});

// enable color picker
function toggleDesignMode(section1, section2) {
  document.designMode = document.designMode === "on" ? "off" : "on";
  alert("Hamza's Mode is now " + document.designMode);

  if (document.designMode === "on") {
    // Create color picker input
    let colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.position = "fixed";
    colorPicker.style.zIndex = "1000000000";
    colorPicker.id = "dynamicColorPicker";
    document.body.appendChild(colorPicker);

    document.addEventListener("click", (event) => {
      colorPicker.style.top = event.pageY + "px";
      colorPicker.style.left = event.pageX + "px";
      colorPicker.style.display = "block";

      if (section1.includes(event.target.tagName.toLowerCase())) {
        const div = event.target;
        colorPicker.oninput = (e) => {
          div.style.backgroundColor = e.target.value;
        };
      } else if (section2.includes(event.target.tagName.toLowerCase())) {
        const div = event.target;
        colorPicker.oninput = (e) => {
          div.style.color = e.target.value;
        };
      }
    });
    //   Hide color picker logic pending
    //   document.addEventListener("click", (event) => {
    //     if (event.target !== colorPicker && event.target.tagName.toLowerCase() !== "div") {
    //       colorPicker.style.display = "none";
    //     }
    //   });
  } else {
    // Remove color picker
    const colorPicker = document.getElementById("dynamicColorPicker");
    if (colorPicker) {
      colorPicker.remove();
    }
  }
}
