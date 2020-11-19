const { db } = require("../models/admins");

db.planes.insertMany([
    {
        nombrePlan : 'Básico',
        cantidadPaginas: 1,
        cantidadProductos : 5,
        precioPlan : 250
    },
    {
        nombrePlan : 'Premium',
        cantidadPaginas: 3,
        cantidadProductos : 8,
        precioPlan : 600
    },
    {
        nombrePlan : 'Deluxe',
        cantidadPaginas: 5,
        cantidadProductos : 10,
        precioPlan : 950
    }    
]);