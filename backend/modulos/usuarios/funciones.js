let usuarios = [];

function registrarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let rol = document.getElementById("rol").value;

    if (nombre == "" || correo == "" || rol == "") {
        alert("Completa todos los campos");
    } else {
        let usuario = {
            nombre: nombre,
            correo: correo,
            rol: rol,
            estado: "Activo"
        };

        usuarios.push(usuario);
        mostrarUsuarios();

        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("rol").value = "";

        alert("Usuario registrado correctamente");
    }
}

function mostrarUsuarios() {
    let tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    for (let i = 0; i < usuarios.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${usuarios[i].nombre}</td>
                <td>${usuarios[i].correo}</td>
                <td>${usuarios[i].rol}</td>
                <td>${usuarios[i].estado}</td>
                <td>
                    <button onclick="cambiarEstado(${i})">Cambiar estado</button>
                    <button onclick="eliminarUsuario(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function cambiarEstado(posicion) {
    if (usuarios[posicion].estado == "Activo") {
        usuarios[posicion].estado = "Inactivo";
    } else {
        usuarios[posicion].estado = "Activo";
    }

    mostrarUsuarios();
}

function eliminarUsuario(posicion) {
    usuarios.splice(posicion, 1);
    mostrarUsuarios();
}