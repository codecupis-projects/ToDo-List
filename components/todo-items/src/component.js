import { defineComponent } from '../../../scripts/components.js';
import {} from '../../todo-item/src/component.js';

class TodoItems extends HTMLElement{
    add(item){
        
    }

    remove(itemId){

    }

    update(itemId, item){

    }

    load(){

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
    initElement(element);
}

async function initElement(){
    const items = await getItems();
    element.init(items);
}

async function getItems(){
    const response = await fetch("../tests/test-items.json");
    const text = await response.text();
    return JSON.parse(text);
}
