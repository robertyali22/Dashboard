import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true,
    },
    productos: [
        {
            producto_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1,
            },
            subtotal: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    tienda_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tienda",
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Venta", ventaSchema);
