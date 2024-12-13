import { Router } from "express";
import { createCliente, readCliente, readClientes, updateCliente, deleteCliente } from "../controllers/cliente.controller.js";
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateCliente } from "../middlewares/validateCliente.js";

const router = Router();

// Rutas para la entidad Cliente
// authRequired,
router.post("/clientes", validateCliente, createCliente);
router.get("/clientes", readClientes);
router.get("/clientes/:id", readCliente);
router.put("/clientes/:id", validateCliente, updateCliente);
router.delete("/clientes/:id", deleteCliente);

export default router;
