import { defineComponent } from '../../../scripts/components.js';
import { } from '../../sampleComponent/runtime/component.js';

defineComponent({tagName: "parent-component",
    meta: import.meta,
    templatePath: "template.html"
});