let solicitudes = [];

function registrarSolicitud() {
    let cliente = document.getElementById("cliente").value;
    let servicio = document.getElementById("servicio").value;
    let estado = document.getElementById("estado").value;

    if (cliente == "" || servicio == "" || estado == "") {
        alert("Completa todos los campos");
    } else {
        let solicitud = {
            cliente: cliente,
            servicio: servicio,
            estado: estado
        };

        solicitudes.push(solicitud);
        mostrarSolicitudes();

        document.getElementById("cliente").value = "";
        document.getElementById("servicio").value = "";
        document.getElementById("estado").value = "";

        alert("Solicitud registrada");
    }
}

function mostrarSolicitudes() {
    let tabla = document.getElementById("tablaSolicitudes");
    tabla.innerHTML = "";

    for (let i = 0; i < solicitudes.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${solicitudes[i].cliente}</td>
                <td>${solicitudes[i].servicio}</td>
                <td>${solicitudes[i].estado}</td>
                <td>
                    <button onclick="cambiarEstado(${i})">Cambiar estado</button>
                    <button onclick="eliminarSolicitud(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function cambiarEstado(posicion) {
    let nuevoEstado = prompt(
        "Escribe el nuevo estado: Pendiente, En proceso o Finalizada"
    );

    if (
        nuevoEstado == "Pendiente" ||
        nuevoEstado == "En proceso" ||
        nuevoEstado == "Finalizada"
    ) {
        solicitudes[posicion].estado = nuevoEstado;
        mostrarSolicitudes();
    } else if (nuevoEstado != null) {
        alert("Estado no válido");
    }
}

function eliminarSolicitud(posicion) {
    solicitudes.splice(posicion, 1);
    mostrarSolicitudes();
}