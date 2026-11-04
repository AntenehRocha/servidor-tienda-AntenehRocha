document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('nombreInput').value;
    const password = document.getElementById('contraseñaInput').value;

    console.log('Usuario introducido:', usuario);
    console.log('Contraseña introducida:', password);
  });
});