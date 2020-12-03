
let url = document.URL.split('/');
let _id = url[url.length - 1];
let postURL = "http://localhost:3000/posts/getPostByID/" + _id;
fetch(postURL)
    .then((data) => data.json())
    .then((dataAsObject) => {
        console.log(dataAsObject);
        let str = dataAsObject.photopath.substring(6);
        document.getElementById("posted-image").src = str;
        document.getElementById("image-post-title-text").textContent += dataAsObject.title;
        document.getElementById("image-post-author").textContent += dataAsObject.username;
        document.getElementById("image-post-created").textContent += dataAsObject.created;
        document.getElementById("image-post-description").textContent += dataAsObject.description;
    })
    //if error is caught then we will need to redirect to a page or display an alert message
    //will need to change this line
    .catch((err) => console.log(err));