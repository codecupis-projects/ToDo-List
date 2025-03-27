import { defineComponent } from "../../../scripts/components.js";

export class TodoItem extends HTMLElement{
  update(done, title, description, date){
    /** @type {HTMLElement} */
    const checkElement = this.shadowRoot.querySelector(".todo-item__check");
    checkElement.style.visibility = done ? "visible" : "hidden";

    this.replaceSlot("todo-item-title", title);
    this.replaceSlot("todo-item-description", description);
    this.replaceSlot("todo-item-date", date);
  }

  replaceSlot(slotName, text){
    const slot = this.shadowRoot.querySelector(`slot[name=${slotName}]`);
    const textNode = document.createTextNode(text);
    slot.parentElement.appendChild(textNode);
    slot.parentElement.removeChild(slot);
  }
}

defineComponent({
  tagName: "todo-item",
  meta: import.meta,
  templatePath: "template.html",
  stylePaths: ["/styles/global.css", "./styles.css"],
  onLoad: start,
  classDefinition: TodoItem
});

/**
 * @param {ShadowRoot} shadow
 */
function start(shadow) {
}
