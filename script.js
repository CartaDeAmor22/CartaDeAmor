const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('nav');
menuBtn.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex'});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=900)nav.style.display='none'}));

const search=document.getElementById('qSearch'), cards=[...document.querySelectorAll('.q-card')];
search.addEventListener('input',e=>{
  const term=e.target.value.toLowerCase().trim();
  cards.forEach(card=>card.style.display=card.textContent.toLowerCase().includes(term)?'':'none');
});

const topBtn=document.getElementById('topBtn');
addEventListener('scroll',()=>topBtn.style.display=scrollY>500?'block':'none');
topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});

const sections=[...document.querySelectorAll('main section[id]')], links=[...document.querySelectorAll('nav a')];
addEventListener('scroll',()=>{
  const y=scrollY+120;
  let current='';
  sections.forEach(s=>{if(y>=s.offsetTop)current=s.id});
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
});
