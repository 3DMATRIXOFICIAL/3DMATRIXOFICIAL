export default {
 async fetch(request,env){
 const origin=request.headers.get("Origin")||"";
 const allowed=env.ALLOWED_ORIGIN;
 const headers={"Access-Control-Allow-Origin":allowed,"Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
 if(request.method==="OPTIONS")return new Response(null,{headers});
 if(origin!==allowed)return new Response("Forbidden",{status:403});
 if(request.method!=="POST")return new Response("Method not allowed",{status:405,headers});
 try{
 const form=await request.formData();
 if(form.get("website"))return new Response("OK",{headers});
 const name=String(form.get("name")||"").slice(0,100),phone=String(form.get("phone")||"").slice(0,40),description=String(form.get("description")||"").slice(0,1500);
 if(!name||!phone||!description)return new Response("Missing fields",{status:400,headers});
 const dimensions=String(form.get("dimensions")||"").slice(0,100),color=String(form.get("color")||"").slice(0,100);
 const files=form.getAll("images").filter(f=>f instanceof File&&f.size>0);
 if(files.length>3||files.some(f=>f.size>5*1024*1024)||files.reduce((a,f)=>a+f.size,0)>8*1024*1024)return new Response("Images too large",{status:400,headers});
 const allowedTypes=["image/jpeg","image/png","image/webp"];if(files.some(f=>!allowedTypes.includes(f.type)))return new Response("Unsupported image",{status:400,headers});
 const payload={content:"Nueva solicitud de presupuesto",embeds:[{title:"Solicitud · 3DMATRIX OFICIAL",color:0xA855F7,fields:[{name:"Nombre",value:name},{name:"Contacto",value:phone},{name:"Descripción",value:description},{name:"Medidas",value:dimensions||"No especificadas"},{name:"Color",value:color||"No especificado"}],timestamp:new Date().toISOString()}]};
 const fd=new FormData();fd.append("payload_json",JSON.stringify(payload));files.forEach((f,i)=>fd.append(`files[${i}]`,f,f.name));
 const resp=await fetch(env.DISCORD_WEBHOOK_URL,{method:"POST",body:fd});if(!resp.ok)throw new Error("Discord error");
 return new Response("OK",{status:200,headers});
 }catch(e){return new Response("Error",{status:500,headers});}
 }
};