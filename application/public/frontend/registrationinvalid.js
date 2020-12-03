function onClick(event) {
    let usernameLabel = document.getElementById('username-input-id');
    let emailLabel = document.getElementById('email-input-id');

    let passwordLabel = document.getElementById('password-label-id');
    let confirmPasswordLabel = document.getElementById('confirm-password-label-id');
    let passwordInput = document.getElementById('password-input');
    let confirmPasswordInput = document.getElementById('confirm-password-input');

    let ageCheckLabel = document.getElementById('age-check-label-id');
    let rulesCheckLabel = document.getElementById('rules-check-label-id');
    let ageCheckInput = document.getElementById('age-check-input');
    let rulesCheckInput = document.getElementById('rules-check-input');



    if (window.location.href == "http://localhost:3000/registration.js") {
        if (usernameLabel && emailLabel == "") {
            console.log("Username or email is invalid.");
            //disable routing
            window.location = "http://localhost:3000/registration";
        }
        else if (passwordInput != confirmPasswordInput && (passwordInput && confirmPasswordInput == 0)) {
            passwordLabel.setAttribute("style", "color: red;");
            confirmPasswordLabel.setAttribute("style", "color: red;");
        }
        else if (rulesCheckInput.value == 'off') {
            ageCheckLabel.setAttribute("style", "color: red;");
        }
        else if (ageCheckInput.value == 'off') {
            rulesCheckLabel.setAttribute("style", "color: red;");
        }
    }
}

let regSubmitButton = document.getElementById('registration-button');
regSubmitButton.onclick = setTimeout(onClick, 500);