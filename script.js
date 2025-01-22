document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
});

async function fetchUsers() {
  const response = await fetch('https://your-backend-api.com/users'); // Fetch all users from your backend
  const users = await response.json();

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const verifiedUsers = users.filter(user => user.isVerified === true).length;

  document.getElementById('total-users').textContent = totalUsers;
  document.getElementById('active-users').textContent = activeUsers;
  document.getElementById('verified-users').textContent = verifiedUsers;

  const tableBody = document.getElementById('users-table-body');
  tableBody.innerHTML = ''; // Clear existing rows

  users.forEach(user => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.status}</td>
      <td>
        <button onclick="viewUserDetails('${user.id}')">View</button>
        <button onclick="editUser('${user.id}')">Edit</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

function viewUserDetails(userId) {
  window.location.href = `/user-details.html?id=${userId}`;
}

function editUser(userId) {
  window.location.href = `/edit-user.html?id=${userId}`;
}

function deleteUser(userId) {
  fetch(`https://your-backend-api.com/users/${userId}`, {
    method: 'DELETE',
  }).then(() => {
    fetchUsers();
  });
}

function searchUsers() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const rows = document.querySelectorAll('#users-table-body tr');
  
  rows.forEach(row => {
    const username = row.cells[0].textContent.toLowerCase();
    row.style.display = username.includes(query) ? '' : 'none';
  });
}
