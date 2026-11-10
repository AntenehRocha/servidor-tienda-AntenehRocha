document.addEventListener("DOMContentLoaded", () => {
  fetch("./../php/insertar-productos.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((datos) => {
      const arrayInventario = datos.inventario;

      console.log(arrayInventario);

      const posicionHero = Math.floor(Math.random() * arrayInventario.length);
      const productoHero = arrayInventario[posicionHero];

      let imagenHero = productoHero.imagen;
      let nombreHero = productoHero.nombre;
      let stockHero = productoHero.stock;
      let descripcionHero = productoHero.descripcion;
      let idHero = productoHero._id;

      const verProductoBtn = document.querySelector("#verProductoBtn");

      if (verProductoBtn) {
        verProductoBtn.setAttribute("data-imagen", imagenHero);
        verProductoBtn.setAttribute("data-nombre", nombreHero);
        verProductoBtn.setAttribute("data-stock", stockHero);
        verProductoBtn.setAttribute("data-desc", descripcionHero);
        verProductoBtn.setAttribute("data-id", idHero);

        const productoDestacadoImg = document.querySelector(
          "#productoDestacadoImg",
        );
        productoDestacadoImg.src = imagenHero;
      }

      const catalogoDinamico = document.querySelector("#catalogoDinamico");

      catalogoDinamico.innerHTML = "";
      for (let cada_producto of arrayInventario) {
        catalogoDinamico.innerHTML += `
          <div class="col">
            <article class="card h-100 rounded-3 overflow-hidden producto-card">
              <img src="${cada_producto.imagen}" class="card-img-top bg-light object-fit-contain p-3" alt="${cada_producto.nombre}" style="height: 180px;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title fs-6 fw-semibold">${cada_producto.nombre}</h5>
                <p class="card-text text-muted small">${cada_producto.descripcion}</p>
                <div class="mt-auto">
                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#tablaProducto" data-nombre="${cada_producto.nombre}" data-imagen="${cada_producto.imagen}" data-desc="${cada_producto.descripcion}" data-stock="${cada_producto.stock}" data-id="${cada_producto._id}"> Ver detalles </button>
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
      const stock = document.querySelector("#stockProducto").value;

      console.log("Creando producto:", { nombre, imagen, descripcion });

      let nuevoProducto = new FormData();
      nuevoProducto.append("nombre", nombre);
      nuevoProducto.append("imagen", imagen);
      nuevoProducto.append("descripcion", descripcion);
      nuevoProducto.append("stock", stock);

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
            const catalogoDinamico =
              document.querySelector("#catalogoDinamico");
            catalogoDinamico.innerHTML = "";
            for (let cada_producto of datos.inventario) {
              catalogoDinamico.innerHTML += `
                <div class="col">
                  <article class="card h-100 rounded-3 overflow-hidden producto-card">
                    <img src="${cada_producto.imagen}" class="card-img-top bg-light object-fit-contain p-3" alt="${cada_producto.nombre}" style="height: 180px;">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title fs-6 fw-semibold">${cada_producto.nombre}</h5>
                      <p class="card-text text-muted small">${cada_producto.descripcion}</p>
                      <div class="mt-auto">
                        <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#tablaProducto" data-nombre="${cada_producto.nombre}" data-imagen="${cada_producto.imagen}" data-desc="${cada_producto.descripcion}" data-stock="${cada_producto.stock}" data-id="${cada_producto._id}"> Ver detalles </button>
                      </div>
                    </div>
                  </article>
                </div>
              `;
            }
          } else {
            const avisosDOM = document.querySelector("#avisosDOM");
            avisosDOM.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
            console.warn("Respuesta del servidor:", datos.mensaje);
          }
        });
    });
    const modalProducto = document.getElementById("tablaProducto");

    if (modalProducto) {
      modalProducto.addEventListener("show.bs.modal", (event) => {
        const botonClicado = event.relatedTarget;

        const nombre = botonClicado.getAttribute("data-nombre");
        const imagen = botonClicado.getAttribute("data-imagen");
        const desc = botonClicado.getAttribute("data-desc");
        const stock = botonClicado.getAttribute("data-stock");
        const id = botonClicado.getAttribute("data-id");

        modalProducto.querySelector("#modalProductoTitulo").textContent =
          nombre;
        modalProducto.querySelector("#modalProductoImagen").src = imagen;
        modalProducto.querySelector("#modalProductoDesc").textContent = desc;
        modalProducto.querySelector("#modalProductoStock").textContent = stock;

        const btnAgregar = modalProducto.querySelector("#btnAgregarBolsa");
        if (btnAgregar) {
          btnAgregar.setAttribute("data-id", id);
        }
      });
    }
  }
});
