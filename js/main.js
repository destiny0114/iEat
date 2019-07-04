const gallery_btns = document.getElementsByClassName('gallery-item');
const modal = document.getElementsByClassName('modal')[0];
const modal_close_btn = document.getElementsByClassName('close-btn')[0];
const jump_distance = 95;
const slides = document.getElementsByClassName('slide');
const slide_next_btn = document.getElementsByClassName('next-btn')[0];
const slide_prev_btn = document.getElementsByClassName('prev-btn')[0];
let slide_index = 0;

const fullscreen_btn = document.getElementsByClassName('fullscreen-btn')[0];
const exitfullscreen_btn = document.getElementsByClassName('exitfullscreen-btn')[0];

//modalshowup
[...gallery_btns].forEach((gallery_btn, index) => {
    gallery_btn.addEventListener('click', () => {
        modal.style.display = 'block';

        gallery_btns[index].id = 'target';

        slides[index].classList.add('current');
        slide_index = index;
        console.log(slide_index);

        if (slide_index == 0) {
            slide_prev_btn.style.pointerEvents = "none";
            slide_prev_btn.style.cursor = "default";
            slide_prev_btn.style.opacity = .5;
        }
        else if (slide_index == slides.length - 1) {
            slide_next_btn.style.pointerEvents = "none";
            slide_next_btn.style.cursor = "default";
            slide_next_btn.style.opacity = .5;
        }
        else {
            slide_prev_btn.style.pointerEvents = "auto";
            slide_prev_btn.style.cursor = "pointer";
            slide_prev_btn.style.opacity = 1;

            slide_next_btn.style.pointerEvents = "auto";
            slide_next_btn.style.cursor = "pointer";
            slide_next_btn.style.opacity = 1;
        }

    });
});

//modalclose and slide to selected picture
modal_close_btn.addEventListener('click', () => {
    modal.style.display = 'none';

    let target = document.getElementById("target");
    let current = document.getElementsByClassName('current')[0];

    scrollIt(target.getBoundingClientRect().top + (window.scrollY - jump_distance), 1000, 'linear');

    setTimeout(() => {
        target.removeAttribute('id');
        current.classList.remove('current');
    });

    // window.scroll({
    //     top:  behavior: 'smooth'
    // }
    //);
}
);

//image slider
const nextslide = () => {
    let target = document.getElementById("target");
    let current = document.getElementsByClassName('current')[0];

    if (current.nextElementSibling.classList.contains('slide')) {
        current.nextElementSibling.classList.add('current');
        slide_index++;
    }
    else {
        //slides[0].classList.add('current');
        slide_index = 0;
    }
    gallery_btns[slide_index].id = 'target';

    setTimeout(() => {
        current.classList.remove('current');
        target.removeAttribute('id');

        if (slide_index == slides.length - 1) {
            slide_next_btn.style.pointerEvents = "none";
            slide_next_btn.style.cursor = "default";
            slide_next_btn.style.opacity = .5;
        }
        else {
            slide_prev_btn.style.pointerEvents = "auto";
            slide_prev_btn.style.cursor = "pointer";
            slide_prev_btn.style.opacity = 1;

            slide_next_btn.style.pointerEvents = "auto";
            slide_next_btn.style.cursor = "pointer";
            slide_next_btn.style.opacity = 1;
        }
    });

    if (slides[slide_index].classList.contains('coming-soon')) {
        slide_next_btn.style.right = 0;
        slides[slide_index].children[0].style.width = '100%';
        slides[slides.length - 2].children[0].style.width = '100%';
    }
    else {
        slide_next_btn.style.right = 30 + '%';
    }
}

const prevslide = () => {
    let target = document.getElementById("target");
    let current = document.getElementsByClassName('current')[0];

    if (current.previousElementSibling) {
        current.previousElementSibling.classList.add('current');
        slide_index--;
    }
    else {
        //slides[slides.length - 1].classList.add('current');
        slide_index = slides.length - 1;
    }

    gallery_btns[slide_index].id = 'target';

    setTimeout(() => {
        current.classList.remove('current');
        current.children[0].style.width = '70%';
        target.removeAttribute('id');

        if (slide_index == 0) {
            slide_prev_btn.style.pointerEvents = "none";
            slide_prev_btn.style.cursor = "default";
            slide_prev_btn.style.opacity = .5;
        }
        else {
            slide_prev_btn.style.pointerEvents = "auto";
            slide_prev_btn.style.cursor = "pointer";
            slide_prev_btn.style.opacity = 1;

            slide_next_btn.style.pointerEvents = "auto";
            slide_next_btn.style.cursor = "pointer";
            slide_next_btn.style.opacity = 1;
        }
    });
    if (!slides[slide_index].classList.contains('coming-soon')) {
        slide_next_btn.style.right = 30 + '%';
        slides[slide_index].children[0].style.width = '70%';
    }
}

slide_next_btn.addEventListener('click', e => {
    nextslide();
});

slide_prev_btn.addEventListener('click', e => {
    prevslide();
});

fullscreen_btn.addEventListener('click', e => {
    if (modal.webkitRequestFullscreen) {
        modal.webkitRequestFullscreen();
    }
});

exitfullscreen_btn.addEventListener('click', e => {
    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
});

function scrollIt(destination, duration = 200, easing = 'linear', callback) {

    // Predefine list of available timing functions
    // If you need more, tween js is full of great examples
    // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
    const easings = {
        linear(t) {
            return t;
        },
        easeInQuad(t) {
            return t * t;
        },
        easeOutQuad(t) {
            return t * (2 - t);
        },
        easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
            return t * t * t;
        },
        easeOutCubic(t) {
            return (--t) * t * t + 1;
        },
        easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
            return t * t * t * t;
        },
        easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        },
        easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        },
        easeInQuint(t) {
            return t * t * t * t * t;
        },
        easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
        },
        easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
        }
    };


    // Store initial position of a window and time
    // If performance is not available in your browser
    // It will fallback to new Date().getTime() - thanks IE < 10
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    // const startTime = typeof(window.performance['now']) == 'function' ? performance.now() : new Date().getTime();


    // Take height of window and document to sesolve max scrollable value
    // Prevent requestAnimationFrame() from scrolling below maximum scollable value
    // Resolve destination type (node or number)
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);


    // If requestAnimationFrame is not supported
    // Move window to destination position and trigger callback function
    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }


    // function resolves position of a window and moves to exact amount of pixels
    // Resolved by calculating delta and timing function choosen by user
    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easings[easing](time);

        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        // Stop requesting animation when window reached its destination
        // And run a callback function
        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }

        // If window still needs to scroll to reach destination
        // Request another scroll invokation
        requestAnimationFrame(scroll);
    }


    // Invoke scroll and sequential requestAnimationFrame
    scroll();
}