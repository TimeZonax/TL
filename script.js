{"id":"78021","variant":"standard"}
const urlParams = new URLSearchParams(window.location.search);
let playerName = urlParams.get('player') || localStorage.getItem('playerName') || 'นักผจญภัย';
let avatarEmoji = localStorage.getItem('avatarEmoji') || '🧙‍♂️';
let avatarBg = localStorage.getItem('avatarBg') || '#1e3c72';
let points = 0;
let votes = {}; 

// Dynamic background (day/night)
function updateBackground(){
  const hour = new Date().getHours();
  if(hour>=6 && hour<18){
    document.body.style.background='linear-gradient(to bottom, #1e3c72, #4facfe)';
  }else{
    document.body.style.background='linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
  }
}
updateBackground();
setInterval(updateBackground, 60000);

// หน้า park.html
const profileDisplay = document.getElementById('player-display');
const avatarDisplay = document.getElementById('avatar-display');
const pointsDisplay = document.getElementById('points-display');

if(profileDisplay) profileDisplay.textContent = playerName;
if(avatarDisplay){
  avatarDisplay.textContent = avatarEmoji;
  avatarDisplay.style.backgroundColor = avatarBg;
}
if(pointsDisplay) pointsDisplay.textContent = 'คะแนน: '+points;

// ระบบโหวต ร้าน + เมนู
document.querySelectorAll('.shop-card').forEach(shop=>{
  let shopName = shop.dataset.shop;
  votes[shopName] = {shop:0, menu:{}};

  shop.querySelectorAll('.vote-shop').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(votes[shopName].shop>=1){ alert('โหวตร้านนี้ครบแล้ว'); return;}
      votes[shopName].shop++;
      points+=10;
      pointsDisplay.textContent = 'คะแนน: '+points;
      addReview(`โหวตร้าน ${shopName}`);
      animateAvatarToGarden(shopName);
      updateLeaderboard(shopName);
    });
  });
  shop.querySelectorAll('.vote-menu').forEach(btn=>{
    btn.addEventListener('click', e=>{
      let menuItem = e.target.parentElement.dataset.menu;
      if(!votes[shopName].menu[menuItem]) votes[shopName].menu[menuItem]=0;
      if(votes[shopName].menu[menuItem]>=1){ alert('โหวตเมนูนี้ครบแล้ว'); return;}
      votes[shopName].menu[menuItem]++;
      points+=5;
      pointsDisplay.textContent = 'คะแนน: '+points;
      addReview(`โหวตเมนู ${menuItem} ของร้าน ${shopName}`);
      animateAvatarToGarden(menuItem);
    });
  });
});

// รีวิว + community feed
function addReview(text){
  const feed = document.getElementById('community-feed');
  if(!feed) return;
  const div = document.createElement('div');
  div.classList.add('player-review');
  div.textContent = avatarEmoji + ' ' + playerName + ': ' + text;
  feed.prepend(div);

  // Particle flying animation
  div.style.position='absolute';
  div.style.left='50%';
  div.style.top='50%';
  div.style.transform='translate(-50%, -50%)';
  div.style.opacity='0';
  setTimeout(()=>{ div.style.transition='all 1s ease'; div.style.top='0'; div.style.opacity='1'; div.style.position='relative'; },50);
}

// leaderboard mock
let ranking = {};
function updateLeaderboard(shopName){
  if(!ranking[shopName]) ranking[shopName]=0;
  ranking[shopName]++;
  const ul = document.getElementById('ranking-list');
  ul.innerHTML='';
  Object.entries(ranking).sort((a,b)=>b[1]-a[1]).forEach(([name,score])=>{
    const li = document.createElement('li');
    li.textContent = `${name} - ${score} ดาว`;
    ul.appendChild(li);
  });
}

// Weekly event
const weeklyVoteBtn = document.getElementById('vote-weekly');
if(weeklyVoteBtn){
  weeklyVoteBtn.addEventListener('click', ()=>{
    const shop = document.getElementById('weekly-shop').value;
    points+=20;
    pointsDisplay.textContent='คะแนน: '+points;
    addReview(`โหวตร้านสัปดาห์หน้า: ${shop}`);
    alert(`ขอบคุณที่โหวตร้านสัปดาห์หน้า: ${shop}`);
  });
}

function animateAvatarToGarden(text){
  console.log(`${avatarEmoji} ${playerName} แสดงข้อความในสวน: ${text}`);
  // Future: สามารถอัปเกรดเป็น flying avatar particle จริง
}
