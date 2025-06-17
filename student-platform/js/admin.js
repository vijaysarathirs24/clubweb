function loadAdminData() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
  const messages = JSON.parse(localStorage.getItem('messages')) || [];

  // Users Table
  const usersTable = document.getElementById('users-table');
  usersTable.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="border p-2">${user.email}</td>
      <td class="border p-2">${user.name}</td>
      <td class="border p-2">${user.status}</td>
      <td class="border p-2">
        <button onclick="updateUserStatus('${user.id}', 'active')" class="bg-blue-600 text-white p-1 rounded">Activate</button>
        <button onclick="updateUserStatus('${user.id}', 'suspended')" class="bg-red-500 text-white p-1 rounded ml-2">Suspend</button>
      </td>
    `;
    usersTable.appendChild(tr);
  });

  // Uploads Table
  const uploadsTable = document.getElementById('uploads-table');
  uploadsTable.innerHTML = '';
  uploads.forEach(upload => {
    const user = users.find(u => u.id === upload.user_id);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="border p-2">${user.name}</td>
      <td class="border p-2">${upload.file_type === 'video' ? 'Video' : upload.file_type === 'pdf' ? 'PDF' : 'Image'}</td>
      <td class="border p-2">${upload.caption}</td>
      <td class="border p-2">${upload.status}</td>
      <td class="border p-2">
        <button onclick="updateUploadStatus('${upload.id}', 'approved')" class="bg-blue-600 text-white p-1 rounded">Approve</button>
        <button onclick="updateUploadStatus('${upload.id}', 'rejected')" class="bg-red-500 text-white p-1 rounded ml-2">Reject</button>
      </td>
    `;
    uploadsTable.appendChild(tr);
  });

  // Messages Table
  const messagesTable = document.getElementById('messages-table');
  messagesTable.innerHTML = '';
  messages.forEach(msg => {
    const sender = users.find(u => u.id === msg.sender_id);
    const receiver = users.find(u => u.id === msg.receiver_id);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="border p-2">${sender.name}</td>
      <td class="border p-2">${receiver.name}</td>
      <td class="border p-2">${msg.content}</td>
      <td class="border p-2">
        <button onclick="deleteMessage('${msg.id}')" class="bg-red-500 text-white p-1 rounded">Delete</button>
      </td>
    `;
    messagesTable.appendChild(tr);
  });
}

function updateUserStatus(userId, status) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.id === userId);
  users[userIndex].status = status;
  localStorage.setItem('users', JSON.stringify(users));
  loadAdminData();
}

function updateUploadStatus(uploadId, status) {
  const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
  const uploadIndex = uploads.findIndex(u => u.id === uploadId);
  uploads[uploadIndex].status = status;
  localStorage.setItem('uploads', JSON.stringify(uploads));
  loadAdminData();
}

function deleteMessage(messageId) {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const updatedMessages = messages.filter(msg => msg.id !== messageId);
  localStorage.setItem('messages', JSON.stringify(updatedMessages));
  loadAdminData();
}