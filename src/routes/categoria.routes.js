import { Router } from "express";
import { createCategoria, readCategoria, readCategorias, updateCategoria, deleteCategoria } from "../controllers/categoria.controller.js";
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateCategoria } from "../middlewares/validateCategoria.js";

const router = Router();

// Rutas para la entidad Categoria
// authRequired,
router.post('/categorias', validateCategoria, createCategoria);
router.get('/categorias', readCategorias);
router.get('/categorias/:id', readCategoria);
router.put('/categorias/:id', validateCategoria, updateCategoria);
router.delete('/categorias/:id', deleteCategoria);



export default router;
