const form = document.getElementByidUser('loginForm');
const errorP = document.getElementByidUser('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementByidUser('username').value;
  const password = document.getElementByidUser('password').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      throw new Error('Credenciales incorrectas');
    }

    const data = await res.json();

    // Guardar token
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    window.location.href = 'index.html';

  } catch (err) {
    errorP.textContent = err.message;
  }
});
