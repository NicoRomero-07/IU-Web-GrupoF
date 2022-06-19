# Bocaillo

Bocaillo es una web en la que puedes comentar, ver y crear foros de diversas categorías.

## Tecnologías

NodeJS - HTML - CSS - Bootstrap

## Arranque del proyecto

El proyecto usa una base de datos sql local. Los scripts de la bbdd están disponibles en la directorio database.

Para arrancar el proyecto ejecute en consola: ```node app``` 
Y el la aplicación empezará a correr en el puerto 5000.

En el script ```database/db_connection.js``` habrá que especificar los datos de la base de datos (usuario,contraseña,nombre,host).

Ejecuta la siguiente query en mySQL

```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```

Refreca privilegios

```flush privileges;```

## GitHub

https://github.com/NicoRomero-07/IU-Web-GrupoF