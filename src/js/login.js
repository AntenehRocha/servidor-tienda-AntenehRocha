document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('regForm');

  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('nombreInput').value;
    const password = document.getElementById('contraseñaInput').value;

    console.log('Usuario introducido:', usuario);
    console.log('Contraseña introducida:', password);

    let regData =new FormData();

    regData.append('usuario', usuario);
    regData.append('password', password);

    fetch('./../php/validacion.php', {
      method: 'POST',
      body: regData,
    })
    .then((res) => res.json())
    .then((datos) => {
      if(datos.estado === 'error') {
        const alertContainer = document.querySelector('#alertContainer');
        alertContainer.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
      } else if (datos.estado === 'correcto') {
        const alertContainer = document.querySelector('#alertContainer');
        alertContainer.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
      }
    })
  });

    const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('nombreLogin').value;
    const password = document.getElementById('contraseñaLogin').value;

    console.log('Usuario introducido:', usuario);
    console.log('Contraseña introducida:', password);

    let logData =new FormData();

    logData.append('usuario', usuario);
    logData.append('password', password);

    fetch('./../php/login.php', {
      method: 'POST',
      body: logData,
    })
    .then((res) => res.json())
    .then((datos) => {
      if(datos.estado === 'error') {
        const alertContainerLogin = document.querySelector('#alertContainerLogin');
        alertContainerLogin.innerHTML = `<div class="alert alert-danger" role="alert"> ${datos.mensaje} </div>`;
      } else if (datos.estado === 'correcto') {
        const alertContainerLogin = document.querySelector('#alertContainerLogin');
        alertContainerLogin.innerHTML = `<div class="alert alert-success" role="alert"> ${datos.mensaje} </div>`;
      }
    })
  });
});