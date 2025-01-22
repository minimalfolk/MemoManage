document.addEventListener('DOMContentLoaded', () => {
  const userId = new URLSearchParams(window.location.search).get('id');
  fetchUserDetails(userId);
});

async function fetchUserDetails(userId) {
  const response = await fetch(`https://your-backend-api.com/users/${userId}`);
  const user = await response.json();

  const userInfo = document.getElementById('user-info');
  userInfo.innerHTML = `
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone || 'Not Available'}</p>
    <p><strong>Status:</strong> ${user.status}</p>
    <p><strong>Number of Memories:</strong> ${user.memories.length}</p>
  `;
}

function editUser() {
  const userId = new URLSearchParams(window.location.search).get('id');
  window.location.href = `/edit-user.html?id=${userId}`;
}

function deleteUser() {
  const userId = new URLSearchParams(window.location.search).get('id');
  fetch(`https://your-backend-api.com/users/${userId}`, {
    method: 'DELETE',
  }).then(() => {
    window.location.href = '/';
  });
}
