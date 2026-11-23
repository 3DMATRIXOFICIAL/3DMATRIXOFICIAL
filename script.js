const WORKER_URL = "PEGA_AQUI_LA_URL_DE_TU_WORKER";
const form=document.getElementById('orderForm'),statusEl=document.getElementById('status');
form.addEventListener('submit',async e=>{
 e.preventDefault(); if(WORKER_URL.includes('PEGA_AQUI')){statusEl.textContent='La página aún necesita configurar el envío.';return;}
 const files=[...form.querySelector('[name="images"]').files]; if(files.length>3){statusEl.textContent='Adjunta como máximo 3 imágenes.';return;}
 if(files.some(f=>f.size>5*1024*1024)){statusEl.textContent='Cada imagen debe pesar 5 MB o menos.';return;}
 const data=new FormData(form); for(const f of files)data.append('images',f);
 const btn=form.querySelector('button');btn.disabled=true;statusEl.textContent='Enviando...';
 try{const r=await fetch(WORKER_URL,{method:'POST',body:data});if(!r.ok)throw Error();statusEl.textContent='Solicitud enviada. ¡Gracias!';form.reset();}
 catch{statusEl.textContent='No se pudo enviar. Inténtalo de nuevo más tarde.';}finally{btn.disabled=false;}
});
// Animated snowflakes
const canvas=document.getElementById('snow'),ctx=canvas.getContext('2d');let flakes=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;flakes=Array.from({length:Math.min(130,Math.floor(innerWidth/5))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:1+Math.random()*3.2,s:.4+Math.random()*1.6,w:Math.random()*1.3}))}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(255,255,255,.75)';for(const f of flakes){ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,Math.PI*2);ctx.fill();f.y+=f.s;f.x+=Math.sin(f.y*.008)*f.w;if(f.y>canvas.height+5){f.y=-5;f.x=Math.random()*canvas.width}}requestAnimationFrame(draw)}
addEventListener('resize',resize);resize();draw();
