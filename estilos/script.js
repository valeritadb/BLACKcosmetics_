// script.js
// Autor: Valeria
// Descripción: Archivo JavaScript para funciones de la web

console.log("probandoooooo");

window.addEventListener("scroll", function(){
    var header = document.querySelector(".barra-navegacion");
    if(window.scrollY > 50) {
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

/*
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
*/

window.onload = function(){
    if (!localStorage.getItem('popupMostrado')) { //mostrar el popup si no se mostró antes
        setTimeout(function(){
            document.getElementById('popup').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
            localStorage.setItem('popupMostrado', true); //guarda el estado en el navegador
        }, 7000);//3 segundos
    }
};

//Funcion para cerrar el popup
function validarEnvio(){
    let terminosAceptados = document.getElementById('terminos').checked;
    let emailIngresado = document.getElementById('campo-email').value.trim();

    if (!terminosAceptados){
        alert("Debes aceptar los términos y condiciones");
        return;
    }
}

// Función para cerrar el pop-up
function cerrarPopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const iconoCarrito = document.querySelector(".fa-shopping-bag");
    const carrito = document.getElementById("carrito");
    const cerrarCarrito = document.getElementById("cerrar-carrito");
    const overlayCarrito = document.getElementById("overlay-carrito");

    // Mostrar carrito y fondo oscuro
    iconoCarrito.addEventListener("click", function () {
        carrito.classList.add("activo");
        overlayCarrito.classList.add("activo");
    });

    // Cerrar carrito y fondo oscuro
    cerrarCarrito.addEventListener("click", function () {
        carrito.classList.remove("activo");
        overlayCarrito.classList.remove("activo");
    });
});

