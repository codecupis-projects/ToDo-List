import { defineComponent } from '../../../scripts/components.js';

class MyTemplate extends HTMLElement{
    setMainBackgroundColor(color){
        const div = this.shadowRoot.querySelector("#text-container");
        div.style.backgroundColor = color;
    }
}

defineComponent({tagName: "my-template",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["/styles/global.css", "styles.css"],
    onLoad: start,
    classDefinition: MyTemplate // Optional
});

/**
 * @param {HTMLElement} element
 * @param {ShadowRoot} shadow
 */
function start(element, shadow){
    // Your js codes. Use "shadow" as the root element similar how you use "document" in normal js files
    
    // Some examples

    // Changing slot's properties
    /** @type {HTMLSlotElement} */
    const slot = shadow.querySelector("div>slot");
    // We can access the elements assigned to a slot in this way
    const mainText = slot.assignedNodes()[0];
    mainText.textContent += "!!";

    // Finding elements
    const myDiv = shadow.querySelector("div");
    myDiv.style.border = "1px solid blue";

    // Using properties, methods, and events we defined in our class definition of the component
    element.setMainBackgroundColor("#2011f6");
}
