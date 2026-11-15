document.addEventListener("DOMContentLoaded", () => {
  const mostrarPedidosBoton = document.querySelector("#mostrarPedidos");
  if (mostrarPedidosBoton) {
    mostrarPedidosBoton.addEventListener("click", () => {
      fetch("./../php/pedidos.php", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((datos) => {
          if (datos.estado === "correcto") {
            let pedidos = datos.pedidos;

            const contenedorPedidos = document.querySelector("#contenedorPedidos");
            contenedorPedidos.innerHTML = "";

            for (const cada_usuario of pedidos) {
              for (const cada_pedido of cada_usuario.bolsa) {
                let contenedorPedidos =
                  document.querySelector("#contenedorPedidos");
                contenedorPedidos.innerHTML += `
  <div class="list-group-item border-0 border-bottom d-flex flex-wrap align-items-center gap-3 py-3">
    <img src="${cada_pedido.imagen}" alt="${cada_pedido.nombre}"
      class="rounded-3 border bg-white p-1 flex-shrink-0"
      style="width: 64px; height: 64px; object-fit: contain;">
    <div class="flex-grow-1" style="min-width: 0;">
      <h6 class="mb-1 fw-semibold text-truncate">${cada_pedido.nombre}</h6>
      <span class="badge text-bg-light border fw-normal">Usuario: ${cada_usuario.nombreUsuario}</span>
      <span class="badge text-bg-light border fw-normal ms-1">Cantidad: ${cada_pedido.cantidad}</span>
      <span class="badge text-bg-light border fw-normal ms-1">${cada_pedido.precio * cada_pedido.cantidad} €</span>
    </div>
    <div class="d-flex gap-2 flex-shrink-0">
      <button type="button" class="btn btn-success btn-sm" data-accion="aceptado"
        data-usuario="${cada_usuario.usuarioId}" data-id="${cada_pedido._id}">Aceptar</button>
      <button type="button" class="btn btn-outline-danger btn-sm" data-accion="rechazado"
        data-usuario="${cada_usuario.usuarioId}" data-id="${cada_pedido._id}">Rechazar</button>
    </div>
  </div>
                `;
              }
            }
          }
        });
    });
  }
});
