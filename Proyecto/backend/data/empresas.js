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
            estado : 'activo',
            imagenes : [
                {
                    _id: ObjectId(),
                    rutaImg : ""
                }
            ],
            videos : [
                {
                    _id: ObjectId(),
                    rutaVideo : ""
                }
            ],
            archivos : [
                {
                    _id: ObjectId(),
                    rutaFile : ""
                }
            ],
            paginas : [
                {
                    _id: ObjectId(),
                    encabezadoGenerico : "",
                    piePaginaGenerico : "",
                    favicon: "",
                    logitipo : "",
                    tituloSitio : "",
                    descripcion : "",
                    palabrasClave : [],
                    cssExtra : "",
                    jsExtra : ""
                }
            ]
        }
    ]
)