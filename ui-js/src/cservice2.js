// Accordion toggle functionality with animation
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordion = header.parentElement;
        const content = accordion.querySelector('.accordion-content');

        if (accordion.classList.contains('active')) {
            content.style.maxHeight = null;  
            accordion.classList.remove('active');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';  
            accordion.classList.add('active');

            document.querySelectorAll('.accordion').forEach(otherAccordion => {
                if (otherAccordion !== accordion) {
                    const otherContent = otherAccordion.querySelector('.accordion-content');
                    otherAccordion.classList.remove('active');
                    otherContent.style.maxHeight = null;
                }
            });
        }
    });
});

function funct1(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
}

function funct2(formId) {
    document.getElementById('choose').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
}

function funct3(formId) {
    document.getElementById('choose').style.display = 'block';
    document.getElementById(formId).style.display = 'none';
}

fetch('/getUserType')
    .then(response => response.json())
    .then(data => {
        const userType = data.usertype;

        let userRedirects = {
            'Superuser': '/superuser',
            'Teller': '/user',
            'Administrator': '/admin',
            'Invites': '/invite',
            'Costumer Service': '/cservice',
            'Accountant': '/accountant',
            'Operational': '/operational'
        };
        
        let redirectUrl = userRedirects[userType] || '/';        

        const backToPageLinks = document.querySelectorAll('.back-to-page');

            backToPageLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    window.location.href = redirectUrl; 
                });
            });
    })
    .catch(error => {
    console.error('Error fetching user type:', error);
});

function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}
