import Venta from "../models/venta.model.js";

// Crear una nueva venta
export const createVenta = async (req, res) => {
    const { cliente_id, productos, total, tienda_id } = req.body;

    try {
        const newVenta = new Venta({
            cliente_id,
            productos,
            total,
            tienda_id,
        });

        const savedVenta = await newVenta.save();
        res.status(201).json(savedVenta);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la venta", error });
    }
};

// Leer todas las ventas
export const readVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate("cliente_id tienda_id productos.producto_id");
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ventas", error });
    }
};

// Leer una venta por ID
export const readVenta = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id).populate("cliente_id tienda_id productos.producto_id");
        if (!venta) return res.status(404).json({ message: "Venta no encontrada" });
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la venta", error });
    }
};

// Actualizar una venta
export const updateVenta = async (req, res) => {
    try {
        const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!venta) return res.status(404).json({ message: "Venta no encontrada" });
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la venta", error });
    }
};

// Eliminar una venta
export const deleteVenta = async (req, res) => {
    try {
        const venta = await Venta.findByIdAndDelete(req.params.id);
        if (!venta) return res.status(404).json({ message: "Venta no encontrada" });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la venta", error });
    }
};