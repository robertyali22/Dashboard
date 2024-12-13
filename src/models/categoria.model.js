import mongoose from "mongoose";

// Esquema de categorias
const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: false,
    },
    tienda_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tienda",
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Categoria", categoriaSchema);
