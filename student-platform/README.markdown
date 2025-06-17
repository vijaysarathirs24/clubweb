# Student Platform

A client-side web application for students to network and share content, built for hosting on GitHub Pages.

## Features
- Authentication (signup/login)
- Profile management
- File uploads (simulated with base64 data)
- Messaging
- Social interactions (follow, like, comment)
- Theme toggle (dark/light mode)
- Admin dashboard

## Hosting on GitHub Pages
1. Create a GitHub repository (e.g., `student-platform`).
2. Add all files to the repository.
3. Enable GitHub Pages in the repository settings:
   - Set the source to the `main` branch.
   - Set the folder to `/ (root)`.
4. Access the site at `https://your-username.github.io/student-platform`.

## Default Admin Account
- Email: `admin@example.com`
- Password: `admin123`

## Notes
- This is a client-side application using `localStorage` for data persistence.
- File uploads are simulated by storing base64 data in `localStorage`.
- Passwords are stored in plain text for demo purposes—do not use this in production with real user data.