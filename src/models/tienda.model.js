import mongoose from "mongoose";

// Esquema de la tienda
const tiendaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true, 
    },
    contacto: {
        type: String,
        required: true, 
    }
}, {
    timestamps: true,
});

// Exportar el modelo Tienda
export default mongoose.model("Tienda", tiendaSchema);
