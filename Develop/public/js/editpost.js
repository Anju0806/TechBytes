
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

/* document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);
 */
document.querySelector('#submit').addEventListener('click', editPostHandler);


