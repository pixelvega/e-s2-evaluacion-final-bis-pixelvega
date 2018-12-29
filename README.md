# e-s2-evaluacion-final-bis-pixelvega

# Ejercicio de evaluación final ﴾bis﴿ - Sprint 2
El ejercicio consiste en desarrollar una aplicación web que simula un juego de buscar las parejas. El objetivo del ejercicio es desarrollar la interfaz del juego

La aplicación consta de dos partes
1. Un formulario para elegir el tamaño de la partida y un botón
2. Un listado de cartas, cada una con 2 imágenes que representan las dos caras de una carta ﴾cuando una
está visible la otra está oculta﴿.

# Inicio de la partida
Al hacer clic sobre el botón de 'Comenzar', nuestra aplicación debe recoger el valor del tamaño de la partida y conectarse a un API que devuelve un listado de cartas. La URL del API es https://raw.githubusercontent.com/Adalab/cards-data/master/NUMERO.json, donde NUMERO puede tomar el valor de 4, 6 y 8. Por cada carta obtendremos, entre otros datos, la URL de la imagen a mostrar. También vamos a guardar este número en localStorage, de forma que al recargar la página aparezca seleccionado el número que se eligió la última vez.

# Interacción
Una vez mostramos el listado de cartas vamos a hacer que el listado sea interactivo. Para eso, lo primero que haremos será ocultar la parte frontal de las cartas mostrando solo la parte de atrás.

Al hacer clic sobre una carta vamos a mostrar su parte frontal y a ocultar su parte trasera. Al volver a hacer clic haremos la operación contraria, y volveremos a ver su parte trasera y ocultar la frontal.

# Implementar el juego
Cuando se hace clic en una primera carta esta se da la vuelta y nos muestra su pokemon ﴾como hasta ahora﴿.
Al hacer clic en una segunda carta esta se da la vuelta y: si es la pareja de la primera las dos se quedan boca arriba ﴾como hasta ahora﴿, si no es la pareja de la primera las dos deben mantenerse visibles durante un periodo corto de tiempo ﴾para que la usuaria vea los pokemon﴿ y ponerse boca abajo.
