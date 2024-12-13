import mongoose from "mongoose";

// Esquema del cliente
const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
            },
            message: props => `${props.value} no es un correo válido.`,
        },
    },
    telefono: {
        type: String,
        required: false,
    },
    direccion: {
        type: String,
        required: false,
    },
    fecha_registro: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});


// Exportar el modelo Cliente
export default mongoose.model("Cliente", clienteSchema);
