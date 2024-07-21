var typed = new Typed('.typing', {
    strings: ["Software Engineering" ],
    typeSpeed: 110,
    BackSpeed: 60,
    loop: true
})

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href').substring(1) === entry.target.id) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

function sendEmail(event) {
    event.preventDefault();

    var fromName    = document.getElementById('name').value;
    var fromEmail   = document.getElementById('email').value;
    var fromPhone   = document.getElementById('phone').value;
    var subject     = document.getElementById('subject').value;
    var message     = document.getElementById('message').value;

    // Email validation regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone validation regex (example for US phone numbers)
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // Validate email format
    if (!emailRegex.test(fromEmail)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate phone number format
    if (!phoneRegex.test(fromPhone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    var templateParams = {
        from_name: fromName,
        from_email: fromEmail,
        from_phone: fromPhone,
        subject: subject,
        message: message
    };
    
    emailjs.send('service_fjxk4lq', 'template_ucz55hq', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Email sent successfully!', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Failed to send email.', 'error');
        });
}

function showNotification(message, type) {
    var notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    notification.style.display = 'block';

    setTimeout(function() {
        notification.style.display = 'none';
    }, 5000);
}