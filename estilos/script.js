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

//Funcion que abre el popup y lo desaparece al cerrar o al enviar el correo

document.addEventListener("DOMContentLoaded", function(){
    var popup = document.getElementById("popup");
    var overlay = document.getElementById("overlay");
    var botonPopup = document.getElementById("boton-popup");
    var botonCerrar = document.getElementById("boton-popup-cerrar");
    var campoEmail = document.getElementById("campo-email");

    //Verifica si el usuario ya ha enviado su correo
    if(localStorage.getItem("promoAccepted") === "true"){
        popup.style.display = "none";
        overlay.style.display = "none";
    } else {
        popup.style.display = "block";
        overlay.style.display = "block";
    }

    //Evento que envia el correo y cierra el pop-up
    botonPopup.addEventListener("click", function(){
        if (campoEmail.value.trim() !== ""){
            localStorage.setItem("promoAccepted", "true"); //Guarda los datos
            popup.style.display = "none"; //oculta el popup
            overlay.style.display = "none";
        }
    });

    //Evento del boton de cerrar
    botonCerrar.addEventListener("click", function(){
        popup.style.display = "none";
        overlay.style.display = "none";
    });
});
