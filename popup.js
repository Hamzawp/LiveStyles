// Add event listener to toggle design mode
document.getElementById("toggleDesignMode").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleDesignMode
    });
  });
  
  // enable color picker
  function toggleDesignMode() {
    document.designMode = document.designMode === "on" ? "off" : "on";
    alert("Hamza's Mode is now " + document.designMode);
  
    if (document.designMode === "on") {
      // Create color picker input
      let colorPicker = document.createElement("input");
      colorPicker.type = "color";
      colorPicker.style.position = "fixed";
      colorPicker.style.zIndex = "1000000000";
    //   colorPicker.style.display = "none"; // Hidden initially
      colorPicker.id = "dynamicColorPicker";
      document.body.appendChild(colorPicker);
  
      document.addEventListener("click", (event) => {
        colorPicker.style.top = event.pageY + "px";
        colorPicker.style.left = event.pageX + "px";
        colorPicker.style.display = "block";
        colorPicker.style.zIndex = "1000000000";

        if (event.target.tagName.toLowerCase() === "div" ||
         event.target.tagName.toLowerCase() === "main" ||
          event.target.tagName.toLowerCase() === "nav" ||
           event.target.tagName.toLowerCase() === "header" ||
            event.target.tagName.toLowerCase() === "section" ||
             event.target.tagName.toLowerCase() === "navbar" ||
              event.target.tagName.toLowerCase() === "footer") {
          const div = event.target;
          console.log("hit div, section or p");
                
          //change color
          colorPicker.oninput = (e) => {
            div.style.backgroundColor = e.target.value;
          };
        }else if(event.target.tagName.toLowerCase() === "h1" ||
         event.target.tagName.toLowerCase() === "h2" || 
          event.target.tagName.toLowerCase() === "h3" || 
           event.target.tagName.toLowerCase() === "p"){
            const div = event.target;

            colorPicker.oninput = (e) => {
              div.style.color = e.target.value;
            }
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
  