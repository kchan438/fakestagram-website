function logoutClick(event) {
    //will be a post because it is modifying the resource (server state; session store)
    //get will only retrieve the resource and cannot modify anything
    //need to perform a fetch
    var fetchOptions = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let fetchURL = 'http://localhost:3000/dbtest/logout';
    fetch(fetchURL, fetchOptions)
    .then((data) => {
        console.log(data);
        let logButton = document.getElementById('login-button');
        logButton.innerHTML = "<u>Login<u>";
        logButton.setAttribute('href', '/login');
        logButton.onclick = null;
        location.replace('/logout');
        //can be used as well
        // window.location = "http://localhost:3000/logout";
    }).catch((err) => location.reload());
}

if (document.cookie.includes('csid')) {
    console.log("User is logged in.");
    let logButton = document.getElementById('login-button');
    logButton.innerHTML = "<u>Log Out<u>";
    logButton.removeAttribute('href');
    logButton.onclick = logoutClick;
} else {
    let logButton = document.getElementById('login-button');
    logButton.innerHTML = "<u>Login<u>";
    logButton.setAttribute('href', '/login');
}