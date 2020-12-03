function postClick(event) {
    if (document.cookie.includes('csid')) {
        let fkID = document.cookie.fk_userid;
        console.log(fkID);
    }
    else {
        console.log("didn't work for fkID");
    }
}

let postSubmit = document.getElementById('post-button');
postSubmit.onsubmit = postClick;