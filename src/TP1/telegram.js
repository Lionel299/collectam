 

let trigger1 = document.querySelector(".show1");
let trigger2 = document.querySelector(".show2");
let trigger3 = document.querySelector(".show3");
let trigger4 = document.querySelector(".show4");
let trigger5 = document.querySelector(".show5");
let trigger6 = document.querySelector(".show6");
let trigger7 = document.querySelector(".show7");
let trigger8 = document.querySelector(".show8");


let Right2 = document.querySelector(".Right2");
let Right1 = document.querySelector(".Right1");
let Right3 = document.querySelector(".Right3");
let Right4 = document.querySelector(".Right4");
let Right5 = document.querySelector(".Right5");
let Right6 = document.querySelector(".Right6");
let Right7 = document.querySelector(".Right7");
let Right8 = document.querySelector(".Right8");

//changer le tableau de discussion 
trigger1.addEventListener("click", (e) =>{
    
    if (Right1.classList.contains("show")){
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right4.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
        Right1.classList.add("show");
    } else {
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right4.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
        Right1.classList.add("show");
    }
})

trigger2.addEventListener("click", (e) =>{
    
    if (Right2.classList.contains("show")){
        Right1.classList.remove("show");
        Right3.classList.remove("show");
        Right4.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
        Right2.classList.add("show");

    } else {
        Right2.classList.add("show");
        Right4.classList.remove("show");
        Right1.classList.remove("show");
        Right3.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
    }
})
trigger3.addEventListener("click", (e) =>{
    
    if (Right3.classList.contains("show")){
        Right1.classList.remove("show");
        Right4.classList.remove("show");
        Right2.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
        Right3.classList.add("show");

    } else {
        Right3.classList.add("show");
        Right4.classList.remove("show");
        Right2.classList.remove("show");
        Right1.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
    }
})
trigger4.addEventListener("click", (e) =>{
    
    if (Right4.classList.contains("show")){
        Right4.classList.add("show");
        Right1.classList.remove("show");
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");

    } else {
        Right4.classList.add("show");
        Right3.classList.remove("show");
        Right2.classList.remove("show");
        Right1.classList.remove("show");
        Right5.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
    }
})
trigger5.addEventListener("click", (e) =>{
    
    if (Right5.classList.contains("show")){
        Right5.classList.add("show");
        Right1.classList.remove("show");
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right4.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");

    } else {
        Right5.classList.add("show");
        Right3.classList.remove("show");
        Right2.classList.remove("show");
        Right1.classList.remove("show");
        Right4.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
    }
})

trigger6.addEventListener("click", (e) =>{

    if (Right6.classList.contains("show")){
        Right6.classList.add("show");
        Right1.classList.remove("show");
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right5.classList.remove("show");
        Right4.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");

    } else {
        Right6.classList.add("show");
        Right3.classList.remove("show");
        Right2.classList.remove("show");
        Right1.classList.remove("show");
        Right4.classList.remove("show");
        Right5.classList.remove("show");
        Right7.classList.remove("show");
        Right8.classList.remove("show");
    }
})

trigger7.addEventListener("click", (e) =>{
    
    if (Right7.classList.contains("show")){
        Right7.classList.add("show");
        Right1.classList.remove("show");
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right4.classList.remove("show");
        Right6.classList.remove("show");
        Right5.classList.remove("show");
        Right8.classList.remove("show");

    } else {
        Right7.classList.add("show");
        Right3.classList.remove("show");
        Right2.classList.remove("show");
        Right1.classList.remove("show");
        Right4.classList.remove("show");
        Right6.classList.remove("show");
        Right5.classList.remove("show");
        Right8.classList.remove("show");
    }
})

trigger8.addEventListener("click", (e) =>{
    
    if (Right8.classList.contains("show")){
        Right8.classList.add("show");
        Right1.classList.remove("show");
        Right2.classList.remove("show");
        Right3.classList.remove("show");
        Right4.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right5.classList.remove("show");

    } else {
        Right8.classList.add("show");
        Right3.classList.remove("show");
        Right2.classList.remove("show");
        Right1.classList.remove("show");
        Right4.classList.remove("show");
        Right6.classList.remove("show");
        Right7.classList.remove("show");
        Right5.classList.remove("show");
    }
})

  //ajouter le active en cliquant sur une discussion
const part3 = document.querySelectorAll(".part-3");
part3.forEach(item => {
    item.addEventListener("click", function(){
        part3.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})

const part4 = document.querySelectorAll(".part-4");
part4.forEach(item => {
    item.addEventListener("click", function(){
        part4.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part3.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})
const part5 = document.querySelectorAll(".part-5");
part5.forEach(item => {
    item.addEventListener("click", function(){
        part3.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part3.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})
const part6 = document.querySelectorAll(".part-6");
part6.forEach(item => {
    item.addEventListener("click", function(){
        part3.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part3.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})
const part7 = document.querySelectorAll(".part-7");
part7.forEach(item => {
    item.addEventListener("click", function(){
        part3.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part3.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})
const part8 = document.querySelectorAll(".part-8");
part8.forEach(item => {
    item.addEventListener("click", function(){
        part3.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part3.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})
const part9 = document.querySelectorAll(".part-9");
part9.forEach(item => {
    item.addEventListener("click", function(){
        part9.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part3.forEach(i => i.classList.remove("active"));
        part10.forEach(i => i.classList.remove("active"));
    })
})
const part10 = document.querySelectorAll(".part-10");
part10.forEach(item => {
    item.addEventListener("click", function(){
        part10.forEach(i => i.classList.add("active"));
        this.classList.add("active")
        part4.forEach(i => i.classList.remove("active"));
        part5.forEach(i => i.classList.remove("active"));
        part6.forEach(i => i.classList.remove("active"));
        part7.forEach(i => i.classList.remove("active"));
        part8.forEach(i => i.classList.remove("active"));
        part9.forEach(i => i.classList.remove("active"));
        part3.forEach(i => i.classList.remove("active"));
    })
});

document.getElementById('sendBtn').addEventListener('click', function() { 
    const messageInput = document.getElementById('messageInput'); 
    const messageField = document.getElementById('chat1'); 
    if (messageInput.value.trim() !== "") { 
        const message = document.createElement('div'); 
        
        // Obtenir l'heure actuelle
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = hours + ':' + minutes;
        
        // Ajouter l'heure au contenu du message
        message.textContent = messageInput.value + ' (' + timeString + ')'; 
        message.classList.add('message-box'); 
        messageField.appendChild(message); 
        
        // Effacer le champ de saisie après l'envoi du message 
        messageInput.value = ''; 
        
        // Faire défiler jusqu'en bas du champ de message 
        messageField.scrollTop = messageField.scrollHeight;

        // Ajouter un message aléatoire après 2 secondes
        setTimeout(function() {
            const randomMessages = [
                "Salut",
                "C'est cool non ?",
                "Bonjour",
                "On dit quoi alors ?",
                "Je vais bien "
            ];
            const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const timeString = hours + ':' + minutes;
            const reply = document.createElement('div');
            reply.textContent = randomMessage + '(' + timeString + ')'; 
            reply.classList.add('left-box'); 
            messageField.appendChild(reply); 
            
            // Faire défiler jusqu'en bas du champ de message 
            messageField.scrollTop = messageField.scrollHeight; 
        }, 2000);
    } 
});

//Effacer un message 
document.getElementById('deleteLastBtn').addEventListener('click', function() {
    const messageField = document.getElementById('chat1');
    if (messageField.lastChild) {
        messageField.removeChild(messageField.lastChild);
    }
});

//Effacer tout les messages
document.getElementById('deleteAllBtn').addEventListener('click', function() {
    const messageField = document.getElementById('chat1');
    while (messageField.firstChild) {
        messageField.removeChild(messageField.firstChild);
    }
});




