// Lista de productos guardados en este navegador.
let productos = JSON.parse(localStorage.getItem("kraftProductos")) || [];
let imagenSeleccionada = "";

// Convierte el precio a pesos colombianos para mostrarlo.
function formatoPrecio(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(valor);
}

// Muestra una vista previa cuando se selecciona una imagen.
function mostrarImagen() {
    let archivo = document.getElementById("imagen").files[0];

    if (archivo == undefined) {
        return;
    }

    if (!archivo.type.startsWith("image/")) {
        alert("Selecciona un archivo de imagen.");
        return;
    }

    // Se limita el tamaño para no llenar el almacenamiento del navegador.
    if (archivo.size > 2500000) {
        alert("La imagen debe pesar menos de 2.5 MB.");
        document.getElementById("imagen").value = "";
        return;
    }

    let lector = new FileReader();

    lector.onload = function(evento) {
        imagenSeleccionada = evento.target.result;
        document.getElementById("vistaPrevia").src = imagenSeleccionada;
    };

    lector.readAsDataURL(archivo);
}

// Guarda el producto y actualiza la lista.
function agregarProducto() {
    let nombre = document.getElementById("nombre").value.trim();
    let categoria = document.getElementById("categoria").value;
    let precio = Number(document.getElementById("precio").value);
    let cantidad = Number(document.getElementById("cantidad").value);
    let descripcion = document.getElementById("descripcion").value.trim();

    if (nombre == "" || categoria == "" ||
        document.getElementById("precio").value == "" ||
        document.getElementById("cantidad").value == "") {
        alert("Completa el nombre, categoría, precio y cantidad.");
        return;
    }

    if (precio < 0 || cantidad < 0 || !Number.isInteger(cantidad)) {
        alert("Revisa el precio y la cantidad ingresada.");
        return;
    }

    let producto = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        cantidad: cantidad,
        descripcion: descripcion,
        imagen: imagenSeleccionada
    };

    productos.push(producto);
    guardarProductos();
    limpiarFormulario();
    alert("Producto agregado al inventario.");
}

// Guarda los productos en el almacenamiento del navegador.
function guardarProductos() {
    localStorage.setItem("kraftProductos", JSON.stringify(productos));
    mostrarProductos();
    actualizarResumen();
}

// Dibuja las tarjetas de productos.
function mostrarProductos() {
    let lista = document.getElementById("listaProductos");
    let busqueda = document.getElementById("buscar").value.toLowerCase();

    lista.innerHTML = "";
    let encontrados = 0;

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];

        if (!producto.nombre.toLowerCase().includes(busqueda) &&
            !producto.categoria.toLowerCase().includes(busqueda)) {
            continue;
        }

        encontrados++;

        let foto = producto.imagen || "https://placehold.co/400x300?text=Producto";
        let avisoStock = producto.cantidad <= 5 ? "stock-low" : "";

        lista.innerHTML += `
            <article class="product-card">
                <img src="${foto}" alt="${producto.nombre}">
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="product-category">${producto.categoria}</p>
                    <p class="product-price">${formatoPrecio(producto.precio)}</p>
                    <div class="stock-line">
                        <span>Existencias</span>
                        <strong class="${avisoStock}">${producto.cantidad} unidades</strong>
                    </div>
                    <p class="help-text">${producto.descripcion || "Sin descripción"}</p>
                    <div class="product-actions">
                        <button onclick="cambiarStock(${i}, 'entrada')">+ Entrada</button>
                        <button onclick="cambiarStock(${i}, 'salida')">- Salida</button>
                        <button onclick="editarProducto(${i})">Editar</button>
                        <button onclick="eliminarProducto(${i})">Eliminar</button>
                    </div>
                </div>
            </article>
        `;
    }

    if (encontrados == 0) {
        lista.innerHTML = '<div class="empty-inventory">No hay productos para mostrar. Agrega uno usando el formulario.</div>';
    }

    document.getElementById("textoCantidad").innerHTML = encontrados + " productos";
}

// Actualiza los indicadores de la parte superior.
function actualizarResumen() {
    let unidades = 0;
    let bajos = 0;

    for (let i = 0; i < productos.length; i++) {
        unidades += Number(productos[i].cantidad);

        if (productos[i].cantidad <= 5) {
            bajos++;
        }
    }

    document.getElementById("totalProductos").innerHTML = productos.length;
    document.getElementById("totalUnidades").innerHTML = unidades;
    document.getElementById("productosBajos").innerHTML = bajos;
}

// Permite sumar o descontar unidades.
function cambiarStock(posicion, tipo) {
    let cantidad = prompt("¿Cuántas unidades deseas registrar?");

    if (cantidad == null || cantidad == "" ||
        !Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0) {
        alert("Ingresa una cantidad válida.");
        return;
    }

    cantidad = Number(cantidad);

    if (tipo == "entrada") {
        productos[posicion].cantidad += cantidad;
    } else {
        if (cantidad > productos[posicion].cantidad) {
            alert("No hay suficientes unidades en el inventario.");
            return;
        }

        productos[posicion].cantidad -= cantidad;
    }

    guardarProductos();
}

// Permite cambiar precio, cantidad y descripción.
function editarProducto(posicion) {
    let producto = productos[posicion];
    let nuevoPrecio = prompt("Nuevo precio:", producto.precio);
    let nuevaCantidad = prompt("Nueva cantidad:", producto.cantidad);
    let nuevaDescripcion = prompt("Descripción:", producto.descripcion);

    if (nuevoPrecio == null || nuevaCantidad == null || nuevaDescripcion == null) {
        return;
    }

    if (nuevoPrecio == "" || nuevaCantidad == "" ||
        Number(nuevoPrecio) < 0 || Number(nuevaCantidad) < 0 ||
        !Number.isInteger(Number(nuevaCantidad))) {
        alert("Los datos ingresados no son válidos.");
        return;
    }

    producto.precio = Number(nuevoPrecio);
    producto.cantidad = Number(nuevaCantidad);
    producto.descripcion = nuevaDescripcion;

    guardarProductos();
}

// Elimina un producto de la lista.
function eliminarProducto(posicion) {
    let confirmar = confirm("¿Seguro que deseas eliminar este producto?");

    if (confirmar) {
        productos.splice(posicion, 1);
        guardarProductos();
    }
}

// Limpia los campos del formulario.
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("vistaPrevia").src = "";
    imagenSeleccionada = "";
}

// Muestra los productos guardados al abrir la página.
mostrarProductos();
actualizarResumen();
