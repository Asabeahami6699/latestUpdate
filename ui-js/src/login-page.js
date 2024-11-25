
document.addEventListener("DOMContentLoaded", function () {
    const errorMessageElement = document.querySelector('h3');
    if (errorMessageElement && errorMessageElement.textContent.trim() !== "") {
        errorMessageElement.style.display = 'block';

        setTimeout(function () {
            errorMessageElement.style.display = 'none';
        }, 4000);
    }
});

function handleSubmit(event) {
    event.preventDefault();

    const loginButton = document.getElementById('login-bttn');
    loginButton.disabled = true;
    loginButton.textContent = 'Signing you in...';

    loginButton.classList.add('loading');

    setTimeout(() => {
        loginButton.textContent = 'Almost there...';
    }, 1500); 

    setTimeout(() => {
        event.target.submit();
    }, 3000); 
}




  