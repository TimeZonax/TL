// ---------- หน้า index.html ----------
if(document.getElementById('avatar-emoji')){
  const avatarInput = document.getElementById('avatar-emoji');
  const avatarBgInput = document.getElementById('avatar-bg');
  const avatarPreview = document.getElementById('avatar-preview');
  const startBtn = document.getElementById('start-btn');

  function updateAvatarPreview(){
    avatarPreview.textContent = avatarInput.value || '🧙‍♂️';
    avatarPreview.style.backgroundColor = avatarBgInput.value;
  }
  avatarInput.addEventListener('input', updateAvatarPreview);
  avatarBgInput.addEventListener('input', updateAvatarPreview);

  startBtn.addEventListener('click', ()=>{
    const name = document.getElementById('player-name').value.trim();
    if(!name){ alert('กรุณาพิมพ์ชื่อผู้เล่น'); return; }
    startBtn.classList.add('active');
    setTimeout(()=> startBtn.classList.remove('active'), 300);
    setTimeout(()=>{
      // ส่ง avatar + bg ผ่าน query param
      const emoji = avatarInput.value || '🧙‍♂️';
      const bg = avatarBgInput.value;
      window.location.href = `park.html?player=${encodeURIComponent(name)}&emoji=${encodeURIComponent(emoji)}&bg=${encodeURIComponent(bg)}`;
    },400);
  });
}

// ---------- หน้า park.html ----------
if(document.getElementById('park-screen')){
  const urlParams = new URLSearchParams(window.location.search);
  const playerName = urlParams.get('player') || 'นักผจญภัย';
  const playerEmoji = urlParams.get('emoji') || '🧙‍♂️';
  const playerBg = urlParams.get('bg') || '#1e3c72';

  const playerAvatar = document.getElementById('player-avatar');
  const playerNameDisplay = document.getElementById('player-name-display');
  playerAvatar.textContent = playerEmoji;
  playerAvatar.style.backgroundColor = playerBg;
  playerNameDisplay.textContent = playerName;

  // ตัวอย่างร้านอาหาร
  const shops = [
    {name:'ร้านน้ำเต้าหู้', menus:[{name:'เต้าฮวย',price:25},{name:'น้ำเต้าหู้',price:20},{name:'ปาท่องโก๋',price:15}]},
    {name:'ร้านไก่ทอด', menus:[{name:'ไก่ทอด',price:35},{name:'ซุปไก่',price:30},{name:'น้ำจิ้ม',price:10}]},
    {name:'ร้านบะหมี่', menus:[{name:'บะหมี่หมูแดง',price:40},{name:'เกี๊ยว',price:30},{name:'น้ำซุป',price:15}]},
    {name:'ร้านชา', menus:[{name:'ชาเย็น',price:25},{name:'ชาเขียว',price:30},{name:'ขนมปัง',price:15}]},
    {name:'ร้านผลไม้', menus:[{name:'ส้ม',price:15},{name:'มะม่วง',price:25},{name:'แอปเปิ้ล',price:20}]},
  ];

  const shopsContainer = document.getElementById('shops-container');

  shops.forEach(shop=>{
    const shopDiv = document.createElement('div');
    shopDiv.className='shop';
    shopDiv.innerHTML=`<span>${shop.name}</span>`;
    shop.menus.forEach(menu=>{
      const menuDiv = document.createElement('div');
      menuDiv.className='menu-item';
      menuDiv.textContent = `${menu.name} - ${menu.price}฿`;
      menuDiv.addEventListener('click', ()=>{
        alert(`โหวตให้ ${shop.name} เมนู ${menu.name}`);
        // เพิ่มคะแนน, อวาตาร์ในสวน, etc.
      });
      shopDiv.appendChild(menuDiv);
    });
    shopsContainer.appendChild(shopDiv);
  });

  // ปุ่มรีเฟรชสวน
  document.getElementById('refresh-btn').addEventListener('click', ()=>{
    alert('สวนได้รับการรีเฟรช! อวาตาร์เพื่อนๆและรีวิวใหม่จะปรากฏ');
  });
}
