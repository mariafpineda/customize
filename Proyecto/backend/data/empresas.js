db.empresas.insertMany(
    [
        {
            nombreEmpresa : 'Empresa 1',
            nombreDominio : 'empresa1',
            rubro : 'Joyería',
            pais :  'Honduras',
            correoEmpresa : 'usuario@empresa1.com',
            contraseniaEmpresa : 'empresa1.456',
            planActual : '1',
            productos : [
                {
                    _id : ObjectId(),
                    nombreProducto: 'Cadena',
                    precio : 15.2,
                    categoria: 'Joyería'
                }
            ],
            categorias: ['Joyería'],
            estado : 'activo'
        }
    ]
)