const blog_wrapper = document.getElementsByClassName('blog-wrapper')[0];
const posts = document.getElementsByClassName('post');
const more_btns = document.getElementsByClassName('more-btn');

const share_modal = document.getElementsByClassName('share-modal')[0];
const share_modal_close_btn = document.getElementsByClassName('close-btn')[0];

[...more_btns].forEach((more_btn, index) => {
    more_btn.addEventListener('click', e => {
        if (!more_btn.parentElement.getElementsByClassName('more-btn-modal')[0]) {

            [...more_btns].forEach((btn) => {
                if (btn.parentElement.getElementsByClassName('more-btn-modal')[0])
                    btn.parentElement.getElementsByClassName('more-btn-modal')[0].remove();
            });

            let div = document.createElement('div');
            div.classList.add('more-btn-modal');
            div.innerHTML = `<div class="share-icon"></div>
            <span class="share-text">Share Post</span>`;
            more_btn.parentElement.appendChild(div);

            div.addEventListener('click', e => {
                share_modal.style.display = 'block';
            });
        }
        else {
            more_btn.parentElement.getElementsByClassName('more-btn-modal')[0].remove();
        }

    });
});

share_modal_close_btn.addEventListener('click', e => {
    share_modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target == blog_wrapper) {

        [...more_btns].forEach((btn) => {
            if (btn.parentElement.getElementsByClassName('more-btn-modal')[0])
                btn.parentElement.getElementsByClassName('more-btn-modal')[0].remove();
        });
    }
});