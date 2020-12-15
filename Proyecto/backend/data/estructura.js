const { db } = require("../models/usuarios");

use customize;

db.createCollection('usuarios');
db.createCollection('empresas')
db.createCollection('shortcuts')
db.createCollection('planes')
db.createCollection('plantillas')
db.createCollection('admins')

//pd: en usuario y empresa mejor regístrese para hacer pruebas porque hay algunas cosas que cambiaron en la estructura del json
// y no se reflejan en la información de esta carpeta porque era información para las primeras pruebas