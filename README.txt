3DMATRIX OFICIAL - FORMULARIO, LOGO, MÚSICA Y ENVÍO A DISCORD

ARCHIVOS:
- index.html: formulario
- style.css: diseño morado y nieve
- script.js: validación y envío del pedido
- config.js: configuración del webhook
- logo.jpg: logotipo original de 3DMATRIX OFICIAL

IMPORTANTE SOBRE EL WEBHOOK:
El webhook que se compartió en el chat debe considerarse comprometido. Elimínalo
en Discord y crea uno nuevo antes de publicar. No reutilices el anterior.

CONFIGURACIÓN:
1. Abre config.js.
2. Sustituye PEGA_AQUI_TU_WEBHOOK_NUEVO por la URL del webhook NUEVO.
3. Sube todos los archivos a la raíz del repositorio de GitHub Pages.
4. Espera a que GitHub Pages publique los cambios y prueba un pedido.

CAMPOS:
Obligatorios: nombre, teléfono y descripción.
Opcionales: medidas, color y hasta 3 fotografías (máximo 8 MB cada una).

LIMITACIÓN Y SEGURIDAD:
GitHub Pages es estático. La URL del webhook incluida en config.js será pública
para quien inspeccione el sitio. Aunque se haya pedido el envío directo, esto
permite que terceros puedan usar el webhook. Para ocultarlo se necesita un
intermediario de servidor (por ejemplo, Cloudflare Worker). También puede haber
restricciones CORS del endpoint de Discord en el navegador; si el envío falla
con un error de red/CORS, no se soluciona cambiando los campos del formulario:
habrá que usar un intermediario seguro.

PRIVACIDAD:
Antes de publicar, añade una política de privacidad adecuada y asegúrate de tener
una base legítima para recoger y tratar los teléfonos y mensajes de los clientes.
No solicites datos innecesarios.


REPRODUCTOR DE YOUTUBE:
La web incluye un reproductor plegable para el vídeo facilitado por el propietario.
La reproducción no comienza automáticamente: el visitante pulsa play en YouTube.
El reproductor está configurado con loop=1 y playlist=el mismo ID, que es el
parámetro requerido por YouTube para repetir un vídeo individual. La repetición
puede depender de restricciones, disponibilidad, edad o derechos del vídeo.
