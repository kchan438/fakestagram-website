function onSubmitClick() {
    //if page redirects back to login page, then display message
    if (window.location.href == 'http://localhost:3000/login') {
        let errorMessage = document.getElementById('login-error-message');
        errorMessage.setAttribute("style", "color: red; visibility: visible");
        loginSubmitButton.onafterprint = null;
    }
}

let loginSubmitButton = document.getElementById('login-submit-button');
//loginSubmitButton.onafterprint = setTimeout(onSubmitClick(), 500);
loginSubmitButton.onafterprint = onSubmitClick();