// ดึงข้อมูล player จาก index.html หรือ park.html
let player = {
  name: '',
  emoji: '🧙‍♂️',
  bg: '#1e3c72',
  points: 0,
  votes: {},
  reviews: []
};

// หน้าแรก index.html
if(document.getElementById('welcome-screen')){
  const avatarInput = document.getElementById('avatar-emoji');
  const avatarBgInput = document.getElementById('avatar-bg');
  const avatarPreview = document.getElementById('avatar-preview');
  const startBtn = document.getElementById('start-btn');
  const nameInput = document.getElementById('player-name');

  function updateAvatarPreview(){
    avatarPreview.textContent = avatarInput.value || '🧙‍♂️';
    avatarPreview.style.backgroundColor = avatarBgInput.value;
  }

  avatarInput.addEventListener('input', updateAvatarPreview);
  avatarBgInput.addEventListener('input', updateAvatarPreview);

  startBtn.addEventListener('click', ()=>{
    const name = nameInput.value.trim();
    if(!name){ alert('กรุณาพิมพ์ชื่อผู้เล่น'); return; }
    player.name = name;
    player.emoji = avatarInput.value || '🧙‍♂️';
    player.bg = avatarBgInput.value;
    alert(`ยินดีต้อนรับ ${player.name}! เจ้าผู้กล้าแห่งทีม YumYum Network สู่โลกของ TastLink!`);
    // ส่งชื่อไป park.html
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'park.html';
  });
}

// หน้า park.html
if(document.getElementById('park-screen')){
  const stored = localStorage.getItem('player');
  if(stored) player = JSON.parse(stored);

  const avatarDisplay = document.getElementById('avatar-display');
  const nameDisplay = document.getElementById('player-name-display');
  const pointsDisplay = document.getElementById('player-points');
  avatarDisplay.textContent = player.emoji;
  avatarDisplay.style.backgroundColor = player.bg;
  nameDisplay.textContent = player.name;
  pointsDisplay.textContent = `คะแนน: ${player.points}`;

  // สร้างร้านค้า+เมนูอาหาร
  const shopList = document.querySelector('.shop-list');
  const shops = [
    {name:'ร้าน A', menus:[{name:'เมนู A1',price:50},{name:'เมนู A2',price:60},{name:'เมนู A3',price:70}]},
    {name:'ร้าน B', menus:[{name:'เมนู B1',price:55},{name:'เมนู B2',price:65},{name:'เมนู B3',price:75}]},
    {name:'ร้าน C', menus:[{name:'เมนู C1',price:40},{name:'เมนู C2',price:50},{name:'เมนู C3',price:60}]},
    {name:'ร้าน D', menus:[{name:'เมนู D1',price:45},{name:'เมนู D2',price:55},{name:'เมนู D3',price:65}]},
    {name:'ร้าน E', menus:[{name:'เมนู E1',price:70},{name:'เมนู E2',price:80},{name:'เมนู E3',price:90}]}
  ];

  shops.forEach((shop,si)=>{
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.innerHTML = `<h3>${shop.name}</h3>`;
    shop.menus.forEach((menu,mi)=>{
      const menuDiv = document.createElement('div');
      menuDiv.className='menu-item';
      menuDiv.innerHTML = `${menu.name} - ${menu.price} บาท <button class="glow-button vote-btn" data-shop="${si}" data-menu="${mi}">โหวต</button>`;
      div.appendChild(menuDiv);
    });
    shopList.appendChild(div);
  });

  // vote logic
  document.querySelectorAll('.vote-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const si = btn.dataset.shop;
      const mi = btn.dataset.menu;
      const keyShop = `shop-${si}`;
      const keyMenu = `shop-${si}-menu-${mi}`;
      if(player.votes[keyShop] && player.votes[keyMenu]){
        alert('คุณโหวตแล้วร้านนี้และเมนูนี้');
        return;
      }
      player.votes[keyShop]=true;
      player.votes[keyMenu]=true;
      player.points += 10;
      pointsDisplay.textContent = `คะแนน: ${player.points}`;
      // update avatar in garden
      const garden = document.getElementById('garden-display');
      const reviewDiv = document.createElement('div');
      reviewDiv.className='player-review';
      reviewDiv.innerHTML = `<div style="font-size:50px; background:${player.bg}">${player.emoji}</div><span>ชอบ ${shops[si].menus[mi].name} ที่ร้าน ${shops[si].name}</span>`;
      garden.appendChild(reviewDiv);
      // save back
      localStorage.setItem('player', JSON.stringify(player));
    });
  });
}
