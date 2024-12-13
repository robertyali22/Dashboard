import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v);
            },
            message: props => `${props.value} no es una URL válida para una imagen.`,
        },
        required: true,
    },
    categoria_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    tienda_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tienda",
        required: true,
    },
}, {
    timestamps: true,
});

// Exportar el modelo Producto
export default mongoose.model("Producto", productoSchema);
