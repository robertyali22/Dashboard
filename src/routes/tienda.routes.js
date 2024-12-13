import { Router } from "express";
import { createTienda, readTienda, readTiendas, updateTienda, deleteTienda } from "../controllers/tienda.controller.js";
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateTienda } from "../middlewares/validateTienda.js";

const router = Router();

// Rutas para la entidad Tienda
// authRequired,
router.post("/tiendas", validateTienda, createTienda);
router.get("/tiendas", readTiendas);
router.get("/tiendas/:id", readTienda);
router.put("/tiendas/:id", validateTienda, updateTienda);
router.delete("/tiendas/:id", deleteTienda);

export default router;
