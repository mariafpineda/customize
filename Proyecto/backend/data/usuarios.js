db.usuarios.insertMany([
    {   nombreUsuario: 'María',
        apellidoUsuairo: 'Pineda',
        pais: 'Honduras',
        fechaNacimiento : '19/09/1998',
        correoUsuario: 'mpineda@prueba.com',
        contraseniaUsuario : 'prueba.456',
        genero : 'Femenino',
        compras: [
        {
            _id : ObjectId(),
            "articulos" : [
                {
                    nombreProducto: 'Producto 1',
                    cantidad : 1,
                    precio: 15.5
                },
                {
                    nombreProducto: 'Producto 2',
                    cantidad : 4,
                    precio: 20
                }
            ],
            totalCompra : 95.5
        }
        ]
    }, 
    { nombreUsuario: 'Juan',
        apellidoUsuairo: 'Perez',
        pais: 'Honduras',
        fechaNacimiento : '12/12/2000',
        correoUsuario: 'jperez@prueba.com',
        contraseniaUsuario : 'prueba.456',
        genero : 'Masculino',
        compras: [
            {
                _id : ObjectId(),
                "articulos" : [
                {
                    nombreProducto: 'Producto 1',
                    cantidad : 1,
                    precio: 15.5
                },
                {
                    nombreProducto: 'Producto 2',
                    cantidad : 4,
                    precio: 20
                }
                ],
                totalCompra : 95.5
            }
            
        ]
           
    },  
    { nombreUsuario: 'Jorge',
        apellidoUsuairo: 'Valle',
        pais: 'Honduras',
        fechaNacimiento : '12/12/2000',
        correoUsuario: 'jvalle@prueba.com',
        contraseniaUsuario : 'prueba.456',
        genero : 'Masculino',
        compras : []
    },
    { nombreUsuario: 'Ana',
        apellidoUsuairo: 'Juarez',
        pais: 'Honduras',
        fechaNacimiento : '12/12/2000',
        correoUsuario: 'ajuarez@prueba.com',
        contraseniaUsuario : 'prueba.456',
        genero : 'Femenino',
        compras: []
    }
])