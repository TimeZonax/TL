function buttonEffect(button){
    button.classList.add('active');
    setTimeout(()=> button.classList.remove('active'),200);
}

document.querySelectorAll('.glow-button').forEach(btn=>{
    btn.addEventListener('click', ()=> buttonEffect(btn));
});
