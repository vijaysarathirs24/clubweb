function applyTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  applyTheme();
}

function getCurrentUser() {
  const userId = localStorage.getItem('currentUser');
  if (!userId) return null;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.id === userId);
}

function isLoggedIn() {
  return !!localStorage.getItem('currentUser');
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function isAdmin() {
  const user = getCurrentUser();
  return user && user.is_admin;
}