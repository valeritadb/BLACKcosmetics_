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

// Carrito de compras funcional para BLACK Cosmetics
document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const iconoCarrito = document.querySelector(".fa-shopping-bag")
  const carrito = document.getElementById("carrito")
  const cerrarCarrito = document.getElementById("cerrar-carrito")
  const overlayCarrito = document.getElementById("overlay-carrito")
  const contenidoCarrito = document.getElementById("contenido-carrito")
  const totalCarrito = document.getElementById("total-carrito")
  const contadorCarrito = document.getElementById("contador-carrito")
  const btnComprar = document.getElementById("btn-comprar-carrito")
  const btnSeguirComprando = document.getElementById("btn-seguir-comprando")

  // Carrito de compras (array de productos)
  let carritoItems = JSON.parse(localStorage.getItem("carritoBlack")) || []

  // Mostrar carrito y fondo oscuro
  iconoCarrito.addEventListener("click", () => {
    carrito.classList.add("activo")
    overlayCarrito.classList.add("activo")
    actualizarCarritoUI()
  })

  // Cerrar carrito y fondo oscuro
  cerrarCarrito.addEventListener("click", () => {
    carrito.classList.remove("activo")
    overlayCarrito.classList.remove("activo")
  })

  // Cerrar carrito al hacer clic en el overlay
  overlayCarrito.addEventListener("click", () => {
    carrito.classList.remove("activo")
    overlayCarrito.classList.remove("activo")
  })

  // Seguir comprando
  if (btnSeguirComprando) {
    btnSeguirComprando.addEventListener("click", () => {
      carrito.classList.remove("activo")
      overlayCarrito.classList.remove("activo")
    })
  }

  // Botón comprar
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      if (carritoItems.length > 0) {
        alert("¡Gracias por tu compra! Total: " + calcularTotal() + "€")
        vaciarCarrito()
      }
    })
  }

  // Función para añadir un producto al carrito
  window.agregarAlCarrito = (id, nombre, precio, imagen, color, cantidad = 1) => {
    // Comprobar si el producto ya está en el carrito
    const productoExistente = carritoItems.find((item) => item.id === id && item.color === color)

    if (productoExistente) {
      // Si ya existe, aumentar la cantidad
      productoExistente.cantidad += cantidad
    } else {
      // Si no existe, añadir nuevo producto
      carritoItems.push({
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        color: color,
        cantidad: cantidad,
      })
    }

    // Guardar en localStorage y actualizar UI
    guardarCarrito()
    actualizarContadorCarrito()

    // Mostrar confirmación
    mostrarNotificacion(`${nombre} (${color}) añadido al carrito`)

    // Opcional: mostrar el carrito después de añadir
    carrito.classList.add("activo")
    overlayCarrito.classList.add("activo")
    actualizarCarritoUI()
  }

  // Función para actualizar la cantidad de un producto
  function actualizarCantidad(id, color, nuevaCantidad) {
    const producto = carritoItems.find((item) => item.id === id && item.color === color)

    if (producto) {
      producto.cantidad = nuevaCantidad
      if (producto.cantidad <= 0) {
        eliminarProducto(id, color)
      } else {
        guardarCarrito()
        actualizarCarritoUI()
      }
    }
  }

  // Función para eliminar un producto
  function eliminarProducto(id, color) {
    carritoItems = carritoItems.filter((item) => !(item.id === id && item.color === color))
    guardarCarrito()
    actualizarCarritoUI()
    actualizarContadorCarrito()
  }

  // Función para vaciar el carrito
  function vaciarCarrito() {
    carritoItems = []
    guardarCarrito()
    actualizarCarritoUI()
    actualizarContadorCarrito()
  }

  // Función para guardar el carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem("carritoBlack", JSON.stringify(carritoItems))
  }

  // Función para calcular el total del carrito
  function calcularTotal() {
    return carritoItems
      .reduce((total, item) => {
        return total + item.precio * item.cantidad
      }, 0)
      .toFixed(2)
  }

  // Función para actualizar el contador del carrito
  function actualizarContadorCarrito() {
    const cantidadTotal = carritoItems.reduce((total, item) => {
      return total + item.cantidad
    }, 0)

    if (contadorCarrito) {
      if (cantidadTotal > 0) {
        contadorCarrito.textContent = cantidadTotal
        contadorCarrito.style.display = "flex"
      } else {
        contadorCarrito.style.display = "none"
      }
    }
  }

  // Función para actualizar la UI del carrito
  function actualizarCarritoUI() {
    if (!contenidoCarrito) return

    // Limpiar contenido actual
    contenidoCarrito.innerHTML = ""

    if (carritoItems.length === 0) {
      // Carrito vacío
      contenidoCarrito.innerHTML = `
                <div class="carrito-vacio">
                    <p>SU CESTA ESTÁ VACÍA</p>
                    <p class="carrito-vacio-subtitulo">Parece que aún no has añadido nada a tu cesta</p>
                </div>
            `
      if (totalCarrito) totalCarrito.style.display = "none"
      if (btnComprar) btnComprar.style.display = "none"
      if (btnSeguirComprando) btnSeguirComprando.textContent = "Seguir comprando"
    } else {
      // Mostrar productos
      carritoItems.forEach((item) => {
        const productoHTML = document.createElement("div")
        productoHTML.className = "carrito-item"
        productoHTML.innerHTML = `
                    <div class="carrito-item-imagen">
                        <img src="${item.imagen}" alt="${item.nombre}">
                    </div>
                    <div class="carrito-item-detalles">
                        <h3>${item.nombre}</h3>
                        <p class="carrito-item-color">${item.color}</p>
                    </div>
                    <div class="carrito-item-precio">
                        ${item.precio.toFixed(2)}€
                    </div>
                    <div class="carrito-item-cantidad">
                        <button class="cantidad-btn menos" data-id="${item.id}" data-color="${item.color}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="cantidad-btn mas" data-id="${item.id}" data-color="${item.color}">+</button>
                    </div>
                    <button class="carrito-item-eliminar" data-id="${item.id}" data-color="${item.color}">
                        <i class="fa fa-times"></i>
                    </button>
                `
        contenidoCarrito.appendChild(productoHTML)
      })

      // Mostrar total
      if (totalCarrito) {
        totalCarrito.innerHTML = `
                    <div class="carrito-total-texto">Total</div>
                    <div class="carrito-total-precio">${calcularTotal()}€</div>
                `
        totalCarrito.style.display = "flex"
      }

      // Mostrar botón de compra
      if (btnComprar) btnComprar.style.display = "block"

      // Cambiar texto del botón seguir comprando
      if (btnSeguirComprando) btnSeguirComprando.textContent = "Seguir comprando"

      // Añadir event listeners a los botones de cantidad y eliminar
      document.querySelectorAll(".carrito-item-cantidad .cantidad-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          const color = this.getAttribute("data-color")
          const producto = carritoItems.find((item) => item.id === id && item.color === color)

          if (producto) {
            let nuevaCantidad = producto.cantidad
            if (this.classList.contains("menos")) {
              nuevaCantidad--
            } else if (this.classList.contains("mas")) {
              nuevaCantidad++
            }

            actualizarCantidad(id, color, nuevaCantidad)
          }
        })
      })

      document.querySelectorAll(".carrito-item-eliminar").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          const color = this.getAttribute("data-color")
          eliminarProducto(id, color)
        })
      })
    }
  }

  // Función para mostrar notificación
  function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement("div")
    notificacion.className = "notificacion-carrito"
    notificacion.textContent = mensaje
    document.body.appendChild(notificacion)

    // Mostrar notificación
    setTimeout(() => {
      notificacion.classList.add("mostrar")
    }, 10)

    // Ocultar y eliminar después de 3 segundos
    setTimeout(() => {
      notificacion.classList.remove("mostrar")
      setTimeout(() => {
        document.body.removeChild(notificacion)
      }, 300)
    }, 3000)
  }

  // Inicializar contador de carrito
  actualizarContadorCarrito()
})
