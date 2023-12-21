document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript is loaded and working!");

    document.querySelector('#post-form').onsubmit = function(e) {
        e.preventDefault();
        console.log("Form submitted!");

        // get the title and content
        let title = document.querySelector('#title-content').value;
        let content = document.querySelector('#post-content').value;

        // TODO: send an AJAX request to the server
        // TODO: handle the response
    };
});