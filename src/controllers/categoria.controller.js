import Categoria from "../models/categoria.model.js";

// Crear un nuevo producto
export const createCategoria = async (req, res) => {
    const { nombre, descripcion, tienda_id } = req.body;

    try {
        const newCategoria = new Categoria({
            nombre,
            descripcion,
            tienda_id,
        });

        const savedCategoria = await newCategoria.save();
        res.status(201).json(savedCategoria);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la categoría", error });
    }
};

// Leer todos los productos
export const readCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().populate("tienda_id");
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las categorías", error });
    }
};

// Leer un producto por ID
export const readCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id).populate("tienda_id");
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la categoría", error });
    }
};

// Actualizar un producto
export const updateCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la categoría", error });
    }
};

// Eliminar un producto
export const deleteCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoria) return res.status(404).json({ message: "Categoria no encontrada" });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la categoria", error });
    }
};

