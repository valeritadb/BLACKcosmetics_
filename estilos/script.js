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

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cookiesBanner = document.getElementById('popup-cookies');
    const btnAceptar = document.getElementById('aceptar-cookies');
    const btnRechazar = document.getElementById('rechazar-cookies');
    const btnPersonalizar = document.querySelectorAll('#rechazar-cookies')[1]; // El tercer botón es "Personalizar"
    
    const popupPreferencias = document.getElementById('popup-preferencias-cookies');
    const btnGuardarPreferencias = document.getElementById('guardar-preferencias');
    const btnCerrarPreferencias = document.getElementById('cerrar-preferencias');
    
    const checkboxAnaliticas = document.getElementById('cookies-analiticas');
    const checkboxPersonalizacion = document.getElementById('cookies-personalizacion');
    const checkboxMarketing = document.getElementById('cookies-marketing');
    
    // Comprobar si ya se han aceptado las cookies
    const cookiesAceptadas = sessionStorage.getItem('cookiesAceptadas');
    const preferenciasGuardadas = sessionStorage.getItem('preferenciasGuardadas');
    
    // Si no se han aceptado las cookies, mostrar el banner
    if (!cookiesAceptadas && !preferenciasGuardadas) {
        cookiesBanner.style.display = 'flex';
    }else{
        cookiesBanner.style.display = 'none';}
    
    // Si hay preferencias guardadas, cargarlas
    if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        checkboxAnaliticas.checked = preferencias.analiticas;
        checkboxPersonalizacion.checked = preferencias.personalizacion;
        checkboxMarketing.checked = preferencias.marketing;
    }
    
    // Función para aceptar todas las cookies
    function aceptarCookies() {
        sessionStorage.setItem('cookiesAceptadas', 'true');
        cookiesBanner.style.display = 'none';
        
        // Guardar todas las preferencias como aceptadas
        const todasPreferencias = {
            analiticas: true,
            personalizacion: true,
            marketing: true
        };
        sessionStorage.setItem('preferenciasGuardadas', JSON.stringify(todasPreferencias));
        
        // Actualizar los checkboxes
        checkboxAnaliticas.checked = true;
        checkboxPersonalizacion.checked = true;
        checkboxMarketing.checked = true;
        
        console.log('Todas las cookies han sido aceptadas');
    }
    
    // Función para rechazar todas las cookies excepto las necesarias
    function rechazarCookies() {
        sessionStorage.setItem('cookiesAceptadas', 'false');
        cookiesBanner.style.display = 'none';
        
        // Guardar todas las preferencias como rechazadas (excepto las necesarias)
        const preferenciasRechazadas = {
            analiticas: false,
            personalizacion: false,
            marketing: false
        };
        sessionStorage.setItem('preferenciasGuardadas', JSON.stringify(preferenciasRechazadas));
        
        // Actualizar los checkboxes
        checkboxAnaliticas.checked = false;
        checkboxPersonalizacion.checked = false;
        checkboxMarketing.checked = false;
        
        console.log('Todas las cookies han sido rechazadas (excepto las necesarias)');
    }
    
    // Función para guardar las preferencias personalizadas
    function guardarPreferencias() {
        const preferenciasPersonalizadas = {
            analiticas: checkboxAnaliticas.checked,
            personalizacion: checkboxPersonalizacion.checked,
            marketing: checkboxMarketing.checked
        };
        
        sessionStorage.setItem('preferenciasGuardadas', JSON.stringify(preferenciasPersonalizadas));
        sessionStorage.setItem('cookiesAceptadas', 'personalizado');
        
        popupPreferencias.style.display = 'none';
        cookiesBanner.style.display = 'none';
        
        console.log('Preferencias de cookies guardadas:', preferenciasPersonalizadas);
    }
    
    // Event Listeners
    btnAceptar.addEventListener('click', aceptarCookies);
    btnRechazar.addEventListener('click', rechazarCookies);
    
    // Mostrar popup de preferencias al hacer clic en "Personalizar"
    btnPersonalizar.addEventListener('click', function() {
        cookiesBanner.style.display = 'none';
        popupPreferencias.style.display = 'flex';
    });
    
    // Guardar preferencias
    btnGuardarPreferencias.addEventListener('click', guardarPreferencias);
    
    // Cerrar popup de preferencias sin guardar
    btnCerrarPreferencias.addEventListener('click', function() {
        popupPreferencias.style.display = 'none';
        
        // Si no hay preferencias guardadas, volver a mostrar el banner
        if (!sessionStorage.getItem('preferenciasGuardadas')) {
            cookiesBanner.style.display = 'flex';
        }
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