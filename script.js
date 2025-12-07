// --- หน้าแรก Avatar preview ---
const avatarInput = document.getElementById('avatar-emoji');
const avatarBgInput = document.getElementById('avatar-bg');
const avatarPreview = document.getElementById('avatar-preview');

if(avatarInput){
    avatarInput.addEventListener('input',()=>{ avatarPreview.textContent=avatarInput.value||'🧙‍♂️';});
    avatarBgInput.addEventListener('input',()=>{ avatarPreview.style.backgroundColor=avatarBgInput.value;});
}

// --- ปุ่มเริ่มผจญภัย ---
const startBtn = document.getElementById('start-btn');
if(startBtn){
    startBtn.addEventListener('click',()=>{
        const name = document.getElementById('player-name').value.trim();
        if(!name){ alert('กรุณาพิมพ์ชื่อผู้เล่น'); return; }
        const emoji = avatarInput.value || '🧙‍♂️';
        const bg = avatarBgInput.value;
        localStorage.setItem('playerName', name);
        localStorage.setItem('playerEmoji', emoji);
        localStorage.setItem('playerBg', bg);
        startBtn.classList.add('btn-active-glow');
        setTimeout(()=>{ window.location.href='quest.html'; }, 500);
    });
}

// --- หน้า quest.html ---
const toParkBtn = document.getElementById('to-park-btn');
if(toParkBtn){
    toParkBtn.addEventListener('click',()=>{
        toParkBtn.classList.add('btn-active-glow');
        setTimeout(()=>{ window.location.href='park.html'; },500);
    });
}

// --- park.html ---
const playerNameDisplay = document.getElementById('player-name-display');
const playerAvatar = document.getElementById('player-avatar');

if(playerNameDisplay) playerNameDisplay.textContent = localStorage.getItem('playerName') || 'ผู้เล่น';
if(playerAvatar){
    playerAvatar.textContent = localStorage.getItem('playerEmoji') || '🧙‍♂️';
    playerAvatar.style.backgroundColor = localStorage.getItem('playerBg') || '#1e3c72';
}

// สร้างร้านค้า
const shopsContainer = document.getElementById('shops-container');
if(shopsContainer){
    shopsData.forEach((shop,i)=>{
        const card = document.createElement('div');
        card.className='shop-card';
        card.innerHTML = `<h4>${shop.name}</h4>`;
        shop.menu.forEach(menu=>{
            const menuBtn = document.createElement('button');
            menuBtn.className='btn-glow';
            menuBtn.textContent = `${menu.name} - ${menu.price} บาท`;
            menuBtn.addEventListener('click',()=>{
                alert(`คุณโหวต ${menu.name} ของ ${shop.name} เรียบร้อยแล้ว!`);
                menuBtn.disabled=true;
            });
            card.appendChild(menuBtn);
        });
        shopsContainer.appendChild(card);
    });
}

// --- แชทคอมมูนิตี้ ---
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
if(chatSend){
    chatSend.addEventListener('click',()=>{
        const msg = chatInput.value.trim();
        if(msg==='') return;
        const p = document.createElement('p');
        p.textContent = `${localStorage.getItem('playerName') || 'ผู้เล่น'}: ${msg}`;
        chatBox.appendChild(p);
        chatInput.value='';
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
