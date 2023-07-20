
async function newPostHandler(event) {
    event.preventDefault();

    const textareaElement = document.getElementById('posttitle');
    const title = textareaElement.value;
    const textareaElement1 = document.getElementById('postcontent');
    const content = textareaElement1.value;

    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({
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

/* document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);
 */
document.querySelector('#submit').addEventListener('click', newPostHandler);

