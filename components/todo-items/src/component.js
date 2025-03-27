import { defineComponent } from '../../../scripts/components.js';
import { TodoItem } from '../../todo-item/src/component.js';

class TodoItems extends HTMLElement{
    items = new Map();

    init(){
        this.elementList = this.shadowRoot.querySelector("#items");
    }

    add(itemId, item){
        if(!this.items.has(itemId))
        {
            /** @type {TodoItem} */
            const element = document.createElement("todo-item");
            this.items.set(itemId, element);

            element.onLoadTemplate = () => {
                element.update(item.done, item.title, item.description, item.date);
                element.dataset.itemId = itemId;
                const listItem = document.createElement("li");
                listItem.appendChild(element);
                this.elementList.appendChild(listItem);
            }
        }
    }

    remove(itemId){
        if(this.items.has(itemId))
        {
            const element = this.items.get(itemId);
            this.items.delete(itemId);
            this.elementList.removeChild(element);
        }
    }

    update(itemId, item){
        if(this.items.has(itemId))
        {
            // For simplicity, we remove and re-add the item
            this.remove(itemId);
            this.add(itemId, item);
        }
    }

    clear(){
        this.items.clear();
        this.elementList.innerHTML = "";
    }
}

defineComponent({tagName: "todo-items",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["/styles/global.css", "styles.css"],
    onLoad: start,
    classDefinition: TodoItems
});

/**
 * @param {TodoItems} element
 * @param {ShadowRoot} shadow
 */
function start(element, shadow){
    element.init();
    loadElement(element);
}

async function loadElement(element){
    element.clear();
    const items = await loadItems();
    for(const index in items)
    {
        const item = items[index];
        element.add(item.id, item);
    }
}

async function loadItems(){
    const response = await fetch("../tests/test-items.json");
    const text = await response.text();
    return JSON.parse(text);
}
