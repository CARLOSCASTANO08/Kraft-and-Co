let historial = [];

function registrarOperacion() {
    let usuario = document.getElementById("usuario").value;
    let operacion = document.getElementById("operacion").value;

    if (usuario == "" || operacion == "") {
        alert("Completa todos los campos");
    } else {
        let fecha = new Date().toLocaleString();

        let registro = {
            usuario: usuario,
            operacion: operacion,
            fecha: fecha
        };

        historial.push(registro);
        mostrarHistorial();

        document.getElementById("usuario").value = "";
        document.getElementById("operacion").value = "";

        alert("Operación registrada");
    }
}

function mostrarHistorial() {
    let tabla = document.getElementById("tablaHistorial");
    tabla.innerHTML = "";

    for (let i = 0; i < historial.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${historial[i].usuario}</td>
                <td>${historial[i].operacion}</td>
                <td>${historial[i].fecha}</td>
            </tr>
        `;
    }
}