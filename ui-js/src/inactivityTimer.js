
(function () {
    let timer;

    // Set logout time to 5 hours (5 * 60 * 60 * 1000 milliseconds)
    const logoutTime = 5 * 60 * 60 * 1000;

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(logoutUser, logoutTime);
    }

    function logoutUser() {
        fetch('/logout', {
            method: 'DELETE',
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;  // Redirects to home page after logout
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    }

    // Listen to various user interactions to reset the timer
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.onscroll = resetTimer;
    document.onclick = resetTimer;
})();
