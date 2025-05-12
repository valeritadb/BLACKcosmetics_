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
    var rechazarCookies = document.getElementById("rechazar-cookies");

     // Mostrar la ventana solo si el usuario no ha aceptado cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        popupCookies.style.display = "flex";
    }

    aceptarCookies.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", "true");
        popupCookies.style.display = "none";
    });

    rechazarCookies.addEventListener("click", function() {
        popupCookies.style.display = "none"; // Solo oculta la ventana sin guardar nada
    });
});

// Función para mostrar el pop-up al cargar la página
window.onload = function() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
};

// Función para cerrar el pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

