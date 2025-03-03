import { defineComponent } from '../../../scripts/components.js';
import {} from '../../todo-item/src/component.js';

defineComponent({tagName: "todo-section",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["/styles/global.css", "styles.css"],
    onLoad: start,
});

/**
 * @param {ShadowRoot} shadow
 */
function start(shadow){
    
}
