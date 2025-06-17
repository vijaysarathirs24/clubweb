function loadProfile() {
  const user = getCurrentUser();
  if (user) {
    document.getElementById('name').value = user.name || '';
    document.getElementById('bio').value = user.bio || '';
    document.getElementById('institution').value = user.institution || '';
    document.getElementById('major').value = user.major || '';
    document.getElementById('graduation-year').value = user.graduation_year || '';
  }
}

function updateProfile() {
  const user = getCurrentUser();
  if (!user) return;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUser = {
    ...user,
    name: document.getElementById('name').value,
    bio: document.getElementById('bio').value,
    institution: document.getElementById('institution').value,
    major: document.getElementById('major').value,
    graduation_year: document.getElementById('graduation-year').value
  };
  const userIndex = users.findIndex(u => u.id === user.id);
  users[userIndex] = updatedUser;
  localStorage.setItem('users', JSON.stringify(users));
  alert('Profile updated');
}