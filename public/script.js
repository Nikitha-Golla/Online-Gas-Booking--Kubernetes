document.addEventListener('DOMContentLoaded', function () {
    // Registration form validation and data submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const address = document.getElementById('address').value;

            if (name && email && phone && password && address) {
                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, phone, password, address })
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.message === 'Registration successful!') {
                        window.location.href = 'homepage.html';
                    }
                })
                .catch(error => console.error('Error:', error));
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Login form validation and data population
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        populateFormFields('loginData', loginForm);
        
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const loginPassword = document.getElementById('loginPassword').value;

            if (username && loginPassword) {
                alert('Login successful!');
                const loginData = { username };
                localStorage.setItem('loginData', JSON.stringify(loginData));
                window.location.href = 'homepage.html'; // Redirect to the home page
            } else {
                alert('Please enter your email and password.');
            }
        });
    }

    // Booking form validation and data population
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        populateFormFields('bookingData', bookingForm);
        
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const gasType = document.getElementById('gasType').value;
            const quantity = document.getElementById('quantity').value;
            const deliveryAddress = document.getElementById('deliveryAddress').value;
            const deliveryDate = document.getElementById('deliveryDate').value;

            if (gasType && quantity && deliveryAddress && deliveryDate) {
                alert('Booking successful!');
                const bookingData = { gasType, quantity, deliveryAddress, deliveryDate };
                saveBooking(bookingData);
                this.reset(); // Clear form
                setTimeout(() => {
                    window.location.href = 'homepage.html'; // Redirect to the home page
                }, 100); // Delay redirection to allow user to see alert
            } else {
                alert('Please fill in all booking details.');
            }
        });
    }

    // Contact form validation and data population
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        populateFormFields('contactData', contactForm);
        
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const contactName = document.getElementById('contactName').value;
            const contactEmail = document.getElementById('contactEmail').value;
            const contactMessage = document.getElementById('contactMessage').value;

            if (contactName && contactEmail && contactMessage) {
                alert('Message sent successfully!');
                const contactData = { contactName, contactEmail, contactMessage };
                localStorage.setItem('contactData', JSON.stringify(contactData));
                window.location.href = 'homepage.html'; // Redirect to the home page
            } else {
                alert('Please fill in all contact details.');
            }
        });
    }
});

function populateFormFields(storageKey, form) {
    const storedData = JSON.parse(localStorage.getItem(storageKey));
    if (storedData) {
        Object.keys(storedData).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = storedData[key];
            }
        });
    }
}
function saveBooking(booking) {
    const bookingsKey = 'recentBookings';
    let bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];
    bookings.unshift(booking); // Add to the beginning of the list
    if (bookings.length > 5) {
        bookings.pop(); // Keep only the latest 5 bookings
    }
    localStorage.setItem(bookingsKey, JSON.stringify(bookings));
}
