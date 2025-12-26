const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token && user) {
  document.getElementById('not-logged').style.display = 'none';
  document.getElementById('logged').style.display = 'block';
  document.getElementById('welcome').innerText =
    `Bienvenido ${user.username}`;

  if (user.role === 'astro') {
    document.getElementById('astro-options').style.display = 'block';
  }

  if (user.role === 'admin') {
    document.getElementById('admin-options').style.display = 'block';
  }
}
