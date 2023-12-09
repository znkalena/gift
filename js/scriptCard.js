const API_URL ='https://curvy-prong-handle.glitch.me/';

const card = document.querySelector(".card");
const cardTitle =document.querySelector(".card__title");
const cardContact = document.querySelector(".card__contact");
const cardImg = document.querySelector(".card__front-img");
const cardFrom = document.querySelector(".card__from");
const cardTo = document.querySelector(".card__to");
const cardMessage =document.querySelector(".card__message");


const rerenderContact =() => {
    const screenWidth = window.innerWidth;
    if(screenWidth <= 580){
        card.after(cardContact);
    }
    else{
        cardTitle.after(cardContact);
    }
}

const GetGiftData =async(id) =>{
try {
    const response =await fetch(`${API_URL}/api/gift/${id}`);    
    if(response.ok){
        return response.json();
    }
    else{
        throw new Error("Postcard wasn't founded")
    }
} catch (error) {
    console.error(error);
}
}
const getIdFromUrl =(id) =>{
    const params = new URLSearchParams(location.search);    
    return params.get("id");
}
const init =async() =>{
    rerenderContact();
    window.addEventListener('resize',rerenderContact);
    const id = getIdFromUrl();    
    if(id){
        const data = await GetGiftData(id);
        if(data){            
            cardImg.src =`img/${data.card}.png`;
            cardFrom.textContent = data.sender +' '+' telephon: '+ data.phoneSet;
            cardTo.textContent =data.geter;
            const formatedData =data.message.replaceAll("\n","<br>");                       
            cardMessage.innerHTML =formatedData;
        }
    }    
}
init();