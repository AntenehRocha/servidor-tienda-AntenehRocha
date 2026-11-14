document.addEventListener("DOMContentLoaded", () => {
  const editarPerfilForm = document.getElementById("contenedorEditarPerfil");
  const perfilUsuarioInput = document.getElementById("perfilUsuario");
  const perfilContraseñaInput = document.getElementById("perfilContraseña");

  editarPerfilForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = perfilUsuarioInput.value;
    const contraseña = perfilContraseñaInput.value;

    let perfilData = new FormData();
    perfilData.append("usuario", usuario);
    perfilData.append("contraseña", contraseña);

    fetch("./../php/editar-usuarios.php", {
      method: "POST",
      body: perfilData,
    })
      .then((res) => res.json())
      .then((datos) => {
        if (datos.estado === "error") {
          const avisosEditarPerfil = document.querySelector(
            "#avisosEditarPerfil",
          );
          avisosEditarPerfil.innerHTML = `<div class="alert alert-danger text-center" role="alert"> ${datos.mensaje} </div>`;
        } else if (datos.estado === "correcto") {
          const avisosEditarPerfil = document.querySelector(
            "#avisosEditarPerfil",
          );
          avisosEditarPerfil.innerHTML = `<div class="alert alert-success text-center" role="alert"> ${datos.mensaje} </div>`;
          window.location.reload(); 
        }
      });
  });
});
