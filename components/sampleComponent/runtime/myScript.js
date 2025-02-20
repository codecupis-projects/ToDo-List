export function start(/** @type {ShadowRoot} */ shadow){
    console.log(`My Script started. Shadow root's child count: ${shadow.children.length}`);
    someFunction(shadow.querySelectorAll("label")[0]);
    someFunction(shadow.querySelectorAll("label")[1]);
    someFunction(shadow.querySelectorAll("label")[2]);
}

function someFunction(label){
    console.log(label.textContent);
}