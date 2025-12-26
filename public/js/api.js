function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

async function getplaneta() {
  const res = await fetch('http://localhost:3000/api/planeta', {
    headers: authHeaders()
  });
  return res.json();
}
