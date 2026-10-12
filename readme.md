# Protein Quest

Juego educativo sobre proteínas para estudiantes de grado 11. Funciona como
sitio web estático, sin dependencias, y puede publicarse gratuitamente mediante
GitHub Pages.

## Funciones

- Cuatro niveles y dieciséis preguntas.
- Preguntas y respuestas ordenadas aleatoriamente.
- Tres vidas.
- Cronómetro.
- Calificación entre 1.0 y 5.0.
- Nota 5.0 para una partida perfecta.
- Advertencia al primer cambio de pestaña.
- Finalización con nota 1.0 en el segundo cambio de pestaña.
- Diseño adaptable a computadores, tabletas y iPads.
- Resultado preparado para enviarse a
  `ayazocristian.faro@gmail.com`.
- Copia local del último resultado en el navegador.

## Publicación en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de este proyecto a la raíz del repositorio.
3. En el repositorio, entra a `Settings`.
4. Abre la sección `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Selecciona la rama `main` y la carpeta `/ (root)`.
7. Guarda la configuración.
8. GitHub mostrará la dirección pública del juego cuando termine la publicación.

El archivo `index.html` debe permanecer en la raíz.

## Prueba local

Puedes abrir `index.html` directamente en el navegador. Para una prueba más
fiel también puedes servir la carpeta con un servidor web local.

Con Python:

```bash
python -m http.server 8000
