# login

Login por formulario utilizando Handlebars y persistencia de sesiones en MongoDB Atlas.

Endpoints:

'/' => Servidor conectado

'/login' => Login por formulario

'/logged' => Sesión iniciada. Al refrescar la página, se muestra el nombre de usuario mientras dure la cookie (30 s). 
Luego aparece mensaje de sesión finalizada.

'/logout' => Deslogeo ok.

'/info' => Muestra por consola las variables de la sesión. Sirve como comprobación del estado de la sesión.
