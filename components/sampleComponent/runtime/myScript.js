console.log("My Script");
console.log(document.currentScript);

export function start(shadow){
    console.log(`This is shadow: ${shadow.textContent}`);
    console.log(shadow.querySelectorAll("label")[0].textContent);
}