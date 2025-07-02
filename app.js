function generarFactura() {
  const producto = document.getElementById('producto').value;
  const precio = document.getElementById('precio').value;

  if (producto === '' || precio === '') {
    alert('Ingresa producto y precio');
    return;
  }

  const factura = {
    producto: producto,
    precio: parseFloat(precio),
    fecha: new Date().toLocaleString()
  };

  let facturas = JSON.parse(localStorage.getItem('facturas')) || [];
  facturas.push(factura);
  localStorage.setItem('facturas', JSON.stringify(facturas));

  mostrarFacturas();

  document.getElementById('producto').value = '';
  document.getElementById('precio').value = '';
}

function mostrarFacturas() {
  const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
  const lista = document.getElementById('listaFacturas');
  lista.innerHTML = '';

  facturas.forEach(f => {
    const li = document.createElement('li');
    li.textContent = `Producto: ${f.producto} | Precio: $${f.precio} | Fecha: ${f.fecha}`;
    lista.appendChild(li);
  });
}

mostrarFacturas();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('SW registrado:', reg.scope))
    .catch(err => console.error('Error SW:', err));
}
