
function showAUTB(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'block';
}

function showVATWD(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TW-form').style.display = 'block';
}

function AiyinaseT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'none';
    document.getElementById('ATB-form').style.display = 'block';
}

function BogosoT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'none';
    document.getElementById('BTB-form').style.display = 'block';
}

function PresteaT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'none';
    document.getElementById('PTB-form').style.display = 'block';
}

function TandSbalancing(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TandS-form').style.display = 'block';
}

function XportAllDocs(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllDocs-form3').style.display = 'block';
}

function XportAllTsDocs(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllTDocs-form').style.display = 'block';
}

function Download1(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllTDocs-form').style.display = 'none';
    document.getElementById('XportAllDocs-form2').style.display = 'block';
}

function Download2(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllTDocs-form').style.display = 'none';
    document.getElementById('XportAllDocs-form1').style.display = 'block';
}

function Sbalancing(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('SuperuserBlc-form').style.display = 'block';
}

function mcb(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('mcb-form').style.display = 'block';
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

function close1(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('SuperuserBlc-form').style.display = 'none';
}

function close2(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('TandS-form').style.display = 'none';
}


function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}