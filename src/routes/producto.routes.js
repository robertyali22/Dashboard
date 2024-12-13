import { Router } from "express";
import { createProducto, readProducto, readProductos, updateProducto, deleteProducto } from "../controllers/producto.controller.js";
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateProducto } from "../middlewares/validateProducto.js";

const router = Router();

// Rutas para la entidad Producto
// authRequired,
router.post('/productos', validateProducto, createProducto);
router.get('/productos', readProductos);
router.get('/productos/:id', readProducto);
router.put('/productos/:id', validateProducto, updateProducto);
router.delete('/productos/:id', deleteProducto);



export default router;
