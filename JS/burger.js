let burger = document.querySelector('.burger'); // Получения объекта-кнопки бургера
let hidden_menu = document.querySelector(".hidden-info"); // Получение объекта скрытого меню
let burger_sticks = document.querySelectorAll(".burger > .block");
hidden_menu.classList.toggle("hide-info"); // скрытие меню
hidden_menu.classList.toggle("hidden-info");
window.resize = () => {
    animate_burger();
    animate_burger();
}
burger.onclick = () => {
    animate_burger();
    hidden_menu.classList.toggle("hide-info"); // Скрытие или показывание меню
    hidden_menu.classList.toggle("hidden-info");
    (!document.querySelector(".hide-info")) ? document.body.style.overflow = "hidden": document.body.style.overflow = "auto"; // отключение скрола для активированного бургер-меню
};

function animate_burger() {
    burger_sticks.forEach(burger_stick => {
        burger_stick.classList.toggle("burger-active"); // анимация бургера
    });
}