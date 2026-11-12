document.addEventListener("click", (event) => {
  const btn = event.target.closest("#btnAgregarBolsa");
  if (!btn) return;
  const productoId = btn.getAttribute("data-id");
  const cantidadProducto = document.querySelector("#cantidadProducto");
  if (cantidadProducto) {
    const cantidad = parseInt(cantidadProducto.value);
    if (cantidad > 0) {
      const IdProductoBolsa = new FormData();
      IdProductoBolsa.append("id", productoId);
      IdProductoBolsa.append("cantidad", cantidad);
      console.warn(productoId);

      fetch("./../php/bolsa.php", {
        method: "POST",
        body: IdProductoBolsa,
      })
        .then((res) => res.json())
        .then((datos) => {
          console.warn(datos.mensaje);
          if (datos.estado === "correcto") {
            const avisosDOM = document.querySelector("#avisosDOM");
            obtenerBolsa();
            if (avisosDOM) {
              avisosDOM.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
            }
          } else {
            const avisosDOM = document.querySelector("#avisosDOM");
            avisosDOM.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
            console.warn("Respuesta del servidor:", datos.mensaje);
          }
        });
    } else {
      const avisosDOM = document.querySelector("#avisosDOM");
      if (avisosDOM) {
        avisosDOM.innerHTML = `<div class="alert alert-danger" role="alert"> Cantidad no valida </div>`;
      }
    }
  }
});

document.addEventListener("click", (event) => {
  const btn = event.target.closest("#btnEliminarBolsa");
  if (!btn) return;

  const accion = "eliminar";

  const eliminarBolsa = new FormData();
  eliminarBolsa.append("accion", accion);

  fetch("./../php/bolsa.php", {
    method: "POST",
    body: eliminarBolsa,
  })
    .then((res) => res.json())
    .then((datos) => {
      if (datos.estado === "correcto") {
        obtenerBolsa();
      }
    });
});

export function obtenerBolsa() {
  fetch("./../php/bolsa.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((datos) => {
      if (datos.estado == "error") return;
      console.log(datos.bolsa);

      const bolsa = datos.bolsa;

      const numeroDeArticulos = document.querySelector("#badgeBolsa");
      numeroDeArticulos.textContent = bolsa.length;

      const contenedorBolsa = document.querySelector("#contenedorBolsa");
      contenedorBolsa.innerHTML = "";

      for (const cada_producto of bolsa) {
        console.log(cada_producto);
        let precioTotal = 0;
        precioTotal += cada_producto.precio * cada_producto.cantidad;

        contenedorBolsa.innerHTML += `
  <div class="list-group-item border-0 border-bottom d-flex align-items-center gap-3 py-3">
    <img src="${cada_producto.imagen}" alt="${cada_producto.nombre}"
      class="rounded-3 border bg-white p-1 flex-shrink-0"
      style="width: 80px; height: 80px; object-fit: contain;">
    <div class="flex-grow-1" style="min-width: 0;">
      <h6 class="mb-1 fw-semibold text-truncate">${cada_producto.nombre}</h6>
      <p class="mb-2 small text-muted"
        style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        ${cada_producto.descripcion}
      </p>
      <span class="badge text-bg-light border fw-normal">Cantidad: ${cada_producto.cantidad}</span>
      <span class="badge text-bg-light border fw-normal ms-1">Stock: ${cada_producto.stock}</span>
    </div>
    <div class="text-end flex-shrink-0 fw-bold fs-5">${cada_producto.precio * cada_producto.cantidad} €</div>
  </div>
`;
      }
    });
}
