import { Router } from "express";
import { createVenta, readVenta, readVentas, updateVenta, deleteVenta } from "../controllers/venta.controller.js";
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateVenta } from "../middlewares/validateVenta.js";

const router = Router();

// Rutas para la entidad Venta
// authRequired,
router.post('/ventas', validateVenta, createVenta);
router.get('/ventas', readVentas);
router.get('/ventas/:id', readVenta);
router.put('/ventas/:id', validateVenta, updateVenta);
router.delete('/ventas/:id', deleteVenta);



export default router;
