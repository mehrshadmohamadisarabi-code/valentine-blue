const messages = [
  "هر لحظه با تو، مثل یک قطعهٔ لگوست ❤️",
  "با تو هر روز، یه ساختنی جدید و دل‌چسبه. ولنتاین مبارک! 🌹",
  "تو همون قطعه‌ای که منو کامل می‌کنه. همیشه کنارت می‌مونم 💫",
  "عشق من، تو مثل لبخند یه فیگور لگویی 😘",
  "با تو بودن یعنی ساختنِ خاطرات؛ از امروز تا همیشه با هم می‌سازیم 💕"
];

const card = document.getElementById("valentineCard");
const messageEl = document.getElementById("valentineMessage");
const newBtn = document.getElementById("newBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const heartsContainer = document.getElementById("heartsContainer");

const figures = Array.from(document.querySelectorAll(".figure"));

function randInt(max){return Math.floor(Math.random()*max)}

function showRandomMessage(anim = true){
  const idx = randInt(messages.length);
  if(anim){
    messageEl.classList.add("fade-out");
    setTimeout(()=>{
      messageEl.textContent = messages[idx];
      messageEl.classList.remove("fade-out");
      messageEl.classList.add("fade-in");
      setTimeout(()=> messageEl.classList.remove("fade-in"),360);
    },220);
  } else messageEl.textContent = messages[idx];
  figures.forEach((f,i)=>{
    f.classList.remove("glow");
    setTimeout(()=> f.classList.add("glow"),60+i*60);
    setTimeout(()=> f.classList.remove("glow"),1100);
  });
  spawnHearts(8);
}

function spawnHearts(count=6){
  for(let i=0;i<count;i++){
    const heart=document.createElement("div");
    heart.className="heart";
    const size=12+Math.random()*28;
    heart.style.width=`${size}px`;
    heart.style.height=`${size}px`;
    heart.style.position="absolute";
    heart.style.left=`${Math.random()*100}%`;
    heart.style.top=`${100+Math.random()*20}vh`;
    heart.style.transform=`translateX(-50%)`;
    heart.style.pointerEvents="none";
    heart.innerHTML=`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s-6.716-4.36-9.176-7.02C-0.58 11.025 1.09 6 5.5 6 8.02 6 9.5 7.9 12 9.2 14.5 7.9 16 6 18.5 6c4.41 0 6.08 5.025 2.676 7.98C18.716 16.64 12 21 12 21z" fill="${getRandomAccent()}" />
    </svg>`;
    heartsContainer.appendChild(heart);
    const duration=2200+Math.random()*1600;
    heart.animate([{ transform:`translateY(0) scale(${0.7+Math.random()*0.5}) rotate(0)`, opacity:1 },
      { transform:`translateY(-140vh) scale(${1.0+Math.random()*0.6}) rotate(${120+Math.random()*220}deg)`, opacity:0 }],{
        duration,easing:"cubic-bezier(.2,.8,.2,1)",iterations:1,delay:Math.random()*240
    }).onfinish=()=>heart.remove();
  }
}

function getRandomAccent(){return ["#00bcd4","#26c6da","#4dd0e1","#00acc1","#00e5ff"][randInt(5)]}

newBtn.addEventListener("click",()=>{
  showRandomMessage(true);
  if(Math.random()<0.45){
    const parent=figures[0].parentElement;
    parent.insertBefore(figures[1],figures[0]);
    setTimeout(()=> parent.insertBefore(figures[0],figures[1]),800);
  }
});

surpriseBtn.addEventListener("click",async ()=>{
  const url=location.href;
  try{
    await navigator.clipboard.writeText(url);
    surpriseBtn.textContent="لینک کپی شد ✅ — بفرست!";
    setTimeout(()=> surpriseBtn.textContent="ارسال برای اون (کپی لینک)",1600);
  }catch(e){
    surpriseBtn.textContent="کپی ناموفق — لطفا دستی کپی کن";
    setTimeout(()=> surpriseBtn.textContent="ارسال برای اون (کپی لینک)",1600);
  }
});

showRandomMessage(false);
