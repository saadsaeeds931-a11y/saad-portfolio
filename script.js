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

/* ── Filter ── */
function fPr(cat,btn){
  document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  document.querySelectorAll('.pc').forEach(c=>{c.style.display=(cat==='all'||c.dataset.cat===cat)?'block':'none'});
}

/* ── Mobile menu ── */
function openMob(){document.getElementById('mob').classList.add('open')}
function closeMob(){document.getElementById('mob').classList.remove('open')}
document.getElementById('mbc').onclick=closeMob;

/* ── Form submit ── */
function hSub(e){e.preventDefault();const b=e.target;b.textContent='Sending...';setTimeout(()=>{b.textContent='Message Sent! ✓';b.style.background='linear-gradient(135deg,#10B981,#059669)'},1400)}
