import { defineComponent } from "../../../scripts/components.js";

export class TodoItem extends HTMLElement{
  onCheckDone = null;

  init(){
    const checkElement = this.shadowRoot.querySelector(".todo-item__check");
    checkElement.addEventListener("click", () => {
      checkElement.classList.toggle("todo-item-done");
      this.onCheckDone?.(checkElement.classList.contains("todo-item-done"));
    });
  }

  updateInfo(title, description, date){
    this.#replaceSlot("todo-item-title", title);
    this.#replaceSlot("todo-item-description", description);
    this.#replaceSlot("todo-item-date", date);
  }

  setDone(done){
    /** @type {HTMLElement} */
    const checkElement = this.shadowRoot.querySelector(".todo-item__check");
    checkElement.classList.toggle("todo-item-done", done);
  }

  #replaceSlot(slotName, text){
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
 * @param {TodoItems} element
 * @param {ShadowRoot} shadow
 */
function start(element, shadow) {
  element.init();
}
