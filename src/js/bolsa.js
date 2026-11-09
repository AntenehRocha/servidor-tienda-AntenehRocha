document.addEventListener("click", (event) => {
  const btn = event.target.closest("#btnAgregarBolsa");
  if (!btn) return;
  const productoId = btn.getAttribute("data-id");
  console.warn(productoId);

  const IdProductoBolsa = new FormData();

  IdProductoBolsa.append("id", productoId);

  fetch("./../php/bolsa.php", {
    method: "POST",
    body: IdProductoBolsa,
  })
    .then((res) => res.json())
    .then((datos) => {
      console.warn(datos.mensaje);
      if (datos.estado === "correcto") {
        const avisosDOM = document.querySelector("#avisosDOM");
        if (avisosDOM) {
          avisosDOM.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
        }
      } else {
        const avisosDOM = document.querySelector("#avisosDOM");
        avisosDOM.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
        console.warn("Respuesta del servidor:", datos.mensaje);
      }
    });
});

const botonBolsa = document.querySelector("#botonBolsa");
if (botonBolsa) {
  botonBolsa.addEventListener("click", () => {
    fetch("./../php/bolsa.php", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos.bolsa);

        const bolsa = datos.bolsa;

        const numeroDeArticulos = document.querySelector("#badgeBolsa");
        numeroDeArticulos.textContent = bolsa.length;

        const contenedorBolsa = document.querySelector("#contenedorBolsa");
        contenedorBolsa.innerHTML = "";

        for (const cada_producto of bolsa) {
          contenedorBolsa.innerHTML += `
          <div class="list-group-item d-flex align-items-center gap-3 py-3">
    <img src="${cada_producto.imagen}" alt="${cada_producto.nombre}" class="rounded border bg-white p-1 flex-shrink-0"
      style="width: 72px; height: 72px; object-fit: contain;">
    <div class="flex-grow-1" style="min-width: 0;">
      <h6 class="mb-1 fw-bold">${cada_producto.nombre}</h6>
      <p class="mb-0 small text-muted"
        style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        ${cada_producto.descripcion}
      </p>
    </div>
    <span class="badge bg-primary fs-6 fw-normal">Stock: <strong id="modalProductoStock"> ${cada_producto.stock}
      </strong></span>
  </div>
          `;
        }
      });
  });
}