let movimientos = [];

function registrarMovimiento() {
    let producto = document.getElementById("producto").value;
    let tipo = document.getElementById("tipo").value;
    let cantidad = document.getElementById("cantidad").value;

    if (producto == "" || tipo == "" || cantidad == "") {
        alert("Completa todos los campos");
    } else if (Number(cantidad) <= 0) {
        alert("La cantidad debe ser mayor que cero");
    } else {
        let movimiento = {
            producto: producto,
            tipo: tipo,
            cantidad: cantidad
        };

        movimientos.push(movimiento);
        mostrarMovimientos();

        document.getElementById("producto").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("cantidad").value = "";

        alert("Movimiento registrado");
    }
}

function mostrarMovimientos() {
    let tabla = document.getElementById("tablaInventario");
    tabla.innerHTML = "";

    for (let i = 0; i < movimientos.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${movimientos[i].producto}</td>
                <td>${movimientos[i].tipo}</td>
                <td>${movimientos[i].cantidad}</td>
            </tr>
        `;
    }
}