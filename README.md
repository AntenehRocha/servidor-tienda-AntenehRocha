# Proyecto de tienda, para Servidor y Cliente

#### Para comenzar es necesario ejecutar estes comando en el el contenedor desplegado por el docker-compose.yml

```` composer require mongodb/mongodb ````

#### Para ello haremos ```` docker exec 'nombre-contenedor' composer require mongodb/mongodb ````

##### Se creará la carpeta  ```` vendor ```` y los archivos necesarios como ```` composer.json ```` los cuales ya dejaré añadidos el repositorio

<br></br>

---

### Algo interesante de este proyecto es el uso de Bootstrap
#### Lo uso inyectandolo desde el CDN
 <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/3840px-Bootstrap_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="Descripción" style="width: 2%;">

 <br></br>

---

 ### Para el login y el logout me decidí por usar las sesiones de PHP las cuales me facilitan que la pagina se recargue y el usuario continue logueado
 #### Y mediante el uso de ```` display: none; ````  estoy gestionando el DOM para que dependiendo de los estados de la pagina se muestre una información u otra

 #### En esta web por defecto los usuarios son ````comprador```` esto permite que de manera intencionada por los administradores los usuarios que se prefieran, puedan ser ````admin```` unicamente editanto el campo en la base de datos

 #### Actualmente siguiendo este procedidmiento tengo un panel lateral, un formulario para los administradores en las paginas ````index.html```` y ````tienda.html````, directamente al iniciar sesion con una cuenta con permisos
