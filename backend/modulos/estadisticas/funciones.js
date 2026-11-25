let ventas = 250000;
let productosVendidos = 35;
let clientesAtendidos = 20;

document.getElementById("ventas").innerHTML = "$" + ventas;
document.getElementById("vendidos").innerHTML = productosVendidos;
document.getElementById("clientes").innerHTML = clientesAtendidos;

document.getElementById("resumen").innerHTML =
    "Durante el día se registraron " +
    productosVendidos +
    " productos vendidos y se atendieron " +
    clientesAtendidos +
    " clientes.";