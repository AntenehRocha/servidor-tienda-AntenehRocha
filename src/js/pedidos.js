document.addEventListener("DOMContentLoaded", () => {
  function obtenerPedidos() {
    fetch("./../php/pedidos.php", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((datos) => {
        if (datos.estado === "correcto") {
          let pedidos = datos.pedidos;

          const contenedorPedidos =
            document.querySelector("#contenedorPedidos");
          contenedorPedidos.innerHTML = "";

          for (const cada_usuario of pedidos) {
            let colorEstado = "text-bg-warning";
            if (cada_usuario.estado === "pendiente") {
              colorEstado = "text-bg-warning";
            } else if (cada_usuario.estado === "aceptado") {
              colorEstado = "text-bg-success";
            } else if (cada_usuario.estado === "rechazado") {
              colorEstado = "text-bg-danger";
            }

            let contenedorPedidos =
              document.querySelector("#contenedorPedidos");
            contenedorPedidos.innerHTML += `
  <div class="list-group-item border-0 border-bottom d-flex flex-wrap align-items-center gap-3 py-3">
    <img src="${cada_usuario.bolsaImg}" alt="${cada_usuario.bolsaNombre}"
      class="rounded-3 border bg-white p-1 flex-shrink-0"
      style="width: 64px; height: 64px; object-fit: contain;">
    <div class="flex-grow-1" style="min-width: 0;">
      <h6 class="mb-1 fw-semibold text-truncate">${cada_usuario.bolsaNombre}</h6>
      <span class="badge text-bg-light border fw-normal">Usuario: ${cada_usuario.nombreUsuario}</span>
      <span class="badge text-bg-light border fw-normal ms-1">Cantidad: ${cada_usuario.bolsaCantidad}</span>
      <span class="badge text-bg-light border fw-normal ms-1">${cada_usuario.bolsaPrecio * cada_usuario.bolsaCantidad} €</span>
      <span class="badge ${colorEstado} fw-normal ms-1">${cada_usuario.estado}</span>
    </div>
    <div class="d-flex gap-2 flex-shrink-0">
      <button type="button" class="btn btn-success btn-sm" data-accion="aceptado"
        data-usuario="${cada_usuario.usuarioId}" data-id="${cada_usuario.bolsaId}">Aceptar</button>
      <button type="button" class="btn btn-outline-danger btn-sm" data-accion="rechazado"
        data-usuario="${cada_usuario.usuarioId}" data-id="${cada_usuario.bolsaId}">Rechazar</button>
    </div>
  </div>
                `;
          }
        }
      });
  }

  const mostrarPedidosBoton = document.querySelector("#mostrarPedidos");
  if (mostrarPedidosBoton) {
    mostrarPedidosBoton.addEventListener("click", () => {
      obtenerPedidos();
    });
  }

  const contenedorPedidos = document.querySelector("#contenedorPedidos");
  contenedorPedidos.addEventListener("click", (event) => {
    const boton = event.target.closest("button");
    if (boton) {
      const accion = boton.dataset.accion;
      const usuarioId = boton.dataset.usuario;
      const bolsaId = boton.dataset.id;

      const pedidoActual = new FormData();

      pedidoActual.append("accion", accion);
      pedidoActual.append("usuarioId", usuarioId);
      pedidoActual.append("bolsaId", bolsaId);

      fetch("./../php/pedidos.php", {
        method: "POST",
        body: pedidoActual,
      })
        .then((res) => res.json())
        .then((datos) => {
          const avisosPedidos = document.querySelector("#avisosPedidos");
          avisosPedidos.innerHTML = "";
          if (datos.estado === "correcto") {
            avisosPedidos.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
            obtenerPedidos();
          } else {
            avisosPedidos.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
            obtenerPedidos();
          }
        });
    }
  });
});
