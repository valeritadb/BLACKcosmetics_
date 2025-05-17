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
    if (!sessionStorage.getItem("cookiesAccepted")) {
        popupCookies.style.display = "flex";
    }

    aceptarCookies.addEventListener("click", function() {
        sessionStorage.setItem("cookiesAccepted", "true");
        popupCookies.style.display = "none";
    });

    rechazarCookies.addEventListener("click", function() {
        popupCookies.style.display = "none"; // Solo oculta la ventana sin guardar nada
    });
});
//-------------------------------------------------------------------------------------

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
//--------------------------------------------------------------------

//funciones del popup
window.onload = function() {
    if (!sessionStorage.getItem('popupMostrado')) { 
        setTimeout(function() {
            const popup = document.getElementById('popup');
            const overlay = document.getElementById('overlay');

            popup.classList.add('mostrar');
            overlay.classList.add('mostrar');

            sessionStorage.setItem('popupMostrado', "true");
        }, 7000);
    }
};

function validarEnvio() {
    let terminosAceptados = document.getElementById('terminos').checked;
    let emailIngresado = document.getElementById('campo-email').value.trim();

    if (!terminosAceptados) {
        alert("Debes aceptar los términos y condiciones.");
        return; // Detiene el proceso si no se aceptan los términos
    }
    
    if (emailIngresado === "") {
        alert("Por favor, ingresa tu correo electrónico.");
        return; // Detiene el envío si el campo está vacío
    }

    cerrarPopup();
}


// Función para cerrar el pop-up
function cerrarPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    popup.classList.remove('mostrar');
    overlay.classList.remove('mostrar');
}

//------------------------------------------------------------------
//Funciones del carrito
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

//MENÚ DESPLEGABLE

document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar el menú desplegable en dispositivos móviles
    const handleMobileMenu = () => {
        const dropdownItems = document.querySelectorAll('.has-dropdown');
        
        if (window.innerWidth <= 768) {
            dropdownItems.forEach(item => {
                const link = item.querySelector('a');
                
                // Eliminar eventos anteriores para evitar duplicados
                link.removeEventListener('click', handleDropdownClick);
                
                // Añadir nuevo evento
                link.addEventListener('click', handleDropdownClick);
            });
        } else {
            // En escritorio, eliminar los eventos de clic
            dropdownItems.forEach(item => {
                const link = item.querySelector('a');
                link.removeEventListener('click', handleDropdownClick);
            });
        }
    };
    
    // Función para manejar el clic en el menú desplegable
    function handleDropdownClick(e) {
        // Solo prevenir el comportamiento predeterminado en móvil
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = this.parentElement;
            
            // Cerrar todos los otros menús desplegables
            const allDropdowns = document.querySelectorAll('.has-dropdown');
            allDropdowns.forEach(dropdown => {
                if (dropdown !== parent) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Alternar el estado activo del menú actual
            parent.classList.toggle('active');
        }
    }
    
    // Inicializar el manejo del menú móvil
    handleMobileMenu();
    
    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', handleMobileMenu);
    
    // Cerrar el menú desplegable al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const dropdowns = document.querySelectorAll('.has-dropdown');
            
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
    
    // Compatibilidad con el cambio de color al hacer scroll
    // Asumiendo que ya tienes una función que añade la clase 'scrolled' al hacer scroll
    const checkScrolledMenu = () => {
        const isScrolled = document.querySelector('.barra-navegacion').classList.contains('scrolled');
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        
        if (isScrolled) {
            dropdownMenus.forEach(menu => {
                menu.classList.add('scrolled-menu');
            });
        } else {
            dropdownMenus.forEach(menu => {
                menu.classList.remove('scrolled-menu');
            });
        }
    };
    
    // Verificar al cargar y al hacer scroll
    checkScrolledMenu();
    window.addEventListener('scroll', checkScrolledMenu);
});