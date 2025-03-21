import { defineComponent } from '../../../scripts/components.js';

defineComponent({
    tagName: "side-bar",
    meta: import.meta,
    templatePath: "template.html",
    stylePaths: ["/styles/global.css", "styles.css"],
    onLoad: start,
});

/**
 * @param {ShadowRoot} shadow
 */
function start(shadow) {
    const sidebar = shadow.querySelector(".sidebar");
    const openSidebar = shadow.querySelector(".sidebar__btn:nth-child(2)");
    const activeNot = shadow.querySelector(".sidebar__btn:nth-child(1)");
    const sidebarBox = shadow.querySelector(".sidebar-box");
    const profileBox = shadow.querySelector(".image");
    const showName = shadow.querySelector(".name");
    var defaultName = "your name";
    openSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("--open");
        sidebarBox.classList.toggle("--active");
    });
    activeNot.addEventListener("click", () => {
        activeNot.classList.toggle("--active");
    });
    if (!localStorage.getItem("name")) {
        var clientName = prompt("please enter your name:");
        if (!clientName || clientName == "null") {
            ShowingName(defaultName);
        } else {
            localStorage.setItem("name", clientName);
            ShowingName(clientName);
        }
    } else {
        ShowingName(localStorage.getItem("name"));
    }

    function ShowingName(n) {
        profileBox.innerHTML = n[0];
        showName.innerHTML = n;
        if (n.length > 9) {
            showName.style.animation = "show-name-animation 5s linear infinite";
        }
    }
}
