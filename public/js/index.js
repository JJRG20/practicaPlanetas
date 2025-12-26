const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const publicDiv = document.getElementByidUser('public');
const privateDiv = document.getElementByidUser('private');

if (token && user) {
  publicDiv.style.display = 'none';
  privateDiv.style.display = 'block';

  document.getElementByidUser('username').textContent = user.username;

  if (user.role === 'admin') {
    document.getElementByidUser('admin-options').style.display = 'block';
    document.getElementByidUser('client-options').style.display = 'block';
  } else {
    document.getElementByidUser('admin-options').style.display = 'none';
    document.getElementByidUser('client-options').style.display = 'block';
  }
}

document.getElementByidUser('logout')?.addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
});
