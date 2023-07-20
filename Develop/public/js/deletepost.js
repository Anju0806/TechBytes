document.querySelectorAll('#delete-post').forEach(element => {
    element.addEventListener('click', async (event) => {
      event.preventDefault();
      const postId = event.target.dataset.id;
    
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          console.log('Post deleted successfully');
          document.location.replace('/dashboard');
        } else {
          console.error('Failed to delete post:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred during deletion:', error);
      }
    });
  });
  