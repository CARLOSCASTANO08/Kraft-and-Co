function moneda(valor){return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(valor||0);}
function agregarFila(){
 const tbody=document.getElementById('items');
 const tr=document.createElement('tr');
 tr.innerHTML='<td><input class="product-name" aria-label="Producto" placeholder="Nombre del producto" oninput="calcular()"></td><td><input type="number" min="1" step="1" value="1" aria-label="Cantidad" oninput="calcular()"></td><td><input type="number" min="0" step="1" value="0" aria-label="Precio unitario" oninput="calcular()"></td><td class="importe">$0</td><td class="no-print"><button type="button" onclick="eliminarFila(this)">Quitar</button></td>';
 tbody.appendChild(tr); calcular();
}
function eliminarFila(btn){
 const tbody=document.getElementById('items');
 if(tbody.rows.length===1){alert('La factura debe tener al menos un producto.');return;}
 btn.closest('tr').remove();calcular();
}
function calcular(){
 let subtotal=0;
 document.querySelectorAll('#items tr').forEach(tr=>{
  const inputs=tr.querySelectorAll('input');
  const cantidad=Math.max(0,Number(inputs[1].value)||0);
  const precio=Math.max(0,Number(inputs[2].value)||0);
  const importe=cantidad*precio;subtotal+=importe;
  tr.querySelector('.importe').textContent=moneda(importe);
 });
 const tasa=Math.min(100,Math.max(0,Number(document.getElementById('iva').value)||0));
 const impuesto=subtotal*tasa/100;
 document.getElementById('subtotal').textContent=moneda(subtotal);
 document.getElementById('valorIva').textContent=moneda(impuesto);
 document.getElementById('total').textContent=moneda(subtotal+impuesto);
}
function limpiarFactura(){
 if(!confirm('¿Deseas limpiar los datos para crear una nueva factura?'))return;
 document.getElementById('cliente').value='';
 document.getElementById('documento').value='';
 document.getElementById('numero').value='FAC-'+String(Date.now()).slice(-6);
 document.getElementById('items').innerHTML='';
 agregarFila();calcular();
}
document.addEventListener('DOMContentLoaded',()=>{
 const hoy=new Date();const local=new Date(hoy.getTime()-hoy.getTimezoneOffset()*60000).toISOString().slice(0,10);
 document.getElementById('fecha').value=local;calcular();
});
