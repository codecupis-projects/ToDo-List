import { defineComponent } from "../../../scripts/components.js";

defineComponent({
  tagName: "todo-item",
  meta: import.meta,
  templatePath: "template.html",
  stylePaths: ["/styles/global.css", "./styles.css"],
  onLoad: start,
});

/**
 * @param {ShadowRoot} shadow
 */
function start(shadow) {
}
