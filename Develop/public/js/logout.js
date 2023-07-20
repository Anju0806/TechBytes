
async function Logouthandler(event) {
    event.preventDefault();

    const response = await fetch(`/api/users/logout`, {
        method: 'POST',
        body: JSON.stringify({  
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/`);
    } else {
        console.log(response);
        alert(response.statusText);
    }
};

document.querySelector('#logout-btn').addEventListener('click', Logouthandler);


