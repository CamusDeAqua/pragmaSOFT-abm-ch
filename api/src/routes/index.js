const { Router } = require('express');
const { Series } = require('../db');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {USUARIO}=process.env
const {CONTRASENA}=process.env

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getSeriesInfo = async () => {
    return await Series.findAll({
            through: {
                attributes: []
            }
        }
    )
}


const getTotalInfo = async () => {
    let series = await getSeriesInfo();
    return {series};
}

router.get('/pragmasoft', async (req, res) => {

    let infoTotal = await getTotalInfo();
    res.send(infoTotal);        
    
})


router.post('/pragmasoft', async (req, res) => {
    const { titulo, descripcion, fechadeEstreno, estrellas, genero, precioAlquiler, atp, estado, id, destroy } = req.body;
    const type="series";
    if(destroy && type == 'series'){
        const count = await Series.destroy({ where: { id } });
        res.send('deleted!')
    }
    else if(type == 'series'){
        if(id){
            let operation = await Series.findOne({ where: { id } });
            operation.titulo =titulo;
            operation.descripcion = descripcion;
            operation.fechadeEstreno = fechadeEstreno;
            operation.estrellas = estrellas;
            operation.genero = genero;
            operation.precioAlquiler = precioAlquiler;
            operation.atp = atp;
            operation.estado = estado;
            await operation.save();
        }else {
            const info = await Series.create({
                titulo,
                descripcion,
                fechadeEstreno,
                estrellas,
                genero,
                precioAlquiler,
                atp,
                estado
            })            
        }
        res.send('All Ok!');
    }
})

router.post('/login', async (req, res) => {
const { usuario, contrasena } = req.body
let result={
    user: "",
    pass: ""
}
   if (USUARIO == usuario){
    result.user=true;
   }else {
    result.user=false;
   }
   if (CONTRASENA == contrasena){
    result.pass=true;
   }else {
    result.pass=false;
   }
   res.send(result);
   
   
    
})
module.exports = router;
