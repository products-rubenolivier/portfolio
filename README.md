# rubenolivier.com — Portfolio

Sitio web personal de **Rubén Olivier**, AI Creative Designer.

🌐 **Live:** tu-dominio.com
📁 **Repo:** https://github.com/products-rubenolivier/portfolio

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 (variables, grid, clamp) — sin frameworks |
| Scripts | Vanilla JS — sin dependencias |
| Fuentes | DM Mono (Google Fonts) + Non Natural Grotesk Plain + PP Neue Montreal (locales) |
| Iconos | Remix Icons 4.3 (CDN) |
| Formulario | EmailJS |
| Deploy | GitHub → Hostinger (webhook automático) |

---

## Estructura de archivos

```
portfolio/
├── index.html          # Página principal
├── project.html        # Caso de estudio: Clari — AI Finance App
├── project-2.html      # Caso de estudio: Axis DS — Design System
├── project-3.html      # Caso de estudio: Nómada — Identidad de Marca
├── RubenOlivier Profile.png  # Foto de perfil (bio)
├── RubenOlivier.jpg          # Foto alternativa
└── RO.png                    # Logo / avatar
```

---

## Secciones — index.html

| # | ID | Nombre |
|---|----|--------|
| — | `#hero` | Hero — headline principal |
| — | `.marquee-band` | Ticker de habilidades |
| 01 | `#about` | BIO — texto + foto + stats + frameworks |
| 02 | `#stack` | STACK — Herramientas + Servicios (accordion) |
| 03 | `#work` | SELECTED WORK — 3 proyectos |
| 04 | `#process` | METHOD — proceso de diseño |
| — | `#contact` | CTA — contacto |
| — | `#footer` | Footer |

---

## Sistema bilingüe (EN / ES)

Cada texto editable tiene atributos `data-en` y `data-es`. El JS los intercambia al hacer clic en EN / ES.

```html
<h2 data-en="SELECTED WORK" data-es="TRABAJO SELECCIONADO">SELECTED WORK</h2>
```

Para editar un texto: modificar el atributo correspondiente y el contenido visible.

---

## Cómo editar contenido

### Cambiar texto de la bio
Buscar en `index.html`:
```html
<p class="about-bio" data-en="..." data-es="...">
```
Modificar los atributos y el texto visible.

### Agregar/cambiar proyecto
Editar la tarjeta en `#work` y crear/modificar el archivo `project-N.html` correspondiente.

### Cambiar stats (50+, 6+, 20+)
Buscar `.stat-num` en `index.html`.

### Cambiar foto de perfil
Reemplazar `RubenOlivier Profile.png` con la nueva imagen (mismo nombre) y hacer push.

---

## Formulario de contacto — EmailJS

Configurado con EmailJS. Las credenciales están en el `<script>` al final de `index.html`:

```js
emailjs.init('TU_PUBLIC_KEY')
// service_id: 'TU_SERVICE_ID'
// template_id: 'TU_TEMPLATE_ID'
```

Para cambiar: entrar a emailjs.com → actualizar los IDs.

---

## Deployment

### Flujo automático
```
Editar código → git push → Hostinger se actualiza solo (webhook)
```

### Comandos git
```bash
# Ver cambios pendientes
git status

# Subir todos los cambios
git add -A
git commit -m "descripción del cambio"
git push
```

### Primer setup en una máquina nueva
```bash
git clone https://github.com/products-rubenolivier/portfolio.git
cd portfolio
# Abrir index.html en el navegador o usar un servidor local:
npx serve -l 8766
```

---

## Redes sociales — footer

| Red | URL |
|-----|-----|
| Dribbble | https://dribbble.com/ux_rolivier |
| Instagram | https://www.instagram.com/ux_rolivier/ |
| Behance | https://www.behance.net/ruben-olivier |
| LinkedIn | https://www.linkedin.com/in/ruben-olivier/ |
| X | https://x.com/uxrolivier |

Para actualizar: buscar `.footer-icon-link` en `index.html` y cambiar el `href`.

---

## Dependencias externas (CDN)

```html
<!-- Fuentes -->
https://fonts.googleapis.com/css2?family=DM+Mono

<!-- Iconos -->
https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css

<!-- Formulario -->
https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js
```
