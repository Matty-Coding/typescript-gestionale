// toggle sidebar
const sideBar = document.querySelector("aside") as HTMLElement;
const hamburgerMenu = document.querySelector("#hamburger-icon") as HTMLElement;

hamburgerMenu.onclick = function (): void {
  sideBar.classList.toggle("-translate-x-[105%]");
  sideBar.classList.toggle("translate-x-0");
};
