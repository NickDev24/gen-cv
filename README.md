# ⚡ CV RAPIDO — Generador Profesional de CV

CV RAPIDO es una herramienta web ultraliviana para crear currículums profesionales en menos de 3 minutos, optimizada para el mercado laboral de Argentina.

## 🚀 Características
- **Sin registro:** Creá tu CV al instante.
- **Categorías laborales:** Optimizado para 10 rubros populares (Minería, Salud, Construcción, etc.).
- **10 Plantillas:** Diseños limpios, profesionales y empresariales.
- **PDF de alta calidad:** Generación directa de archivos listos para imprimir o enviar.
- **SEO Ready:** Sitemap dinámico, robots.txt y páginas de categorías indexables.
- **Fotos:** Integración opcional con Cloudinary para fotos de perfil.

## 🛠️ Stack Tecnológico
- **Frontend:** Vite, HTML5, Vanilla JavaScript, Modular CSS.
- **Backend:** Node.js, Express.
- **Base de Datos:** MongoDB (TTL de 24 horas para datos temporales).
- **Imágenes:** Cloudinary SDK.
- **PDF:** PDFKit.

## 📦 Instalación Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/gen-cv.git
    cd gen-cv
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz con:
    ```env
    PORT=3000
    MONGO_URL=tu_url_de_mongodb
    CLOUDINARY_URL=tu_url_de_cloudinary
    ```

4.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

## 🚀 Despliegue en Vercel

El proyecto está listo para desplegarse en Vercel. 
1. Conecta tu repositorio de GitHub a Vercel.
2. Agrega las variables de entorno (`MONGO_URL`, `CLOUDINARY_URL`) en el dashboard de Vercel.
3. El archivo `vercel.json` se encarga de configurar las rutas y funciones serverless automáticamente.

## 📂 Estructura del Proyecto
- `api/`: Backend (Serverless functions para Vercel).
- `src/`: Frontend (Lógica y estilos).
- `dist/`: Generación estática post-build.
- `public/`: Assets públicos.

## ⚖️ Licencia y Propiedad
Propiedad de **FACUNDO M CERCUETTI**. 
Consulta los archivos `LICENSE` y `COPYRIGHT` para más detalles.
# gen-cv
