# Pig App · Guía para publicarla e instalarla

Tiempo total: unos 40 minutos, una sola vez. Hazlo desde un computador.
Donde diga `TUUSUARIO`, pon tu nombre de usuario de GitHub.

---

## 1. Publicar la app en GitHub Pages (gratis)

1. Crea una cuenta en https://github.com (si no tienes).
2. Arriba a la derecha: **+ → New repository**.
   - **Repository name:** `TUUSUARIO.github.io` (exactamente así, con tu usuario).
   - Marca **Public** y toca **Create repository**.
3. En el repositorio nuevo toca **uploading an existing file**.
   - Descomprime `PigApp.zip` en tu computador.
   - Arrastra **todo** lo que trae: `index.html`, `config.js`, `manifest.webmanifest`, `sw.js`, `GUIA.md` y la carpeta `icons`.
   - Toca **Commit changes**.
4. Crea el archivo `.nojekyll` (Windows lo esconde al arrastrar):
   **Add file → Create new file**, nombre `.nojekyll`, déjalo vacío y toca **Commit changes**.
5. Ve a **Settings → Pages**. En **Source** elige **Deploy from a branch**, rama **main**, carpeta **/(root)** y toca **Save**.
6. Espera 1 o 2 minutos. Tu app queda en: `https://TUUSUARIO.github.io/`

---

## 2. Permisos de inicio de sesión

Puedes configurar **Google** (datos en una hoja de Google Drive), **Microsoft** (datos en un Excel de OneDrive) o **los dos**.
Cada usuario escoge con qué cuenta entrar. Ojo: una granja vive en un solo lado; los trabajadores deben entrar con el mismo tipo de cuenta que el dueño de esa granja.

### 2A. Google (Gmail → Google Sheets en Drive)

1. Entra a https://console.cloud.google.com con tu Gmail.
2. Arriba, en el selector de proyectos: **Proyecto nuevo**, nombre `Pig App`, **Crear**, y selecciónalo.
3. Menú **APIs y servicios → Biblioteca**. Busca y **habilita** las dos:
   - **Google Sheets API**
   - **Google Drive API**
4. Menú **APIs y servicios → Pantalla de consentimiento de OAuth** (o **Google Auth Platform**):
   - Tipo de usuario: **Externo**.
   - Nombre de la app: `Pig App`. Correo de asistencia y de contacto: tu Gmail.
   - En **Público / Usuarios de prueba**, agrega tu Gmail y el de cada trabajador.
     (Mientras la app esté "en prueba", solo esos correos pueden entrar; caben hasta 100.)
5. Menú **Credenciales → Crear credenciales → ID de cliente de OAuth**:
   - Tipo de aplicación: **Aplicación web**. Nombre: `Pig App`.
   - En **Orígenes autorizados de JavaScript** agrega: `https://TUUSUARIO.github.io`
   - Toca **Crear** y copia el **ID de cliente** (termina en `.apps.googleusercontent.com`).
6. Vuelve a GitHub, abre `config.js`, toca el lápiz ✏️, reemplaza `PEGA_AQUI_TU_CLIENT_ID.apps.googleusercontent.com` por tu ID y toca **Commit changes**.

### 2B. Microsoft (Outlook/Hotmail → Excel en OneDrive)

1. Entra a https://entra.microsoft.com (o https://portal.azure.com) con tu cuenta de Microsoft.
   Si te pide crear un directorio o suscripción gratuita, acéptalo; no tiene costo.
2. Ve a **Aplicaciones → Registros de aplicaciones → Nuevo registro**.
   - Nombre: `Pig App`.
   - Tipos de cuenta: **Cuentas de cualquier directorio organizativo y cuentas personales de Microsoft** (la última opción con cuentas personales).
   - URI de redirección: elige **Aplicación de página única (SPA)** y escribe `https://TUUSUARIO.github.io/`
   - Toca **Registrar**.
3. Copia el **Id. de aplicación (cliente)**.
4. En **Permisos de API → Agregar un permiso → Microsoft Graph → Permisos delegados**, marca `User.Read` y `Files.ReadWrite.All` y toca **Agregar permisos**.
5. En GitHub, abre `config.js`, toca ✏️ y reemplaza `PEGA_AQUI_TU_ID_DE_MICROSOFT` por ese Id. Toca **Commit changes**.

La base queda en **OneDrive → carpeta Pig App → "Pig App - Base de datos.xlsx"**. Al abrirlo verás las hojas Cerdas, Ciclos, Lotes, Registros, Alimento e Indicadores, que se actualizan solas en cada sincronización.
No edites las hojas que empiezan con guion bajo (`_cerdas`, `_ciclos`…): son la base de la app.
Si tienes el Excel abierto en el computador mientras el celular sincroniza, la app avisa "El Excel está abierto"; ciérralo y toca sincronizar.

### Aviso de app no verificada

Al entrar la primera vez, Google puede decir **"Google no verificó esta app"**. Es normal porque la app es tuya y no está publicada para el público: toca **Avanzado → Ir a Pig App** y acepta los permisos.

---

## 3. Primer uso

1. En el celular abre `https://TUUSUARIO.github.io/` en **Chrome**.
2. Toca **Entrar con Google** o **Entrar con Microsoft**.
3. Toca **Crear mi granja nueva**: se crea la hoja en tu Google Drive o el Excel en tu OneDrive.
4. Toca **Importar El Progreso (5 cerdas y 2 servicios)** para traer lo que ya tenías.

---

## 4. Instalar en el celular

### Opción fácil (recomendada): instalar desde Chrome
Con la app abierta en Chrome: menú **⋮ → Instalar app** (o **Agregar a la pantalla principal**).
Queda con su ícono, se abre a pantalla completa como cualquier app y funciona sin señal.

### Opción APK (para pasarla por WhatsApp o subirla a Play Store)
1. Entra a https://www.pwabuilder.com y pega `https://TUUSUARIO.github.io/`. Toca **Start**.
2. Toca **Package For Stores → Android → Generate Package** (deja los valores por defecto; el nombre ya sale como Pig App).
3. Se descarga un `.zip` con:
   - `app-release-signed.apk`: el instalador. Pásalo al celular y ábrelo (Android pedirá permitir instalar apps de esta fuente).
   - `signing.keystore` y `signing-key-info.txt`: **guárdalos en un lugar seguro**; sin ellos no podrás actualizar el APK.
   - `assetlinks.json`: sirve para que la app no muestre la barra de Chrome arriba.
4. Para quitar la barra de Chrome: en GitHub **Add file → Create new file**, nombre `.well-known/assetlinks.json`, pega el contenido de ese archivo y toca **Commit changes**. Desinstala y vuelve a instalar el APK.

---

## 5. Trabajadores

1. En la app: **Más → Usuarios → Agregar usuario**, escribe su correo y el rol (Operario, Consulta o Administrador).
   La app le comparte la base de datos (en Drive u OneDrive) automáticamente.
2. Si tu granja está en Google, agrega también su Gmail como **usuario de prueba** en Google Cloud (paso 2A.4).
3. Él instala Pig App, entra con el mismo tipo de cuenta, toca **Unirme a una granja** y pega lo que aparece en **Más → Usuarios**: el enlace de la hoja (Google) o el código que empieza por `PIGMS:` (Microsoft).

Los operarios registran todo pero no ven costos, valores ni resultados.
Ojo: como la base es un archivo compartido, si alguien abre la hoja directamente sí podría ver los valores.

---

## 6. Sin señal y sincronización

- Todo lo que registres se guarda en el celular al instante.
- Con señal, la app sube los cambios a Drive u OneDrive sola cada pocos minutos.
- Arriba a la derecha ves el estado. Si dice **"Toca para sincronizar"**, tócalo (Google pide confirmar la cuenta cada hora más o menos).
- Si dos personas cambian el mismo registro, queda el cambio más reciente.

---

## 7. Actualizaciones

Cuando haya una versión nueva de `index.html`, súbela en GitHub reemplazando la anterior (**Add file → Upload files**).
Las apps instaladas se actualizan solas la próxima vez que se abran con señal. El APK no hay que regenerarlo.
