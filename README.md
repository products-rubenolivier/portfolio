# Rubén Olivier — Portfolio

Sitio estático de diseño visual, identidad de marca y UX/UI.

- Sitio público: https://rubenolivier.com
- Repositorio: https://github.com/products-rubenolivier/portfolio
- HTML, CSS y JavaScript sin dependencias de compilación.
- Geist Medium para cuerpos y labels; Geist Semibold para subtítulos.

## Archivos principales

| Archivo | Contenido |
| --- | --- |
| `index.html` | Home, proyectos, acerca, servicios y método |
| `project.html` | Clari: demo de producto digital |
| `project-2.html` | Axis DS: demo de sistema de diseño |
| `project-3.html` | Nómada: demo de identidad |
| `styles.css` | Estilos compartidos y adaptación a móvil |
| `site.js` | Idiomas, menú, gradiente, header y entradas del footer |
| `assets/brand/` | PNG originales de marca, con transparencia |
| `favicon.svg` | Isotipo centrado en un lienzo cuadrado |

Los casos son ejemplos conceptuales señalados como demos, pendientes de sustituir
por trabajo real. Las cifras de las interfaces son datos ficticios de la maqueta.

## Vista local

Con Node.js instalado:

```sh
node preview.cjs
```

Abrir http://localhost:4173/. El servidor solo escucha en la máquina local y sirve
los archivos permitidos del sitio; no expone el repositorio ni la configuración.
No es necesario instalar paquetes ni ejecutar un build.

## Edición

El contenido de cada página usa `data-es` y `data-en`. Editar ambos atributos y el
texto visible; el idioma elegido se conserva cuando el navegador lo permite.
Los cambios visuales comunes se realizan en `styles.css`.

El método profesional es **Entender → Articular → Diseñar → Activar**. El proceso de
cada caso puede variar según sea producto, sistema o marca.

El contacto usa enlaces `mailto:hola@rubenolivier.com`; abre el cliente de correo.
Esta versión no usa el anterior formulario de EmailJS.

## Interacciones

- El hero permanece fijo durante el primer tramo del scroll para explorar el
  gradiente. Después continúa hacia Proyectos. El enlace de proyectos permite
  saltar directamente a la sección.
- El header es transparente sobre el hero y blanco sobre las siguientes secciones.
- Los servicios se expanden por mouse, táctil o teclado; sus enlaces usan subrayado
  animado. El footer entra al llegar con el scroll y se prepara de nuevo al subir.
- Se respeta `prefers-reduced-motion`, incluyendo la eliminación del tramo fijo.
- Los textos y enlaces quedan disponibles cuando JavaScript no está activo.

## Publicación

El flujo documentado del proyecto es un push a `main` en GitHub seguido del
webhook de Hostinger. Hay que verificar acceso de escritura y entrega del webhook:
la documentación por sí sola no confirma que la conexión esté activa.

No subir credenciales al repositorio. No usar `git add -A` si hay experimentos o
archivos de trabajo ajenos al sitio. La carpeta local `iteration-01/` contiene la
vista de iteraciones y no es necesaria para publicar los archivos principales.

Antes de subir, comprobar navegación, assets, idiomas, servicios, menú móvil y
animaciones. Después del despliegue, verificar el HTML público y los tres casos.

## Reversión

La versión anterior a esta integración está en el commit `98dc46b`. Para volver
al estado previo, revertir el commit de integración y publicar esa reversión.
La verificación pública del sitio debe repetirse después del despliegue.
