import express from 'express';
import controller from '../controllers/ControllerCliente.js';
const router = express.Router(); 

router
    .get("/clientes/:cedula",controller.GetClienteByCedula)
    
    .get("/clientes",controller.GetAllClientes)
    
    .patch("/clientes/:cedula",controller.UpdateCliente)

    .delete("/clientes/:cedula",controller.DeleteCliente)

    .post("/clientes",controller.PostCliente)
    


export default router;