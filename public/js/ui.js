const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token && user) {
  document.getElementByidUser('not-logged').style.display = 'none';
  document.getElementByidUser('logged').style.display = 'block';
  document.getElementByidUser('welcome').innerText =
    `Bienvenido ${user.username} (${user.role})`;

  if (user.role === 'astro') {
    document.getElementByidUser('astro-options').style.display = 'block';
  }

  if (user.role === 'admin') {
    document.getElementByidUser('astro-options').style.display = 'block';
    document.getElementByidUser('admin-options').style.display = 'block';
  }
}
