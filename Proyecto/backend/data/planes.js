const { db } = require("../models/admins");

db.planes.insertMany([
    {
        nombrePlan : 'Plan básico',
        cantidadPaginas: 1,
        cantidadProductos : 5,
        precioPlan : 250
    },
    {
        nombrePlan : 'Plan premium',
        cantidadPaginas: 3,
        cantidadProductos : 8,
        precioPlan : 600
    },
    {
        nombrePlan : 'Plan deluze',
        cantidadPaginas: 5,
        cantidadProductos : 10,
        precioPlan : 950
    }    
]);