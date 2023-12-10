const thumbsSwiper = new Swiper(".gift__swiper--thumbs", {
    slidesPerView: 6,
    spaceBetween: 12,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints:{
    320:{        
        spaceBetween: 12,
        slidesPerView: 5,
    },
    1141:{
        spaceBetween: 16,
        slidesPerView: 6,        
    }
    }
});

const swiperMain = new Swiper(".gift__swiper--card", {
    spaceBetween:16,    
    thumbs: {
        swiper: thumbsSwiper
    }
});

const API_URL ='https://curvy-prong-handle.glitch.me/';

const form = document.querySelector(".form");
const phoneInputs = form.querySelectorAll(".form__field--phone");
const formButton = form.querySelector(".form__button");
const cardInput = document.querySelector(".form__card");

const updateCardInput =() => {
    const activeSlide = document.querySelector(".gift__swiper--card .swiper-slide-active");
    const cardData = activeSlide.querySelector(".gift__card-image").dataset.card;
    cardInput.value = cardData;
}
updateCardInput();
swiperMain.on("slideChangeTransitionEnd",updateCardInput)

for (let i = 0;i < phoneInputs.length;i++){
    const element = phoneInputs[i];
    const maskOptions = {
        mask: '+{000}(00)000-00-00'
    };
    IMask(element, maskOptions);
};

const updateSubmitButton =() =>{
    let isFormFilled = true;
    
    for(const field of [...form.elements]){
        if(field.classList.contains('form__field')){
            if(!field.value.trim()){
                isFormFilled = false;                
                break;
            }
        }
    }
    formButton.disabled = !isFormFilled;
};


form.addEventListener("input",updateSubmitButton);

form.addEventListener("submit",async(event) => {
event.preventDefault();
const formData = new FormData(form);
const data = Object.fromEntries(formData);

try {
    const response = await fetch(`${API_URL}/api/gift`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data),
    });
    const result =await response.json();    
    if(response.ok){
        prompt('Postcard saved successfully',`${location.origin}/card.html?id=${result.id}`);        
    }
    else{
        alert(`There is a mistake sending to server: ${result.error}`)
    } 
    form.reset();     
} catch (error) {
    console.error(`There is a mistake sending form ${error.message}`);
    alert('Let try again.Something wrong!')
}
});



