import { defineComponent } from '../../../scripts/components.js';

defineComponent({tagName: "my-component",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["styles.css"],
    onLoad: start,
});

/**
 * @param {HTMLElement} element 
 * @param {ShadowRoot} shadow 
 */
function start(element, shadow){
    /** @type {HTMLSlotElement} */
    const slot = shadow.querySelector("h2>slot");
    console.log(slot.assignedNodes()[0].textContent);
}