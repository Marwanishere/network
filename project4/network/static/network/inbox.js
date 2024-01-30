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
            headers: {
                // line below used in conjunction with getCookie function to solve techical issue, acquired 
                // through cs50 chatbot prompting
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        console.log(` just to make sure the logging has been done correctly here is the title: ${title}`)
        location.reload()
        // reload function gets rid of all console.log in this coument.queryselector area, line above acquired through cs50 prompting
    }
})
// function below acquired from cs50 chatbot and is purely there to solve a techincal issue 403 error
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// below query selector acquired by cs50 chatbot
document.querySelectorAll('#delete-button').forEach(button => {
    button.addEventListener('click', delete_old_post);
});
// below function skeleton/body made using cs50 chatbot then adapted to fit use case
function delete_old_post(e) {
    e.preventDefault()
    let id = e.target.dataset.id;
    console.log(`Deleted post with id ${id}`)
    fetch(`/delete_post/${id}/`, {
        method: 'DELETE',
        headers: {
            // line below used in conjunction with getCookie function to solve techical issue, acquired 
            // through cs50 chatbot prompting
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
            id: id
        })
    })
    .finally(()=> location.reload());
}

document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', edit_post);
});
function save_post(e){
    e.preventDefault();
    let id = e.target.dataset.id;
    let new_content = document.querySelector('.text-area').value;
    let original_content = document.querySelector('.post_content1').textContent;
    document.querySelector('.text-area').value = original_content;
    e.target.textContent = 'Edit';
    fetch(`/edit_post/${id}/`,{
        method: 'PUT',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body:JSON.stringify({
            content: new_content,
            id: id
        })
    })
    .then(r => r.json())
    .then(data => {
        let old_content = document.querySelector('.old_posts[data-id="'+ id + '"] h6');
        old_content.textContent = data.new_content;
        document.querySelector('.post_content1').textContent = new_content;
    });
    document.querySelector('.post_content1').style.display = 'block';
    document.querySelector('.text-area').style.display = 'None';
    console.log(data.new_content);
    console.log(`edit post with id ${id}`);
};
function edit_post(e) {
    e.preventDefault()
    document.querySelector('.post_content1').style.display = 'None';
    document.querySelector('.text-area').style.display = 'block';
    e.target.textContent = 'Save';
    let id = e.target.dataset.id;
    let original_content = document.querySelector('.post_content1').textContent;
    document.querySelector('.text-area').value = original_content;
    console.log(`edit post with id ${id}`)
    e.target.addEventListener('click', save_post);
    
};

// if im to do this again just rebuild it so that save and edit post are two seperate buttons and that when one gets showed 
// the other one gets blocked.