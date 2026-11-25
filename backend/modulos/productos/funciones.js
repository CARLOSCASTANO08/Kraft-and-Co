let productos = [];

function registrar() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;

    if (nombre == "" || precio == "" || cantidad == "") {
        alert("Debes completar todos los campos");
    } else if (Number(precio) < 0 || Number(cantidad) < 0) {
        alert("El precio y la cantidad no pueden ser negativos");
    } else {
        let producto = {
            nombre: nombre,
            precio: precio,
            cantidad: cantidad
        };

        productos.push(producto);
        mostrarProductos();

        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("cantidad").value = "";

        alert("Producto registrado correctamente");
    }
}

function mostrarProductos() {
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${productos[i].nombre}</td>
                <td>$${productos[i].precio}</td>
                <td>${productos[i].cantidad}</td>
                <td>
                    <button onclick="editarProducto(${i})">Editar</button>
                    <button onclick="eliminar(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function editarProducto(posicion) {
    let nuevoPrecio = prompt("Ingresa el nuevo precio:", productos[posicion].precio);
    let nuevaCantidad = prompt("Ingresa la nueva cantidad:", productos[posicion].cantidad);

    if (nuevoPrecio != null && nuevaCantidad != null &&
        nuevoPrecio != "" && nuevaCantidad != "" &&
        Number(nuevoPrecio) >= 0 && Number(nuevaCantidad) >= 0) {

        productos[posicion].precio = nuevoPrecio;
        productos[posicion].cantidad = nuevaCantidad;
        mostrarProductos();
    } else {
        alert("Los datos no son válidos");
    }
}

function eliminar(posicion) {
    productos.splice(posicion, 1);
    mostrarProductos();
    alert("Producto eliminado");
}