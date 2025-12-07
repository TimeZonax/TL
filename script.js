// index.html
if(document.getElementById('avatar-emoji')){
    const avatarInput = document.getElementById('avatar-emoji');
    const avatarBgInput = document.getElementById('avatar-bg');
    const avatarPreview = document.getElementById('avatar-preview');
    function updateAvatar(){avatarPreview.textContent = avatarInput.value||'🧑'; avatarPreview.style.backgroundColor = avatarBgInput.value;}
    avatarInput.addEventListener('input',updateAvatar);
    avatarBgInput.addEventListener('input',updateAvatar);
    document.getElementById('start-btn').addEventListener('click',()=>{
        const name=document.getElementById('player-name').value.trim();
        if(!name){alert('กรุณาพิมพ์ชื่อผู้เล่น');return;}
        const player={name,emoji:avatarInput.value||'🧑',bg:avatarBgInput.value};
        localStorage.setItem('player',JSON.stringify(player));
        window.location.href='dashboard.html';
    });
}

// dashboard.html
if(document.getElementById('player-avatar')){
    const player=JSON.parse(localStorage.getItem('player'))||{name:'นักผจญภัย',emoji:'🧑',bg:'#1976d2'};
    document.getElementById('player-display-name').textContent=player.name;
    const avatarDiv=document.getElementById('player-avatar');
    avatarDiv.textContent=player.emoji; avatarDiv.style.backgroundColor=player.bg;

    const restaurants=[
        {name:'ร้าน A',menu:[{name:'เมนู1',price:120},{name:'เมนู2',price:150},{name:'เมนู3',price:100}]},
        {name:'ร้าน B',menu:[{name:'เมนู1',price:80},{name:'เมนู2',price:90},{name:'เมนู3',price:70}]},
        {name:'ร้าน C',menu:[{name:'เมนู1',price:50},{name:'เมนู2',price:60},{name:'เมนู3',price:70}]},
        {name:'ร้าน D',menu:[{name:'เมนู1',price:200},{name:'เมนู2',price:220},{name:'เมนู3',price:180}]},
        {name:'ร้าน E',menu:[{name:'เมนู1',price:300},{name:'เมนู2',price:250},{name:'เมนู3',price:280}]}
    ];
    const restaurantContainer=document.getElementById('restaurants');
    restaurants.forEach((r,i)=>{
        const card=document.createElement('div'); card.className='restaurant-card';
        card.innerHTML=`<h4>${r.name}</h4>`;
        r.menu.forEach(m=>{card.innerHTML+=`<div>${m.name} - ${m.price}฿</div>`;});
        const voteBtn=document.createElement('button'); voteBtn.textContent='โหวตร้านนี้'; voteBtn.className='glow-btn';
        voteBtn.addEventListener('click',()=>{if(!localStorage.getItem(`vote_restaurant_${i}`)){localStorage.setItem(`vote_restaurant_${i}`,true);alert(`โหวตร้าน ${r.name} เรียบร้อย!`);}else{alert('โหวตร้านนี้ไปแล้ว');}});
        card.appendChild(voteBtn);
        restaurantContainer.appendChild(card);
    });

    // Chat
    const chatBox=document.getElementById('chat-box'); const chatInput=document.getElementById('chat-input'); const chatSend=document.getElementById('chat-send');
    function loadChat(){const messages=JSON.parse(localStorage.getItem('chat')||'[]');chatBox.innerHTML='';messages.forEach(m=>{const div=document.createElement('div');div.textContent=m;chatBox.appendChild(div);});chatBox.scrollTop=chatBox.scrollHeight;}
    loadChat();
    chatSend.addEventListener('click',()=>{const msg=chatInput.value.trim();if(!msg)return;const messages=JSON.parse(localStorage.getItem('chat')||'[]');messages.push(`${player.name}: ${msg}`);localStorage.setItem('chat',JSON.stringify(messages));chatInput.value='';loadChat();});
}

// garden.html
if(document.getElementById('garden')){
    const garden=document.getElementById('garden');
    const players=JSON.parse(localStorage.getItem('players_reviews')||'[]');
    players.forEach(p=>{const div=document.createElement('div'); div.className='garden-avatar';
    div.innerHTML=`<div style="font-size:50px;background:${p.bg};border-radius:10px;">${p.emoji}</div><span>${p.name}: ${p.review}</span>`; garden.appendChild(div);});
}
