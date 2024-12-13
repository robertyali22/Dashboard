import Tienda from "../models/tienda.model.js";

// Crear una nueva tienda
export const createTienda = async (req, res) => {
    const { nombre, direccion, ciudad, contacto } = req.body;

    try {
        const newTienda = new Tienda({
            nombre,
            direccion,
            ciudad,
            contacto,
        });

        const savedTienda = await newTienda.save();
        res.status(201).json(savedTienda);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tienda", error });
    }
};

// Leer todas las tiendas
export const readTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.find();
        res.json(tiendas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tiendas", error });
    }
};

// Leer una tienda por ID
export const readTienda = async (req, res) => {
    try {
        const tienda = await Tienda.findById(req.params.id);
        if (!tienda) return res.status(404).json({ message: "Tienda no encontrada" });
        res.json(tienda);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tienda", error });
    }
};

// Actualizar una tienda
export const updateTienda = async (req, res) => {
    try {
        const tienda = await Tienda.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tienda) return res.status(404).json({ message: "Tienda no encontrada" });
        res.json(tienda);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tienda", error });
    }
};

// Eliminar una tienda
export const deleteTienda = async (req, res) => {
    try {
        const tienda = await Tienda.findByIdAndDelete(req.params.id);
        if (!tienda) return res.status(404).json({ message: "Tienda no encontrada" });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tienda", error });
    }
};
