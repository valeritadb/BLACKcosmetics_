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
