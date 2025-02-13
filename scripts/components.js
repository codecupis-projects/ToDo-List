export function defineComponent({tagName, meta, templatePath, stylePaths = null}){
    const customElement = defineCustomSimpleElement(meta, templatePath, stylePaths);
    customElements.define(tagName, customElement);
}

export async function loadComponent({element, meta, templatePath, stylePaths = null,
    mode = "open"}){
        templatePath = getAbsolutePath(meta, templatePath);
        const template = await loadTemplate(templatePath);
        mode = mode !== "open" && mode !== "closed" ? "open" : mode;
        const shadow = element.attachShadow({mode: mode});
        appendStyles(shadow, meta, stylePaths);
        shadow.appendChild(template.content.cloneNode(true));
}

export function getAbsolutePath(meta, path){
    if(!meta)
    {
        console.warn(`Meta is null or undefined. Cannot create absolute path. 
            Returning path: ${path}`);
        return path;
    }

    if(!Object.hasOwn(meta, "url"))
    {
        console.warn(`Meta doesn't contain url property. Cannot create absolute path. 
            Returning path: ${path}`);
        return path;
    }

    // Return path itself if it's absolute
    if(path.includes("//") || path.includes("http"))
        return path;

    // Ensure relative path contains slash
    if(path.charAt(0) !== '/')
        path = "/" + path;

    let basePath = meta.url;
    const parentLength = basePath.lastIndexOf("/");
    basePath = basePath.substring(0, parentLength);
    return basePath + path;
}

export async function loadTemplate(templatePath){
    const response = await fetch(templatePath);
    const htmlText = await response.text();
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    return template;
}

function appendStyles(shadow, meta, stylePaths){
    if(stylePaths)
        for(let i = 0; i < stylePaths.length; i++)
        {
            const path = getAbsolutePath(meta, stylePaths[i]);
            appendStyle(shadow, path);
        }
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
    constructor(meta, templatePath, stylePaths){
        super();
        this.loadComponent(meta, templatePath, stylePaths);
    }

    async loadComponent(meta, templatePath, stylePaths){
        await loadComponent({element: this, meta, templatePath, stylePaths});
    }
}

function defineCustomSimpleElement(meta, templatePath, stylePaths){
    return class extends SimpleElement{
        constructor(){
            super(meta, templatePath, stylePaths);
        }
    }
}