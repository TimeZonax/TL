// Avatar Preview
const avatarInput = document.getElementById('avatar-emoji');
const avatarBgInput = document.getElementById('avatar-bg');
const avatarPreview = document.getElementById('avatar-preview');

if(avatarInput){
    avatarInput.addEventListener('input', updateAvatarPreview);
    avatarBgInput.addEventListener('input', updateAvatarPreview);
}

function updateAvatarPreview(){
    avatarPreview.textContent = avatarInput.value || '🧙‍♂️';
    avatarPreview.style.backgroundColor = avatarBgInput.value;
}

// Navigation
const startBtn = document.getElementById('start-btn');
if(startBtn){
    startBtn.addEventListener('click', ()=>{
        const name = document.getElementById('player-name').value.trim();
        if(!name){ alert('กรุณาพิมพ์ชื่อผู้เล่น'); return;}
        localStorage.setItem('playerName',name);
        localStorage.setItem('avatar',avatarInput.value || '🧙‍♂️');
        localStorage.setItem('avatarBg',avatarBgInput.value || '#8B4513');
        window.location.href = 'quest.html';
    });
}

const goParkBtn = document.getElementById('go-park-btn');
if(goParkBtn){
    goParkBtn.addEventListener('click', ()=> window.location.href = 'park.html');
}

// Park page setup
const playerNameDisplay = document.getElementById('player-name-display');
const playerAvatar = document.getElementById('player-avatar');

if(playerNameDisplay && playerAvatar){
    playerNameDisplay.textContent = localStorage.getItem('playerName');
    playerAvatar.textContent = localStorage.getItem('avatar');
    playerAvatar.style.backgroundColor = localStorage.getItem('avatarBg');
}

// Community Chat (placeholder)
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

if(chatSend && chatInput && chatMessages){
    chatSend.addEventListener('click', ()=>{
        const msg = chatInput.value.trim();
        if(msg === '') return;
        const p = document.createElement('p');
        p.textContent = `${localStorage.getItem('playerName')}: ${msg}`;
        chatMessages.appendChild(p);
        chatInput.value='';
    });
}

// Vote / Review logic (simple placeholder)
document.querySelectorAll('.vote-button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        alert('คุณได้โหวตแล้ว!'); // TODO: เชื่อม backend / update ranking / prevent multiple vote
    });
});
