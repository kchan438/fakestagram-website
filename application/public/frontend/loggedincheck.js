//this file is to check if you're not logged in then it will redirect you to the login page
if (document.cookie.includes('csid')) {
    console.log("User is logged in and they can post");
}
else {
    console.log("User is not logged in and needs to be redirected");
    let postButton = document.getElementById('post-button');
    postButton.setAttribute('href', '/login');
}
