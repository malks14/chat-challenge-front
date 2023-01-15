# Prueba Técnica Front End - Chatter

<hr />

## Estructura del proyecto

```
.
├── .next
├── public
├── src
│   ├── assets
│   │   └──
│   ├── components
│   │   └── ...
│   ├── layout
│   │   └── ...
│   ├── pages
│   │   └── ...
│   ├── redux
│   │   └── ...
│   ├── types
│   │   └── ...
│   ├── utils
│   │   └── ...
│   ├── App.css
│   ├── App.test.css
│   ├── index.css
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── next-env.d.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
└── tsconfig.tsbuildinfo
```

<hr />

## Correr el cliente

- Utilizar `npm run dev` para correr en development.

## Consigna

Chatter es una app de mensajes, muy parecida a WhatsApp u otras aplicaciones de mensajería. Dentro de ella, existen usuarios capaces de ser registrados, iniciar sesión y a su vez mandar mensajes a distintas personas.

El objetivo de esta evaluación es construir por encima de un maquetado establecido y conectar el cliente con una API REST. La API se puede acceder mediante el siguiente repositorio: https://github.com/toremsoftware/chatter_api

Para correrla, basta con clonar el repositorio, abrir una nueva terminal en la carpeta y escribir el comando `npm start`. Este comando levantará la aplicación en el puerto local 8080 y se le puede consultar mediante la URL: http://localhost:8080.

Todas las instrucciones para el uso de los endpoints, sockets y respuestas a las consultas http se encuentran en el archivo `README.md`.

## Evaluación (Conexión)

Completar todas las secciones que estén marcadas como `TODO`. Entre ellas están el inicio de sesión, registrarse, enviar mensaje, obtener los mensajes, etc.

Implementar el manejo de sockets que esten marcados como `TODO` utilizando la librería [socket.io](https://socket.io/). Toda la documentación sobre los sockets que retorna la API se encuentra en el README.md de [chatter_api](https://github.com/toremsoftware/chatter_api)

Persistir el JWT en la sesión de manera que al recargar la página no se pierda el usuario loggeado.

Se valora un buen diseño, eficiente y mantenible. **Incentivamos a crear directorios, archivos o hooks para ayudarse a mantener órden y desacomplamiento**.

## Evaluación (Maquetado)

El objetivo de esta consigna es agregar una breve funcionalidad de maquetado a la prueba existente de chatter.

La empresa desea agregar la funcionalidad de ver el ticket abierto y cerrado asociado a un chat.

Un Ticket, es “levantado” por un agente cuando hubo un problema con el cliente con el cual se está conversando. El mismo brinda información acerca del problema. Cuando el problema se soluciona, el ticket se cierra. Un chat puede tener tanto un ticket abierto (verde) como un ticket cerrado (rojo).

Para ver los tickets de un chat, se puede hacer click derecho por encima de él para desplegar el siguiente context menu:

![Si no ves esta imagen, se puede encontrar en el proyecto dentro de "src/assets/images/ticket-popup.png"](/src/assets/images/ticket-popup.png)

Al seleccionar la opción de “Ver ticket abierto” o “Ver ticket cerrado”, se debe desplegar un modal blanco en el centro de la pantalla conteniendo el ticket correspondiente:

#### Para un ticket abierto:

![Si no ves esta imagen, se puede encontrar en el proyecto dentro de "src/assets/images/opened-ticket.png"](/src/assets/images/opened-ticket.png)

#### Para un ticket cerrado:

![Si no ves esta imagen, se puede encontrar en el proyecto dentro de "src/assets/images/closed-ticket.png"](/src/assets/images/closed-ticket.png)

No hace falta conectar nada con la API, y los datos a desplegar son mockeados, tal cual los que se encuentran en los ejemplos de encima (harcodeados en el código).

Para ver información respecto a la paleta de colores y tamaños, se puede entrar al siguiente [link de figma](https://www.figma.com/file/5J2pWd5QrIaKyZACH5FOB8/Prueba?node-id=0%3A1&t=GBl0nGg8IPHj229h-0).

#### Notas:

- No es necesario difuminar el fondo ni nada en especial.
- El componente debe ser el mismo, que en función de si es abierto o cerrado, despliega un color distinto (rojo o verde).
- La lógica para abrir el modal se encuentra dentro del archivo ChatTabContextMenu.ts en las líneas 24 y 28.
- La data del modal está dentro del archivo mockData.ts. Un ticket abierto se diferencia de uno cerrado por el atributo status, que determina el estado del ticket.

## Tecnologías

- React
- Next.js
- Redux
- Typescript
- Styled components
- Axios

## Información de contacto

Por cualquier duda o consulta respecto a la evalucación, pueden contactarse con nosotros a federico@toremsoftware.com
