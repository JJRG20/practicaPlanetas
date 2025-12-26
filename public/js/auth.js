const API_URL = 'http://localhost:3000/api';

async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) throw new Error('Credenciales inválidas');

  const data = await res.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// Login form
const form = document.getElementByidUser('loginForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      await login(
        document.getElementByidUser('username').value,
        document.getElementByidUser('password').value
      );
      window.location.href = 'index.html';
    } catch (err) {
      document.getElementByidUser('error').innerText = err.message;
    }
  });
}
