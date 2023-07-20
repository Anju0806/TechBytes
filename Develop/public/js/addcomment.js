
async function newCommentHandler(event) {
    event.preventDefault();
    const post_id = document.querySelector('input[name="post_id"]').value;
    const textareaElement1 = document.getElementById('commenttext');
    const content = textareaElement1.value;

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            post_id:post_id,
            content:content,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/post/${post_id}`);
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler);


