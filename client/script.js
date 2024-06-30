const socket = io();

let username = "";

const btn = document.getElementById("join-chat");
const usernameInput = document.getElementById("username-input");
const from = document.getElementById("form");
const chatRoomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.getElementById("message-container");

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    username = usernameInput.value;
    if(username){
        from.style.display = "none"
        chatRoomContainer.style.display = "block";
    }
})

sendButton.addEventListener("click",(e)=>{
    e.preventDefault();

    let data = {
        id: socket.id,
        username: username,
        message: messageInput.value
    }
    socket.emit('sending message event',data);
    renderMessage(data,'sent');
})
function renderMessage(data,typeOfMessage){
    const msgDiv = document.createElement("div");
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if(typeOfMessage === "sent"){
        msgDiv.setAttribute('class', 'message sent');
    }
    else{
        msgDiv.setAttribute('class','message');
    }
    messageContainer.append(msgDiv);
    messageContainer.value = "";
}

socket.on('io spreading message',(data)=>{
    if(socket.id !== data.id){
        renderMessage(data, 'recived');
    }
})
