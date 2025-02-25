import { defineComponent } from '../../../scripts/components.js';

defineComponent({tagName: "my-component",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["/global.css", "styles.css"],
    onLoad: start,
});

/**
 * @param {ShadowRoot} shadow
 */
function start(shadow){
    // Your js codes. Use "shadow" as the root element similar how you use "document" in normal js files
    // Some examples
    
    /** @type {HTMLSlotElement} */
    const slot = shadow.querySelector("div>slot");
    // Do something with slot
    slot.assignedNodes()[0].textContent += "!!";

    const myDiv = shadow.querySelector("div");
    myDiv.style.border = "1px solid blue";
}
