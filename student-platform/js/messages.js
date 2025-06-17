let currentReceiverId = null;

function loadConversations() {
  const user = getCurrentUser();
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const conversationUsers = new Set();

  messages.forEach(msg => {
    if (msg.sender_id === user.id) {
      conversationUsers.add(msg.receiver_id);
    } else if (msg.receiver_id === user.id) {
      conversationUsers.add(msg.sender_id);
    }
  });

  const conversationList = document.getElementById('conversation-list');
  conversationList.innerHTML = '';
  conversationUsers.forEach(userId => {
    const otherUser = users.find(u => u.id === userId);
    if (otherUser) {
      const li = document.createElement('li');
      li.className = 'p-2 hover:bg-gray-200 cursor-pointer';
      li.textContent = otherUser.name;
      li.onclick = () => loadChat(userId, otherUser.name);
      conversationList.appendChild(li);
    }
  });
}

function loadChat(receiverId, receiverName) {
  currentReceiverId = receiverId;
  document.getElementById('chat-title').textContent = `Chat with ${receiverName}`;
  const user = getCurrentUser();
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const chatMessages = messages.filter(
    msg => (msg.sender_id === user.id && msg.receiver_id === receiverId) || 
           (msg.sender_id === receiverId && msg.receiver_id === user.id)
  );
  const chatDiv = document.getElementById('chat-messages');
  chatDiv.innerHTML = '';
  chatMessages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.sender_id === user.id ? 'sent' : 'received'}`;
    div.textContent = msg.content;
    chatDiv.appendChild(div);
  });
  chatDiv.scrollTop = chatDiv.scrollHeight;

  // Simulate real-time updates
  setInterval(() => {
    loadChat(receiverId, receiverName);
  }, 3000);
}

function sendMessage() {
  if (!currentReceiverId) {
    alert('Select a conversation');
    return;
  }
  const user = getCurrentUser();
  const content = document.getElementById('message-input').value;
  if (!content) return;

  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const message = {
    id: Date.now().toString(),
    sender_id: user.id,
    receiver_id: currentReceiverId,
    content,
    created_at: new Date().toISOString(),
    read: false,
    flagged: false
  };
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));
  document.getElementById('message-input').value = '';
  loadChat(currentReceiverId, document.getElementById('chat-title').textContent.split(' ')[2]);
}