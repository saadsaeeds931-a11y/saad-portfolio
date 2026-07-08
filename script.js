/* ── Nav scroll ── */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('sc',scrollY>50);
  const secs=['hero','about','services','projects','skills','process','why','testimonials','faq','contact'];
  let cur='';
  secs.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=90)cur=id});
  document.querySelectorAll('.nm a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

/* ── Smooth scroll ── */
function sTo(e,id){e.preventDefault();const el=document.getElementById(id);if(!el)return;window.scrollTo({top:el.getBoundingClientRect().top+scrollY-70,behavior:'smooth'})}

/* ── Typed ── */
const roles=['Elementor Expert','WooCommerce Developer','Web Performance Expert','WordPress Developer'];
let ri=0,ci=0,del=false;
const tEl=document.getElementById('typed');
function typeIt(){
  tEl.textContent=roles[ri].substring(0,ci);
  if(!del){ci<roles[ri].length?setTimeout(()=>{ci++;typeIt()},75):(del=true,setTimeout(typeIt,2000))}
  else{ci>0?setTimeout(()=>{ci--;typeIt()},38):(del=false,ri=(ri+1)%roles.length,setTimeout(typeIt,260))}
}
typeIt();

/* ── Counters ── */
function runCnt(el){const t=+el.dataset.t,dur=1800;let v=0;const s=dur/t;const i=setInterval(()=>{v=Math.min(v+1,t);el.textContent=v;if(v>=t)clearInterval(i)},s)}

/* ── Reveal ── */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('vis');
      e.target.querySelectorAll('.cnt').forEach(runCnt);
      e.target.querySelectorAll('.sk-bar-fill').forEach(b=>{b.style.width=b.dataset.w+'%'});
    }
  });
},{threshold:.12});
document.querySelectorAll('.rv,.rl,.rr').forEach(el=>ro.observe(el));

/* ── FAQ ── */
function tFaq(el){const it=el.parentElement,was=it.classList.contains('open');document.querySelectorAll('.fi.open').forEach(f=>f.classList.remove('open'));if(!was)it.classList.add('open')}

/* ── Slider ── */
let tIdx=0;
function slT(d){
  const cards=document.querySelectorAll('.tc');
  const pv=window.innerWidth<768?1:3;
  tIdx=Math.max(0,Math.min(tIdx+d,cards.length-pv));
  const trk=document.getElementById('tTrk');
  trk.style.transform=`translateX(-${tIdx*(trk.querySelector('.tc').offsetWidth+20)}px)`;
}

/* ── Mobile menu ── */
function openMob(){document.getElementById('mob').classList.add('open')}
function closeMob(){document.getElementById('mob').classList.remove('open')}
document.getElementById('mbc').onclick=closeMob;

/* ── Form submit ── */
function hSub(e){
  e.preventDefault();
  const form=document.getElementById('cf-form');
  const btn=document.getElementById('bsub');
  const origText=btn.textContent;
  const origBg=btn.style.background;
  btn.textContent='Sending...';
  btn.disabled=true;

  fetch('https://formsubmit.co/ajax/saadrajpoot6543@gmail.com',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify(Object.fromEntries(new FormData(form)))
  })
  .then(res=>res.json())
  .then(()=>{
    btn.textContent='Message Sent! ✓';
    btn.style.background='linear-gradient(135deg,#10B981,#059669)';
    form.reset();
    setTimeout(()=>{btn.textContent=origText;btn.style.background=origBg;btn.disabled=false;},4000);
  })
  .catch(()=>{
    btn.textContent='Failed — Try Again';
    btn.style.background='linear-gradient(135deg,#EF4444,#DC2626)';
    setTimeout(()=>{btn.textContent=origText;btn.style.background=origBg;btn.disabled=false;},3500);
  });
}
document.getElementById('cf-form')?.addEventListener('submit',hSub);
