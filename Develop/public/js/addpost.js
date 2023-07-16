
async function newPostHandler(event) {
    event.preventDefault();

    const textareaElement = document.getElementById('posttitle');
    const title = textareaElement.value;
    const textareaElement1 = document.getElementById('postcontent');
    const content = textareaElement1.value;

    const response = await fetch(`/savepost`, {
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
        alert(response.statusText);
    }
};

document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);


