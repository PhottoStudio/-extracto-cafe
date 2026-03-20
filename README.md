# Extracto — Guía de Deployment en Vercel

## Estructura del proyecto

```
extracto-vercel/
├── api/
│   └── recipe.js        ← Backend seguro (tu API key vive aquí)
├── public/
│   └── index.html       ← Frontend
├── vercel.json          ← Configuración de rutas
└── README.md
```

---

## Paso 1 — Obtener tu API Key de Anthropic

1. Ve a https://console.anthropic.com
2. Inicia sesión o crea una cuenta
3. Ve a **API Keys** → **Create Key**
4. Copia la key (empieza con `sk-ant-...`)
5. Guárdala en un lugar seguro, solo la verás una vez

---

## Paso 2 — Subir el proyecto a GitHub

1. Ve a https://github.com y crea una cuenta si no tienes
2. Crea un repositorio nuevo (ej. `extracto-cafe`)
3. Sube estos 4 archivos manteniendo la estructura de carpetas:
   - `api/recipe.js`
   - `public/index.html`
   - `vercel.json`
   - `README.md`

---

## Paso 3 — Conectar con Vercel

1. Ve a https://vercel.com y crea una cuenta (gratis)
2. Haz clic en **Add New → Project**
3. Selecciona tu repositorio de GitHub (`extracto-cafe`)
4. Vercel lo detectará automáticamente
5. Haz clic en **Deploy** (sin cambiar nada)

---

## Paso 4 — Agregar tu API Key de forma segura

Una vez deployado:

1. En tu proyecto de Vercel, ve a **Settings → Environment Variables**
2. Agrega una nueva variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (tu key de Anthropic)
   - **Environment:** Production, Preview, Development (selecciona los 3)
3. Haz clic en **Save**
4. Ve a **Deployments** → haz clic en los 3 puntos del último deploy → **Redeploy**

¡Listo! Tu sitio estará en `https://tu-proyecto.vercel.app`

---

## ¿Qué hace cada archivo?

| Archivo | Función |
|---------|---------|
| `api/recipe.js` | Recibe la solicitud del frontend, agrega la API key de forma segura y llama a Anthropic |
| `public/index.html` | La app completa que ven los usuarios |
| `vercel.json` | Le dice a Vercel cómo enrutar las peticiones |

---

## ¿Por qué es seguro?

- La API key **nunca aparece en el código frontend**
- Los usuarios no pueden verla ni en el HTML ni en el JavaScript
- Solo existe en las variables de entorno de Vercel (cifradas)
- El backend actúa como intermediario entre el usuario y Anthropic

---

## Costo estimado

- **Vercel:** Gratis para proyectos personales
- **Anthropic API:** ~$0.003 por receta generada (Claude Sonnet)
- Si generas 100 recetas al mes: ~$0.30 USD
