# Confirmaciones en Google Sheets

Estado: código y manifiesto guardados en el proyecto de Google Apps Script. La versión 1 está implementada como aplicación web con acceso para cualquier usuario.

URL activa: `https://script.google.com/macros/s/AKfycbz2hnCIPY1WkwqNxsvY-NdHtyVXKmaZPPBHEYJReLPuhYSU4DH7NcMd8_gJyZ_IoPmg/exec`

Proyecto existente: https://script.google.com/home/projects/1WKeWnFeTbFP_z2n6Jah3YcUx7Jy53bwk5fTIuC6pLaRW7qnmAN7liIEY/edit

Para continuar, reutiliza este proyecto (no crees otro). El propietario ya autorizó en la conversación el alcance de Google Sheets; falta completar el consentimiento en Google. El botón no abrió una ventana controlable desde el navegador integrado, por lo que se dejó pendiente para el usuario.

## Nueva implementación o actualización

1. Abre la hoja `https://docs.google.com/spreadsheets/d/1ogqNS8Zvr41IcYi4Rwm2t_s1MlrmgO_rZFcVCFc8-YM/edit` con tu cuenta.
2. En **Extensiones → Apps Script**, pega el contenido de `Code.gs` en el editor y guarda el proyecto como `Confirmaciones Ángel y Karmin`.
3. En Configuración del proyecto, activa la visualización del manifiesto `appsscript.json` y usa el archivo incluido. El único permiso solicitado es Google Sheets; el código utiliza únicamente la hoja indicada.
4. Selecciona **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: **tu cuenta**. Acceso: **Cualquier persona** para que los invitados no tengan que iniciar sesión. Autoriza el script con tu cuenta cuando Google lo solicite. Esto publica un receptor de respuestas, no una vista de los invitados; no cambies la visibilidad de la hoja.
5. Copia la URL terminada en `/exec` a `rsvpEndpoint` en `../config.js` si cambia la implementación.
6. Prueba en el navegador una respuesta identificada claramente como prueba. Verifica las cinco celdas en la hoja y el botón de WhatsApp antes de publicar la actualización del sitio. Borra manualmente la fila de prueba cuando termines.

## Funcionamiento

Una respuesta escribe una fila con los cinco encabezados existentes, sin agregar columnas. El script busca la pestaña por esos encabezados, por lo que puede renombrarse sin romper la conexión.

- `Sí, asistiré`: estado `Confirmado` y entre 1 y los cupos permitidos.
- `No podré asistir`: estado `No asistirá` y cero personas confirmadas.
- Cupos: límite del enlace `/1/` a `/5/`; en la ruta general el límite es cinco.
- Los reintentos de la misma respuesta desde la misma pestaña reutilizan un comprobante guardado en una nota de la celda A. No aparece una columna de IDs.
- Primero se verifica el guardado y después se ofrece enviar el mensaje por WhatsApp. En caso de error se permite reintentar y se conserva WhatsApp como alternativa; no se informa falsamente que la hoja se actualizó.
- `En espera` no se genera para quienes no han respondido, porque el formulario no conoce la lista de invitados enviados.

El enlace con cupos no autentica una invitación individual. El receptor valida cantidades, evita fórmulas en textos y serializa escrituras simultáneas. No permite consultar las respuestas mediante GET. El campo señuelo reduce envíos automatizados básicos; no sustituye una autenticación o un servicio contra abuso.

Una respuesta modificada es una nueva respuesta. Si alguien cambia su decisión o envía desde otro dispositivo, los novios deben conciliar las filas; no se combinan automáticamente nombres de familias que podrían coincidir.

## Verificación local

`node weddingangelandkarmin/validate.cjs`

`node weddingangelandkarmin/backend/validate.cjs`

Las pruebas locales usan servicios simulados y no escriben en la hoja real. La autorización y el despliegue inicial se completaron el 8 de septiembre de 2026. Una escritura real debe comprobarse después de cada cambio del receptor.

Documentación: https://developers.google.com/apps-script/guides/web
