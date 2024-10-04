document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Clear any previous messages
        messageDiv.textContent = '';

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            password: formData.get('password').trim(),
            address: formData.get('address').trim()
        };

        if (!data.name || !data.email || !data.phone || !data.password || !data.address) {
            messageDiv.textContent = 'Please fill in all required fields.';
            messageDiv.style.color = 'red';
            return;
        }

        if (!validateEmail(data.email)) {
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.style.color = 'red';
            return;
        }

        // Submit form data to the server
        try {
            const response = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                messageDiv.textContent = result.message;
                messageDiv.style.color = 'green';
                form.reset();
                setTimeout(() => {
                    window.location.href = 'homepage.html';
                }, 1000);
            } else {
                messageDiv.textContent = result.message;
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again later.';
            messageDiv.style.color = 'red';
        }
    });

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
