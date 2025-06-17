function handleUpload() {
  const fileInput = document.getElementById('file');
  const caption = document.getElementById('caption').value;
  const user = getCurrentUser();
  if (!fileInput.files[0]) {
    alert('Please select a file');
    return;
  }

  const file = fileInput.files[0];
  const fileType = file.type.split('/')[0] === 'video' ? 'video' : file.type.split('/')[1];
  const maxSize = fileType === 'pdf' ? 5 * 1024 * 1024 : fileType === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('File too large');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
    const upload = {
      id: Date.now().toString(),
      user_id: user.id,
      file_data: e.target.result,
      file_type: fileType,
      caption,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    uploads.push(upload);
    localStorage.setItem('uploads', JSON.stringify(uploads));
    loadUploads();
    document.getElementById('upload-form').reset();
  };
  reader.readAsDataURL(file);
}

function loadUploads() {
  const user = getCurrentUser();
  const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
  const userUploads = uploads.filter(upload => upload.user_id === user.id);
  const uploadsDiv = document.getElementById('uploads');
  uploadsDiv.innerHTML = '';
  userUploads.forEach(upload => {
    const div = document.createElement('div');
    div.className = 'upload-item bg-white p-4 rounded-lg shadow-md flex justify-between items-center';
    div.innerHTML = `
      <div>
        ${upload.file_type === 'video' ? `<video src="${upload.file_data}" controls></video>` : upload.file_type === 'pdf' ? `<a href="${upload.file_data}" target="_blank">View PDF</a>` : `<img src="${upload.file_data}" alt="Upload">`}
        <p class="mt-2">${upload.caption}</p>
      </div>
      <button onclick="deleteUpload('${upload.id}')" class="bg-red-500 text-white p-2 rounded hover:bg-red-600">Delete</button>
    `;
    uploadsDiv.appendChild(div);
  });
}

function deleteUpload(uploadId) {
  const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
  const updatedUploads = uploads.filter(upload => upload.id !== uploadId);
  localStorage.setItem('uploads', JSON.stringify(updatedUploads));
  loadUploads();
}