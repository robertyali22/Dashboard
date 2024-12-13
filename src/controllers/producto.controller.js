import Producto from "../models/producto.model.js";

// Crear un nuevo producto
export const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, img, categoria_id, tienda_id } = req.body;

    try {
        const newProducto = new Producto({
            nombre,
            descripcion,
            precio,
            stock,
            img,
            categoria_id,
            tienda_id,
        });

        const savedProducto = await newProducto.save();
        res.status(201).json(savedProducto);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};

// Leer todos los productos
export const readProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate("categoria_id tienda_id");
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
};

// Leer un producto por ID
export const readProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate("categoria_id tienda_id");
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
};



// // Obtener cantidad de productos por tienda
// export const getProductosPorTienda = async (req, res) => {
//     try {
//         const productosPorTienda = await Producto.aggregate([
//             {
//                 $group: {
//                     _id: "$tienda_id", // Agrupar por tienda
//                     totalProductos: { $sum: 1 }, // Contar productos
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "tiendas", 
//                     localField: "_id",
//                     foreignField: "_id",
//                     as: "tienda",
//                 },
//             },
//             {
//                 $unwind: "$tienda", 
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     tienda: "$tienda.nombre",
//                     totalProductos: 1,
//                 },
//             },
//         ]);
//         res.json(productosPorTienda);
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener productos por tienda", error });
//     }
// };

// // Obtener estado del inventario
// export const getEstadoInventario = async (req, res) => {
//     try {
//         const estadoInventario = await Producto.aggregate([
//             {
//                 $facet: {
//                     enStock: [
//                         { $match: { stock: { $gt: 10 } } }, // Productos con stock mayor a 10
//                         { $count: "count" },
//                     ],
//                     bajoStock: [
//                         { $match: { stock: { $lte: 10, $gt: 0 } } }, // Productos con stock entre 1 y 10
//                         { $count: "count" },
//                     ],
//                     agotado: [
//                         { $match: { stock: { $eq: 0 } } }, // Productos con stock igual a 0
//                         { $count: "count" },
//                     ],
//                 },
//             },
//         ]);

//         // Procesar datos para devolver un formato simplificado
//         const result = {
//             enStock: estadoInventario[0]?.enStock[0]?.count || 0,
//             bajoStock: estadoInventario[0]?.bajoStock[0]?.count || 0,
//             agotado: estadoInventario[0]?.agotado[0]?.count || 0,
//         };

//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener el estado del inventario", error });
//     }
// };



// export const getProductosPorCategoria = async (req, res) => {
//     try {
//         const productosPorCategoria = await Producto.aggregate([
//             {
//                 $group: {
//                     _id: "$categoria", // Agrupar los productos por categoría
//                     cantidad: { $sum: 1 }, // Contar los productos en cada categoría
//                 },
//             },
//             { $sort: { cantidad: -1 } }, // Ordenar por la cantidad de productos
//         ]);
//         res.json(productosPorCategoria);
//     } catch (error) {
//         res.status(500).json({ message: "Error al obtener productos por categoría", error });
//     }
// };

