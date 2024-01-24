document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Send data to the server
    const response = await fetch('/api/users/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    });

    // Parse the response
    const data = await response.json();

    // Display response message to the user
    document.getElementById('responseMessage').textContent = data.msg || data.error;
});
