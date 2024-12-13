import Cliente from "../models/cliente.model.js";

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;

    try {
        const newCliente = new Cliente({
            nombre,
            correo,
            telefono,
            direccion,
        });

        const savedCliente = await newCliente.save();
        res.status(201).json(savedCliente);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el cliente", error });
    }
};

// Leer todos los clientes
export const readClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error });
    }
};

// Leer un cliente por ID
export const readCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
};

// Actualizar un cliente
export const updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente", error });
    }
};


// Eliminar un cliente
export const deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
};
