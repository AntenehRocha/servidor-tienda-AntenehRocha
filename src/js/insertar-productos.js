document.addEventListener("DOMContentLoaded", () => {
  fetch("./../php/insertar-productos.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((datos) => {
      const arrayInventario = datos.inventario;
      const catalogoDinamico = document.querySelector("#catalogoDinamico");

      catalogoDinamico.innerHTML = "";
      for (let cada_producto of arrayInventario) {
        catalogoDinamico.innerHTML += `
          <div class="col">
            <article class="card h-100 shadow-sm border-0">
              <img src="${cada_producto.imagen}" class="card-img-top p-3" alt="${cada_producto.nombre}" style="height: 200px; object-fit: contain;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold">${cada_producto.nombre}</h5>
                <p class="card-text text-muted small">${cada_producto.descripcion}</p>
                <div class="mt-auto">
                  <button class="btn btn-outline-primary w-100 fw-semibold" data-id="${cada_producto._id}">
                    Ver detalles
                  </button>
                </div>
              </div>
            </article>
          </div>
        `;
      }
    });
  const ProductoForm = document.querySelector("#ProductoForm");

  if (ProductoForm) {
    ProductoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.querySelector("#nombreProducto").value;
      const imagen = document.querySelector("#ImagenProducto").value;
      const descripcion = document.querySelector("#DescripcionProducto").value;

      console.log("Creando producto:", { nombre, imagen, descripcion });

      let nuevoProducto = new FormData();
      nuevoProducto.append("nombre", nombre);
      nuevoProducto.append("imagen", imagen);
      nuevoProducto.append("descripcion", descripcion);

      fetch("./../php/insertar-productos.php", {
        method: "POST",
        body: nuevoProducto,
      })
        .then((res) => res.json())
        .then((datos) => {
          if (datos.estado === "correcto") {
            const avisosDOM = document.querySelector("#avisosDOM");
            if (avisosDOM) {
              avisosDOM.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
            }
            ProductoForm.reset();
          } else {
            const avisosDOM = document.querySelector("#avisosDOM");
            avisosDOM.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
            console.warn("Respuesta del servidor:", datos.mensaje);
          }
        });
    });
  }
});
