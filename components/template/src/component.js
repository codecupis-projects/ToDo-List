import { defineComponent } from '../../../scripts/components.js';

class MyTemplate extends HTMLElement{
    hello(){
        console.log("Hello World!");
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
 * @param {ShadowRoot} shadow
 */
function start(element, shadow){
    // Your js codes. Use "shadow" as the root element similar how you use "document" in normal js files
    // Some examples
    
    /** @type {HTMLSlotElement} */
    const slot = shadow.querySelector("div>slot");
    // We can access the elements assigned to a slot in this way
    const mainText = slot.assignedNodes()[0];
    mainText.textContent += "!!";

    const myDiv = shadow.querySelector("div");
    myDiv.style.border = "1px solid blue";

    element.hello();
}
