# 3DMATRIX OFICIAL

Website statico de solicitudes de presupuestos con logo y nieve animada.

1. Sube todos estos archivos a un repositorio GitHub.
2. En GitHub Pages, activa Pages desde la rama principal y carpeta raíz.
3. Despliega `worker.js` como Worker en Cloudflare.
4. En el Worker configura los secrets/variables `DISCORD_WEBHOOK_URL` (secret) y `ALLOWED_ORIGIN` (p.ej. `https://usuario.github.io`, solo origen, sin ruta).
5. Copia la URL del Worker y reemplaza `PEGA_AQUI_LA_URL_DE_TU_WORKER` en `script.js`.
6. Revisa y completa `privacy.html` antes de publicar.

No publiques la URL del webhook de Discord en GitHub. Este ejemplo no incluye CAPTCHA ni limitación avanzada de solicitudes; considera añadir protección anti-spam.
