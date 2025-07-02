// Crear una factura y guardarla en localStorage
function generarFactura() {
  const factura = `Factura #${Date.now()}`;

  let facturas = JSON.parse(localStorage.getItem('facturas')) || [];

  facturas.push(factura);

  localStorage.setItem('facturas', JSON.stringify(facturas));

  mostrarFacturas();
}

// Mostrar todas las facturas guardadas
function mostrarFacturas() {
  const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
  const lista = document.getElementById('listaFacturas');

  lista.innerHTML = '';

  facturas.forEach(factura => {
    const li = document.createElement('li');
    li.textContent = factura;
    lista.appendChild(li);
  });
}

// Mostrar facturas al abrir la app
mostrarFacturas();

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker registrado:', reg.scope))
    .catch(err => console.error('Error al registrar Service Worker:', err));
}
