document.addEventListener("DOMContentLoaded", () => {
  const ProductoForm = document.querySelector("#ProductoForm");

  if (ProductoForm) {
    ProductoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.querySelector("#nombreProducto").value;
      const imagen = document.querySelector("#ImagenProducto").value;
      const descripcion = document.querySelector("#DescripcionProducto").value;

      console.log("Creando producto:", { nombre, imagen, descripcion });
    });
  }
});
