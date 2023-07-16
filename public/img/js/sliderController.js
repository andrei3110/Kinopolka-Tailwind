if (document.documentElement.clientWidth > 1170) {

    let maxWidth = 1200;
    let itemsCount = 1;

    console.log(document.documentElement.clientWidth)
    addEventListener('resize', () => {
        if (document.documentElement.clientWidth < 760) {
            document.getElementById("sliders__pictures").classList.toggle("w-[450px]")
        }

    })

    const sliders = document.getElementById("sliders__pictures")
    sliders.forEach(slider => {
        let currentIndex = 0;
        let currentMargin = 0;
        const sliderWrapper = slider.getElementById("slider__wrapper")
        const items = sliderWrapper.getElementById("slider__item")

        items.forEach(items => {
            items.style.width = maxWidth / itemsCount + 'px';
        })
        sliderWrapper.style.width = maxWidth / itemsCount + items.length + 'px';

        const LeftBtn = document.getElementById("slider__control--l")
        const RightBtn = document.getElementById("slider__control--r")
        RightBtn.addEventListener('click', () => {
            if (currentIndex < 5) {
                currentIndex++;
                currentMargin = currentMargin - 1200;
                sliderWrapper.style.marginLeft = currentMargin + 'px';
            }

        })
        LeftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                currentMargin = currentMargin + 1200;
                sliderWrapper.style.marginLeft = currentMargin + 'px';
            }
        })
    })
}

/////////////////
if (document.documentElement.clientWidth < 1170) {

    let maxWidth = 770;
    let itemsCount = 1;

    console.log(document.documentElement.clientWidth)
    addEventListener('resize', () => {
        if (document.documentElement.clientWidth < 760) {
            document.getElementById("sliders__pictures").style.width = "450px"
        }

    })


    const sliders = document.getElementById("sliders__pictures")
    sliders.forEach(slider => {
        let currentIndex = 0;
        let currentMargin = 0;
        const sliderWrapper = slider.getElementById("slider__wrapper")
        
        const items = sliderWrapper.getElementById("slider__item")

        items.forEach(items => {
            items.style.width = maxWidth / itemsCount + 'px';
        })
        sliderWrapper.style.width = maxWidth / itemsCount + items.length + 'px';

        const LeftBtn = document.getElementById("slider__control--l")
        const RightBtn = document.getElementById("slider__control--r")
        RightBtn.addEventListener('click', () => {
            if (currentIndex < 5) {
                currentIndex++;
                currentMargin = currentMargin - 770;
                sliderWrapper.style.marginLeft = currentMargin + 'px';
            }

        })
        LeftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                currentMargin = currentMargin + 770;
                sliderWrapper.style.marginLeft = currentMargin + 'px';
            }
        })
    })
}
if (document.documentElement.clientWidth < 830) {

    let maxWidth = 500;
    let itemsCount = 1;

    const sliders = document.getElementById("sliders__pictures")
    sliders.forEach(slider => {
        let currentIndex = 0;
        let currentMargin = 0;
        const sliderWrapper = document.getElementById("slider__wrapper")
        sliderWrapper.innerHTML = `
        <div class="slider__item"><img class="slider__image--phone" src="./prevew/martian-phone.jpg"></div>
        <div class="slider__item"><img class="slider__image--phone" src="./prevew/avatar-phone.jpg"></div>
        <div class="slider__item"><img class="slider__image--phone" src="./prevew/prizrak-phone.jpg"></div>
        <div class="slider__item"><img class="slider__image--phone" src="./prevew/stalingrad-phone.jpg"></div>
        <div class="slider__item"><img class="slider__image--phone" src="./prevew/maleficent.jpg"></div>`;

        const items = sliderWrapper.querySelectorAll(".slider__item")

        items.forEach(items => {
            items.style.width = maxWidth / itemsCount + 'px';
        })
        sliderWrapper.style.width = maxWidth / itemsCount + items.length + 'px';

        const LeftBtn = document.getElementById(".slider__control--l")
        const RightBtn = document.getElementById(".slider__control--r")
        RightBtn.addEventListener('click', () => {
            if (currentIndex < 5) {
                currentIndex++;
                currentMargin = currentMargin - 500;
                sliderWrapper.style.marginLeft = currentMargin + 'px';
            }

        })
        LeftBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                currentMargin = currentMargin + 500;
                sliderWrapper.style.marginLeft = currentMargin + 'px';
            }
        })
    })
}
if (document.documentElement.clientWidth < 500) {

let maxWidth = 400;
let itemsCount = 1;

const sliders = document.getElementById(".sliders__pictures")
sliders.forEach(slider => {
let currentIndex = 0;
let currentMargin = 0;
const sliderWrapper = document.getElementById("slider__wrapper")
sliderWrapper.innerHTML = `
<div class="slider__item"><img class="slider__image--phone" src="./prevew/martian-phone.jpg"></div>
<div class="slider__item"><img class="slider__image--phone" src="./prevew/avatar-phone.jpg"></div>
<div class="slider__item"><img class="slider__image--phone" src="./prevew/prizrak-phone.jpg"></div>
<div class="slider__item"><img class="slider__image--phone" src="./prevew/stalingrad-phone.jpg"></div>
<div class="slider__item"><img class="slider__image--phone" src="./prevew/maleficent.jpg"></div>`;

const items = sliderWrapper.querySelectorAll(".slider__item")

items.forEach(items => {
items.style.width = maxWidth / itemsCount + 'px';
})
sliderWrapper.style.width = maxWidth / itemsCount + items.length + 'px';

const LeftBtn = document.getElementById(".slider__control--l")
const RightBtn = document.getElementById(".slider__control--r")
RightBtn.addEventListener('click', () => {
if (currentIndex < 5) {
currentIndex++;
currentMargin = currentMargin - 400;
sliderWrapper.style.marginLeft = currentMargin + 'px';
}

})
LeftBtn.addEventListener('click', () => {
if (currentIndex > 0) {
currentIndex--;
currentMargin = currentMargin + 400;
sliderWrapper.style.marginLeft = currentMargin + 'px';
}
})
})
}