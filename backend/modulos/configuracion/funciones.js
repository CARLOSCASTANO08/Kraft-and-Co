function guardarConfiguracion() {
    let nombre = document.getElementById("nombreNegocio").value;
    let correo = document.getElementById("correoNegocio").value;
    let telefono = document.getElementById("telefonoNegocio").value;

    if (nombre == "" || correo == "" || telefono == "") {
        alert("Completa todos los campos");
    } else {
        document.getElementById("mensaje").innerHTML =
            "La configuración de " + nombre + " fue guardada correctamente.";

        alert("Configuración guardada");
    }
}