document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("regForm");

  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("nombreInput").value;
    const password = document.getElementById("contraseñaInput").value;

    console.log("Usuario introducido:", usuario);
    console.log("Contraseña introducida:", password);

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

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("nombreLogin").value;
    const password = document.getElementById("contraseñaLogin").value;

    console.log("Usuario introducido:", usuario);
    console.log("Contraseña introducida:", password);

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

          const cerrarSesionBoton =
            document.querySelector("#cerrarSesionBoton");
          const botonRegistroLogin = document.querySelector(
            "#botonRegistroLogin",
          );
          const bienvenidaHeader = document.querySelector("#bienvenidaHeader");

          cerrarSesionBoton.classList.remove("d-none");
          botonRegistroLogin.classList.add("d-none");

          bienvenidaHeader.innerHTML = `
                <div class="d-flex align-items-center bg-body-tertiary border rounded-3 px-3 py-1 me-2 shadow-sm">
                <span class="small text-muted me-1">Usuario:</span>
                <strong class="text-dark fw-bold">${datos.usuario}</strong>
                </div>`;
        }
      });
  });
  const cerrarSesionBoton = document.querySelector("#cerrarSesionBoton");
  const botonRegistroLogin = document.querySelector("#botonRegistroLogin");
  const avisosDOM = document.querySelector("#avisosDOM");
  const bienvenidaHeader = document.querySelector("#bienvenidaHeader");

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
          avisosDOM.classList.remove("d-none");
        }
      });
  });
});
