if(!window.importMap){
    window.importMap = {
        imports: {
            "components": "/scripts/components.js"
        }
    };
    
    const script = document.createElement("script");
    script.type = "importmap";
    script.textContent = JSON.stringify(window.importMap);
    document.currentScript.after(script);
}
