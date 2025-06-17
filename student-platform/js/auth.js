function initializeUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (!users.find(user => user.email === 'admin@example.com')) {
    users.push({
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin',
      bio: 'Administrator',
      institution: '',
      major: '',
      graduation_year: '',
      is_admin: true,
      status: 'active'
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
}

function signup(email, password, name) {
  initializeUsers();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(user => user.email === email)) {
    return false;
  }
  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    name,
    bio: '',
    institution: '',
    major: '',
    graduation_year: '',
    is_admin: false,
    status: 'active'
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', newUser.id);
  return true;
}

function login(email, password) {
  initializeUsers();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);
  if (user && user.status === 'active') {
    localStorage.setItem('currentUser', user.id);
    return true;
  }
  return false;
}