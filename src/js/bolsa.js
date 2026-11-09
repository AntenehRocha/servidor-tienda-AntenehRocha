document.addEventListener("click", (event) => {
  const btn = event.target.closest("#btnAgregarBolsa");
  if (!btn) return;
  const productoId = btn.getAttribute("data-id");
  console.log("productoId:", productoId);

  const IdProductoBolsa = new FormData();

  IdProductoBolsa.append("id", productoId);

  fetch("./../php/bolsa.php", {
    method: "POST",
    body: IdProductoBolsa,
  })
    .then((res) => res.json())
    .then((datos) => {
      console.log(datos.mensaje);
      
    });
});
