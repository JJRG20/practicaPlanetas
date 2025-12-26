const API_URL = 'http://localhost:3000/api';

// LOGIN
async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const data = await response.json();

  // Guardar sesión
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// FORM LOGIN
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      await login(username, password);
      window.location.href = 'index.html';
    } catch (err) {
      document.getElementById('error').innerText = err.message;
    }
  });
});
