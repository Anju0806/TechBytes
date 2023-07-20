
async function editPostHandler(event) {
    event.preventDefault();
    const post_id = document.querySelector('input[name="post_id"]').value;
    const textareaElement = document.getElementById('posttitle');
    const title = textareaElement.value;
    const textareaElement1 = document.getElementById('postcontent');
    const content = textareaElement1.value;

    const response = await fetch(`/api/posts/`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id:post_id,
            title:title,
            content:content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);


