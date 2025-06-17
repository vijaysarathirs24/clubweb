function loadFeed() {
  const user = getCurrentUser();
  const follows = JSON.parse(localStorage.getItem('follows')) || [];
  const uploads = JSON.parse(localStorage.getItem('uploads')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const likes = JSON.parse(localStorage.getItem('likes')) || [];

  const followedUserIds = follows.filter(f => f.follower_id === user.id).map(f => f.followee_id);
  const feedPosts = uploads.filter(upload => followedUserIds.includes(upload.user_id) && upload.status === 'approved');

  const feedDiv = document.getElementById('feed');
  feedDiv.innerHTML = '';
  feedPosts.forEach(post => {
    const postUser = users.find(u => u.id === post.user_id);
    const postLikes = likes.filter(like => like.upload_id === post.id);
    const userLiked = postLikes.some(like => like.user_id === user.id);
    const postComments = comments.filter(comment => comment.upload_id === post.id);
    const div = document.createElement('div');
    div.className = 'post bg-white p-4 rounded-lg shadow-md';
    div.innerHTML = `
      <p class="font-semibold">${postUser.name}</p>
      ${post.file_type === 'video' ? `<video src="${post.file_data}" controls></video>` : post.file_type === 'pdf' ? `<a href="${post.file_data}" target="_blank">View PDF</a>` : `<img src="${post.file_data}" alt="Post">`}
      <p class="mt-2">${post.caption}</p>
      <div class="mt-2">
        <button onclick="${userLiked ? `unlikePost('${post.id}')` : `likePost('${post.id}')`}" class="text-blue-600 mr-2">${userLiked ? 'Unlike' : 'Like'} (${postLikes.length})</button>
        <button onclick="toggleComments('${post.id}')" class="text-blue-600">Comments (${postComments.length})</button>
      </div>
      <div id="comments-${post.id}" class="hidden mt-2">
        <div class="space-y-2">
          ${postComments.map(c => `<p><strong>${users.find(u => u.id === c.user_id).name}:</strong> ${c.content}</p>`).join('')}
        </div>
        <form onsubmit="addComment(event, '${post.id}')">
          <input type="text" name="comment-input" placeholder="Add a comment..." class="w-full p-2 border rounded">
          <button type="submit" class="bg-blue-600 text-white p-2 rounded mt-1">Comment</button>
        </form>
      </div>
    `;
    feedDiv.appendChild(div);
  });
}

function likePost(uploadId) {
  const user = getCurrentUser();
  const likes = JSON.parse(localStorage.getItem('likes')) || [];
  likes.push({ user_id: user.id, upload_id: uploadId });
  localStorage.setItem('likes', JSON.stringify(likes));
  loadFeed();
}

function unlikePost(uploadId) {
  const user = getCurrentUser();
  const likes = JSON.parse(localStorage.getItem('likes')) || [];
  const updatedLikes = likes.filter(like => !(like.user_id === user.id && like.upload_id === uploadId));
  localStorage.setItem('likes', JSON.stringify(updatedLikes));
  loadFeed();
}

function toggleComments(uploadId) {
  const commentsDiv = document.getElementById(`comments-${uploadId}`);
  commentsDiv.classList.toggle('hidden');
}

function addComment(event, uploadId) {
  event.preventDefault();
  const user = getCurrentUser();
  const content = event.target.querySelector('input[name="comment-input"]').value;
  if (!content) return;
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({
    id: Date.now().toString(),
    user_id: user.id,
    upload_id: uploadId,
    content,
    created_at: new Date().toISOString()
  });
  localStorage.setItem('comments', JSON.stringify(comments));
  event.target.reset();
  loadFeed();
}