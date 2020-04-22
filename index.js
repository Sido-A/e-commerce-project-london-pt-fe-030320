const mouseOverOnCarousel = document.querySelector(".carousel")
const next = document.querySelector(".carousel-button-next");
const prev = document.querySelector(".carousel-button-prev");
const carouselButton = document.querySelector(".carousel-button");
const slides = document.querySelectorAll(".carousel-photo")
const carouselImg = document.querySelector(".carousel-img")
let counter = 0;
let timeOut = null;

// top page hover display next & prev arrow
const mouseOver = ()=> {
    mouseOverOnCarousel.addEventListener("mouseover", () => {
        next.style.display = "block";
        prev.style.display = "block";
    })
}

const mouseOut = ()=> {
    mouseOverOnCarousel.addEventListener("mouseout",()=>{
        next.style.display = "none";
        prev.style.display = "none"
    })
}
mouseOver();
mouseOut();



// Top page auto carousel
let myIndex = 0;
const autoCarousel = ()=> {
    counter += 1;
    plusAbs = Math.abs(counter % slides.length) // remainder counter 1 % slides.length 3 = 2
    for (let i = 0; i < slides.length; i++) {
        if (counter >= slides.length) {
            counter = 0;            
        }else {
        carouselImg.style.transform = `translate(-${plusAbs}00%,0)`; 
        }   
    }
    timeOut = setTimeout(autoCarousel, 3000);
}
autoCarousel();

// slide the photo when click
const slidePhotoClick = ()=>{
    counter = 0;
    let plusAbs = 0;
    
    carouselButton.addEventListener("click",(event)=>{
        clearTimeout(timeOut);
    if (event.target === next) {
        counter += 1;
        plusAbs = Math.abs(counter % slides.length)
        carouselImg.style.transform = `translate(-${plusAbs}00%,0)`; 
        timeOut = setTimeout(autoCarousel, 2000);
    } else {        
        plusAbs = Math.abs(counter % slides.length)
        counter = counter + slides.length - 1;        
        carouselImg.style.transform = `translate(-${plusAbs}00%,0)`;    
        timeOut = setTimeout(autoCarousel, 2000);  
    }
})
}
slidePhotoClick();