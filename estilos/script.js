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
    var popupCookies = document.getElementById("popup-cookies");
    var aceptarCookies = document.getElementById("aceptar-cookies");

    //verificacion de si ya fueron aceptadas
    if (localStorage.getItem("cookies-aceptadas") === "true"){
    popupCookies.style.display = "none";
    } else {
        popupCookies.style.display = "flex";
    }

    //evento al hacer click

    aceptarCookies.addEventListener("click", function(){
        localStorage.setItem("cookies-aceptadas", "true");
        popupCookies.style.display = "none";
    });
});
