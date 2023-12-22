document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript finally working")
    document.querySelector('#submit-post').onclick = (e) => {
        e.preventDefault()
        // has to be something another var up top is preventDefault is a method of the event object, not the document object.
        // You should modify your event handler to receive an event parameter and call preventDefault on that.
        const title = document.querySelector('#title-content').value;
        const content = document.querySelector('#post-content').value;
        console.log("submit button clicked")
        // fetch request below changed in line with cs50 chatbot hint
        fetch('/npost', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        console.log(` just to make sure the logging has been done correctly here is the title: ${title}`)
    }
})

