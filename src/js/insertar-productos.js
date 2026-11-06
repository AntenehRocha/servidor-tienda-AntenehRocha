document.addEventListener("DOMContentLoaded", () => {
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
        })
    });
  }
});