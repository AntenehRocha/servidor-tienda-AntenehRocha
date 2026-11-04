document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('nombreInput').value;
    const password = document.getElementById('contraseñaInput').value;

    console.log('Usuario introducido:', usuario);
    console.log('Contraseña introducida:', password);

    let loginData =new FormData();

    loginData.append('usuario', usuario);
    loginData.append('password', password);

    fetch('./../php/validacion.php', {
      method: 'POST',
      body: loginData,
    })
    .then((res) => res.json())
    .then((mensaje) => {
      if(mensaje) {
        const alertContainer = document.querySelector('#alertContainer');
        alertContainer.innerHTML = `<div class="alert alert-danger" role="alert"> ${mensaje} </div>`;
      }
    })
  });
});