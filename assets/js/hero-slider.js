let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runNextAuto;

// Add event listeners for the next and previous buttons
nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

// Auto-advance to the next slide
runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext);

// Function to handle the slider transition
function showSlider(type){
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// Add event listeners to thumbnails for manual slide change
thumbnailItemsDom.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        showSlideByIndex(index);
    });
});

// Function to show a slide based on the thumbnail click
function showSlideByIndex(index) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let currentSlide = Array.from(SliderItemsDom).indexOf(SliderDom.querySelector('.item'));

    if (index > currentSlide) {
        for (let i = 0; i < index - currentSlide; i++) {
            SliderDom.appendChild(SliderItemsDom[0]); // Move slides to the left
        }
    } else {
        for (let i = 0; i < currentSlide - index; i++) {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]); // Move slides to the right
        }
    }

    // Update the thumbnail order as well
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    let currentThumbnail = Array.from(thumbnailItemsDom).indexOf(thumbnailBorderDom.querySelector('.item'));
    
    if (index > currentThumbnail) {
        for (let i = 0; i < index - currentThumbnail; i++) {
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        }
    } else {
        for (let i = 0; i < currentThumbnail - index; i++) {
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        }
    }

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext);
}
