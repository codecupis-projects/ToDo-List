export function defineComponent({tagName, templatePath, stylePaths = null}){
    const customElement = defineCustomSimpleElement(templatePath, stylePaths);
    customElements.define(tagName, customElement);
}

export async function loadComponent({element, templatePath, stylePaths = null,
    mode = "open"}){
    const template = await loadTemplate(templatePath);

    mode = mode !== "open" && mode !== "closed" ? "open" : mode;
    const shadow = element.attachShadow({mode: mode});

    if(stylePaths)
        for(let i = 0; i < stylePaths.length; i++)
            appendStyle(shadow, stylePaths[i]);
    shadow.appendChild(template.content.cloneNode(true));
}

export async function loadTemplate(templatePath){
    const response = await fetch(templatePath);
    const htmlText = await response.text();
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    return template;
}

function appendStyle(shadow, stylePath){
    if(!stylePath)
        return;

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = stylePath;
    shadow.appendChild(styleLink);
}

class SimpleElement extends HTMLElement{
    constructor(templatePath, stylePaths){
        super();
        this.loadComponent(templatePath, stylePaths);
    }

    async loadComponent(templatePath, stylePaths){
        await loadComponent({element: this, templatePath, stylePaths});
    }
}

function defineCustomSimpleElement(templatePath, stylePaths){
    return class extends SimpleElement{
        constructor(){
            super(templatePath, stylePaths);
        }
    }
}