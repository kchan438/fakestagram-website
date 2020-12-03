function createCard(data) {
    //needed to take out '/public' part of the path because this was causing a 404 error
    //a quick fix but couldn't find a proper way
    let path = data.thumbnailpath.substring(6);
    return `<div id=image-post-${data.id} class="imagepost"> \
                  <img class="postimage" src="${path}"></img> \
                  <div class="postbody"> \
                    <p class="post-title">Title: ${data.title}</p> \
                    <a href="postimage/${data.id}" class="anchor-buttons">Details</a> \
                  </div> \
            </div>`;
            // <p class="post-desc">${data.description}</p> \
  }

  
    fetch("http://localhost:3000/posts/getAllPosts/")
    .then((data) => data.json())
    .then((dataAsObject) => {
      // console.log(dataAsObject);
      let _html = "";
      console.log(dataAsObject);
      dataAsObject.forEach((post) => {
        _html+=  createCard(post);
      })
      document.getElementById('image-section').innerHTML = _html;
    //   document.getElementsByClassName("sectionelement").innerHTML = _html;
    })
    //if error is caught then we will need to redirect to a page or display an alert message
    //will need to change this line
    .catch((err) => console.log(err));