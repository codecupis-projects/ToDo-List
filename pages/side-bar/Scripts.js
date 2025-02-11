const sidebar = document.querySelector(".sidebar");
const openSidebar = document.querySelector(".sidebar__btn:nth-child(2)");
const activeNot = document.querySelector(".sidebar__btn:nth-child(1)");
const sidebarBox = document.querySelector(".sidebar-box");
openSidebar.addEventListener("click", ()=>{
  sidebar.classList.toggle("--open");
  sidebarBox.classList.toggle("--active");
})
activeNot.addEventListener("click", ()=> {
  activeNot.classList.toggle("--active");
})
