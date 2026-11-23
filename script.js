const form = document.getElementById("orderForm");
const statusBox = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const photosInput = document.getElementById("photos");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusBox.className = "status";
  statusBox.textContent = "";

  const webhook = window.DISCORD_WEBHOOK_URL;
  if (!webhook || webhook.includes("PEGA_AQUI")) {
    statusBox.classList.add("err");
    statusBox.textContent = "Falta configurar el webhook de Discord.";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const description = document.getElementById("description").value.trim();
  const dimensions = document.getElementById("dimensions").value.trim();
  const color = document.getElementById("color").value.trim();
  const files = Array.from(photosInput.files || []);

  if (!name || !phone || !description) {
    statusBox.classList.add("err");
    statusBox.textContent = "El nombre, el teléfono y la descripción son obligatorios.";
    return;
  }
  if (files.length > 3) {
    statusBox.classList.add("err");
    statusBox.textContent = "Puedes adjuntar como máximo 3 fotografías.";
    return;
  }
  if (files.some(file => !file.type.startsWith("image/"))) {
    statusBox.classList.add("err");
    statusBox.textContent = "Adjunta únicamente imágenes.";
    return;
  }
  if (files.some(file => file.size > 8 * 1024 * 1024)) {
    statusBox.classList.add("err");
    statusBox.textContent = "Cada imagen debe ocupar como máximo 8 MB.";
    return;
  }

  const fields = [
    { name: "Nombre", value: name },
    { name: "Teléfono", value: phone },
    { name: "Descripción", value: description },
    { name: "Medidas", value: dimensions || "No indicadas" },
    { name: "Color", value: color || "No indicado" },
    { name: "Fotografías", value: files.length ? `${files.length} imagen(es) adjunta(s)` : "No adjuntas" }
  ];

  const payload = {
    username: "3DMATRIX OFICIAL · Pedidos",
    embeds: [{
      title: "🆕 NUEVO PEDIDO",
      color: 10181046,
      fields: fields.map(f => ({ name: f.name, value: f.value.slice(0, 1024), inline: false })),
      footer: { text: "Solicitud enviada desde la web de 3DMATRIX OFICIAL" },
      timestamp: new Date().toISOString()
    }]
  };

  const body = new FormData();
  body.append("payload_json", JSON.stringify(payload));
  files.forEach((file, index) => body.append(`files[${index}]`, file, file.name));

  submitBtn.disabled = true;
  submitBtn.textContent = "ENVIANDO...";
  try {
    const response = await fetch(webhook + "?wait=true", { method: "POST", body });
    if (!response.ok) throw new Error(`Discord respondió ${response.status}`);
    form.reset();
    statusBox.classList.add("ok");
    statusBox.textContent = "¡Pedido enviado correctamente! Nos pondremos en contacto contigo.";
  } catch (error) {
    console.error(error);
    statusBox.classList.add("err");
    statusBox.textContent = "No se pudo confirmar el envío. Inténtalo de nuevo más tarde.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "ENVIAR PEDIDO";
  }
});

// Efecto nieve ligero
(() => {
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  let w, h, flakes = [];
  function resize() {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    w = window.innerWidth; h = window.innerHeight;
    flakes = Array.from({length: Math.min(90, Math.floor(w / 10))}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + .6, s: Math.random() * 1.1 + .35,
      drift: Math.random() * .7 - .35
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,.75)";
    flakes.forEach(f => {
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      f.y += f.s; f.x += f.drift;
      if (f.y > h + 5) { f.y = -5; f.x = Math.random() * w; }
      if (f.x < -5) f.x = w + 5;
      if (f.x > w + 5) f.x = -5;
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  resize(); draw();
})();


// Mostrar u ocultar el reproductor de YouTube. No inicia sonido automáticamente.
(() => {
  const toggle = document.getElementById("musicToggle");
  const frame = document.getElementById("youtubeFrame");
  if (!toggle || !frame) return;
  toggle.addEventListener("click", () => {
    const opening = frame.hidden;
    frame.hidden = !opening;
    toggle.textContent = opening ? "OCULTAR" : "MÚSICA";
    toggle.setAttribute("aria-expanded", String(opening));
  });
})();
