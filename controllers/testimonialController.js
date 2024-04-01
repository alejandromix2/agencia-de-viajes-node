import{ Testimonial } from '../models/Testimoniales.js'



export const guardarTestimonial = async (req,res) => {

    //validar 

    const {nombre,correo,mensaje} = req.body;
    console.log(req.body)
    const errores = [];

    if(nombre.trim() === ''  ){
        errores.push({nombre: 'El nombre esta vacio'})
    }
    if(correo.trim() === ''){
        errores.push({correo: 'El correo esta vacio'})
    }
    if(mensaje.trim() === '' ){
        errores.push({mensaje: 'El mensaje esta vacio'})
    }

    console.log(errores)
    
    if(errores.length > 0 ){

        const testimoniales = await Testimonial.findAll();
        //mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //almacenarlo en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales')
        } catch (error) {
            
        }
    }


    
}