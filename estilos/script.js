// script.js
// Autor: Valeria
// Descripción: Archivo JavaScript para funciones de la web

console.log("probandoooooo");

window.addEventListener("scroll", function(){
    var header = document.querySelector(".barra-navegacion");
    if(window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function(){
    var popupCookies = document.getElementById("popupCookies");
    var aceptarCookies = document.getElementById("aceptarCookies");

    //Mostar la ventana solo si no se han aceptado las cookies
    if (!localStorage.getItem(cookiesAceptadas)){
        popupCookies.style.display = "flex";
    }

    aceptarCookies.addEventListener("click", function(){
        localStorage.setItem("cookiesAceptadas", "true");
        popupCookies.style.display = "none";
    });
});
