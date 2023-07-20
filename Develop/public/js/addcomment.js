
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
        // Handle the error response
        const responseData = await response.json(); 
        if (responseData && responseData.error) {
            const errorMessage = responseData.error;
            // Display the error message on the page
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.textContent = errorMessage;
        } else {
            // If no specific error message is available, display a generic message
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.textContent = 'An error occurred while submitting the comment.';
        }
    }
};

/* document.querySelector('#new-comment-form').addEventListener('submit', newCommentHandler); */
document.querySelector('#submit').addEventListener('click', newCommentHandler);

 