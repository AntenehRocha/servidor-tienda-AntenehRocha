document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("regForm");
  const loginForm = document.getElementById("loginForm");
  const cerrarSesionBoton = document.querySelector("#cerrarSesionBoton");
  const botonRegistroLogin = document.querySelector("#botonRegistroLogin");
  const avisosDOM = document.querySelector("#avisosDOM");
  const bienvenidaHeader = document.querySelector("#bienvenidaHeader");
  const tipoUsuarioHeader = document.querySelector("#tipoUsuario");
  const panelAdminBoton = document.querySelector("#mostrarPanelAdmin");
  const botonBolsa = document.querySelector("#botonBolsa");

  fetch("./../php/comprobar_sesion.php")
    .then((res) => res.json())
    .then((datos) => {
      if (datos.logueado) {
        cerrarSesionBoton.classList.remove("d-none");
        botonRegistroLogin.classList.add("d-none");
        botonBolsa.classList.remove("d-none");

        let adminMensaje = "";

        if (datos.admin) {
          adminMensaje = "Administrador";
          panelAdminBoton.classList.remove("d-none");
        } else {
          adminMensaje = "Comprador";
        }

        tipoUsuarioHeader.innerHTML = `
          <div class="d-flex align-items-center bg-body-tertiary border rounded-3 px-3 py-1 me-2 shadow-sm">
            <span class="small text-muted me-1">Rol:</span>
            <strong class="text-dark fw-bold">${adminMensaje}</strong>
          </div>`;

        bienvenidaHeader.innerHTML = `
          <div class="d-flex align-items-center bg-body-tertiary border rounded-3 px-3 py-1 me-2 shadow-sm">
            <span class="small text-muted me-1">Usuario:</span>
            <strong class="text-dark fw-bold">${datos.usuario}</strong>
          </div>`;
      }
    });

  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("nombreInput").value;
    const password = document.getElementById("contraseñaInput").value;

    let regData = new FormData();
    regData.append("usuario", usuario);
    regData.append("password", password);

    fetch("./../php/validacion.php", {
      method: "POST",
      body: regData,
    })
      .then((res) => res.json())
      .then((datos) => {
        if (datos.estado === "error") {
          const alertContainer = document.querySelector("#alertContainer");
          alertContainer.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
        } else if (datos.estado === "correcto") {
          const alertContainer = document.querySelector("#alertContainer");
          alertContainer.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
        }
      });
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("nombreLogin").value;
    const password = document.getElementById("contraseñaLogin").value;

    let logData = new FormData();
    logData.append("usuario", usuario);
    logData.append("password", password);

    fetch("./../php/login.php", {
      method: "POST",
      body: logData,
    })
      .then((res) => res.json())
      .then((datos) => {
        if (datos.estado === "error") {
          const alertContainerLogin = document.querySelector(
            "#alertContainerLogin",
          );
          alertContainerLogin.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
        } else if (datos.estado === "correcto") {
          const alertContainerLogin = document.querySelector(
            "#alertContainerLogin",
          );
          alertContainerLogin.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;

          const modalElement = document.getElementById("loginModal");
          const InstanciaModal = bootstrap.Modal.getInstance(modalElement);
          InstanciaModal.hide();

          cerrarSesionBoton.classList.remove("d-none");
          botonRegistroLogin.classList.add("d-none");
          botonBolsa.classList.remove("d-none");

          let adminMensaje = "";

          if (datos.admin) {
            adminMensaje = "Administrador";
            panelAdminBoton.classList.remove("d-none");
          } else {
            adminMensaje = "Comprador";
          }

          tipoUsuarioHeader.innerHTML = `
          <div class="d-flex align-items-center bg-body-tertiary border rounded-3 px-3 py-1 me-2 shadow-sm">
            <span class="small text-muted me-1">Rol:</span>
            <strong class="text-dark fw-bold">${adminMensaje}</strong>
          </div>`;

          bienvenidaHeader.innerHTML = `
                <div class="d-flex align-items-center bg-body-tertiary border rounded-3 px-3 py-1 me-2 shadow-sm">
                <span class="small text-muted me-1">Usuario:</span>
                <strong class="text-dark fw-bold">${datos.usuario}</strong>
                </div>`;
        }
      });
  });

  cerrarSesionBoton.addEventListener("click", () => {
    fetch("./../php/logout.php", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((datos) => {
        if (datos.estado === "correcto") {
          cerrarSesionBoton.classList.add("d-none");
          botonRegistroLogin.classList.remove("d-none");
          avisosDOM.innerHTML = `<div class="alert alert-warning" role="alert"> <p class= "mb-0"> Has cerrado sesion correctamente </p> </div>`;
          bienvenidaHeader.innerHTML = "";
          tipoUsuarioHeader.innerHTML = "";
          avisosDOM.classList.remove("d-none");
          botonBolsa.classList.add("d-none");
          panelAdminBoton.classList.add("d-none");
          location.reload();
        }
      });
  });
});
