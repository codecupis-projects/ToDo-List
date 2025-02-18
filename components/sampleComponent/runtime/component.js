import { defineComponent } from '../../../scripts/components.js';

defineComponent({tagName: "my-component",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["styles.css"],
    scriptPaths: ["myScript.js"]
});