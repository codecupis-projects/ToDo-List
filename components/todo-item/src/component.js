import { defineComponent } from '../../../scripts/components.js';

defineComponent({tagName: "todo-item",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["/styles/global.css", "styles.css"],
    onLoad: start,
});

/**
 * @param {ShadowRoot} shadow
 */
function start(shadow){
    // Your js codes. Use "shadow" as the root element similar how you use "document" in normal js files
    // Some examples

    const myInput = shadow.querySelector("div>input");
    console.log(myInput);
}
