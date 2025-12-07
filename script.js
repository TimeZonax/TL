// ... โค้ดเดิม (Ranking, Chat, updateShopStatuses) ...

// --- [Avatar Customization Logic] ---
let currentAvatarLook = 'default';

/**
 * ฟังก์ชันเปิด Modal แต่งตัว เมื่อคลิกอวาตาร์
 */
document.querySelector('.avatar-display').addEventListener('click', () => {
    document.getElementById('avatar-modal').style.display = 'block';
    // อัปเดต Preview ให้ตรงกับสถานะปัจจุบัน
    document.getElementById('custom-avatar-display').style.background = currentAvatarLook;
});

/**
 * ฟังก์ชันปิด Modal
 */
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

/**
 * ฟังก์ชันจำลองการเปลี่ยนรูปลักษณ์อวาตาร์
 * @param {string} lookType 
 */
function changeAvatarLook(lookType) {
    const avatarDisplay = document.getElementById('custom-avatar-display');
    const headerAvatar = document.querySelector('.avatar-display');

    if (lookType === 'blue') {
        // จำลองการเปลี่ยนสี/สไตล์ (Blue Hat)
        currentAvatarLook = 'linear-gradient(135deg, #3498db, #2980b9)';
    } else if (lookType === 'green') {
        // จำลองการเปลี่ยนสี/สไตล์ (Green Hair)
        currentAvatarLook = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    }
    
    // อัปเดต Preview ทันที
    avatarDisplay.style.background = currentAvatarLook;
}

/**
 * ฟังก์ชันจำลองการบันทึกการแต่งตัว
 */
function saveAvatar() {
    // นำการตั้งค่าไปใช้กับอวาตาร์ใน Header
    document.querySelector('.avatar-display').style.background = currentAvatarLook;
    closeModal('avatar-modal');
    showXPEffect("+10 XP! (แต่งตัว)"); // ได้ XP จากการแต่งตัว!
}

// --- [Real-time Alert Logic] ---

/**
 * ฟังก์ชันจำลองการแจ้งเตือนฉุกเฉิน (The WOW Moment)
 */
function triggerShopAlert(shopName, reason) {
    const alertModal = document.getElementById('alert-modal');
    document.getElementById('alert-message').textContent = `ร้าน ${shopName} ${reason}! กรุณาเลือกซื้อร้านอื่นแทน`;
    alertModal.style.display = 'block';
    
    // หากต้องการให้เด่นกว่าเดิม ให้เพิ่มลูกเล่น
    alertModal.classList.add('pulse-alert'); 
}

// เพิ่มการเรียกใช้ Alert หลังผ่านไป 15 วินาที
document.addEventListener('DOMContentLoaded', () => {
    // ... โค้ดเดิม ...
    setTimeout(() => {
        triggerShopAlert("ร้านก๋วยเตี๋ยวเรือเทพ", "ปิดทำการกะทันหัน (วัตถุดิบหมด)");
    }, 15000); // จะเด้ง Alert ขึ้นมาหลังเข้าหน้าเว็บ 15 วินาที
});
