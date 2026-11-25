let categorias = [];

function registrarCategoria() {
    let nombre = document.getElementById("nombreCategoria").value;

    if (nombre == "") {
        alert("Escribe el nombre de la categoría");
    } else {
        categorias.push(nombre);
        mostrarCategorias();

        document.getElementById("nombreCategoria").value = "";
        alert("Categoría registrada");
    }
}

function mostrarCategorias() {
    let tabla = document.getElementById("tablaCategorias");
    tabla.innerHTML = "";

    for (let i = 0; i < categorias.length; i++) {
        tabla.innerHTML += `
            <tr>
                <td>${categorias[i]}</td>
                <td>
                    <button onclick="eliminarCategoria(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function eliminarCategoria(posicion) {
    categorias.splice(posicion, 1);
    mostrarCategorias();
    alert("Categoría eliminada");
}