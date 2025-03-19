/**
 * Defines the component as a custom HTML element with provided tag name. It also loads
 * the html template, styles, and scripts asynchronously.
 * @param {Object} options - Parameters for defining the component
 * @param {(element: HTMLElement, shadow: ShadowRoot) => void} options.onLoad - The
 * callback to be called when the component is fully loaded. Sent parameters: your html
 * tag element, shadow root. You can use 'shadow' as the root node similar to the
 * 'document' property in normal scripts.
 * @param {Object} options.classDefinition - A custom class definition (javascript class)
 * for the custom HTML element. It must extend the HTMLElement. You can send your custom class
 * and add your desired properties, methods, and events to that class.
 */
export function defineComponent({ tagName, meta, templatePath, stylePaths = null,
    onLoad = null, classDefinition = null
}) {
    const customElement = defineCustomSimpleElement(meta, templatePath, stylePaths,
        onLoad, classDefinition);
    customElements.define(tagName, customElement);
}

export async function loadComponent({ element, meta, templatePath, stylePaths = null,
    onLoad = null, mode = "open"
}) {
    templatePath = getAbsolutePath(meta, templatePath);
    const template = await loadTemplate(templatePath);
    mode = mode !== "open" && mode !== "closed" ? "open" : mode;
    const shadow = element.attachShadow({ mode: mode });
    appendStyles(shadow, meta, stylePaths);
    shadow.appendChild(template.content.cloneNode(true));
    if(onLoad)
        onLoad(element, shadow);
}

export function getAbsolutePath(meta, path) {
    if (!meta) {
        console.warn(`Meta is null or undefined. Cannot create absolute path. 
            Returning path: ${path}`);
        return path;
    }

    if (!Object.hasOwn(meta, "url")) {
        console.warn(`Meta doesn't contain url property. Cannot create absolute path. 
            Returning path: ${path}`);
        return path;
    }

    // Return path itself if it's absolute
    if (path.includes("//") || path.includes("http") || path[0] === '/')
        return path;

    // Ensure relative path contains slash
    if (path.charAt(0) !== '/')
        path = "/" + path;

    let basePath = meta.url;
    const parentLength = basePath.lastIndexOf("/");
    basePath = basePath.substring(0, parentLength);
    return basePath + path;
}

export async function loadTemplate(templatePath) {
    const response = await fetch(templatePath);
    const htmlText = await response.text();
    const template = document.createElement("template");
    template.innerHTML = htmlText;
    return template;
}

function appendStyles(shadow, meta, stylePaths) {
    if (stylePaths)
        for (let i = 0; i < stylePaths.length; i++) {
            const path = getAbsolutePath(meta, stylePaths[i]);
            appendStyle(shadow, path);
        }
}

function appendStyle(shadow, stylePath) {
    if (!stylePath)
        return;

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = stylePath;
    shadow.appendChild(styleLink);
}

function defineCustomSimpleElement(meta, templatePath, stylePaths, onLoad, classDefinition) {
    if(!classDefinition)
        classDefinition = HTMLElement;

    return class extends classDefinition {
        constructor() {
            super();
            this.loadComponent(meta, templatePath, stylePaths, onLoad);
        }
    
        async loadComponent(meta, templatePath, stylePaths, onLoad) {
            await loadComponent({
                element: this,
                meta: meta,
                templatePath: templatePath,
                stylePaths: stylePaths,
                onLoad: onLoad
            });
        }
    }
}