import { useState, useEffect } from "react";
import { NavBar } from '../components/Navbar';
import { SideBar } from "../components/Sidebar";
import { getAllClientes, createCliente, deleteCliente, updateCliente } from "../api/ClienteRequest";
import { useForm } from "react-hook-form";

export function ClientesPage() {
    const [clientes, setClientes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editClienteId, setEditClienteId] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Cargar clientes al montar el componente
    useEffect(() => {
        async function loadClientes() {
            const res = await getAllClientes();
            console.log(res.data);
            setClientes(res.data);
        }
        loadClientes();
    }, []);

    // Abrir y cerrar modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditMode(false);
        reset();
    };

    // Agregar o actualizar un cliente
    const onSubmit = async (data) => {
        console.log("Datos enviados:", data);
        try {
            if (editMode) {
                await updateCliente(editClienteId, data);
            } else {
                await createCliente(data);
            }
            const res = await getAllClientes();
            setClientes(res.data);
            closeModal();
        } catch (error) {
            console.error("Error al guardar cliente:", error.response?.data || error.message);
        }
    };

    // Preparar el formulario para editar
    const handleEdit = (cliente) => {
        setEditMode(true);
        setEditClienteId(cliente._id);
        Object.keys(cliente).forEach((key) => setValue(key, cliente[key]));
        openModal();
    };

    // Eliminar cliente
    const handleDelete = async (id) => {
        await deleteCliente(id);
        const res = await getAllClientes();
        setClientes(res.data);
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="sm:ml-64 bg-slate-100">
                <div className="p-4 mt-16">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Clientes</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                Agregar Cliente
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Nombre</th>
                                        <th className="px-4 py-3">Correo</th>
                                        <th className="px-4 py-3">Teléfono</th>
                                        <th className="px-4 py-3">Dirección</th>
                                        <th className="px-4 py-3">Fecha Registro</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cliente, index) => (
                                        <tr key={cliente._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{cliente.nombre}</td>
                                            <td className="px-4 py-3">{cliente.correo}</td>
                                            <td className="px-4 py-3">{cliente.telefono}</td>
                                            <td className="px-4 py-3">{cliente.direccion}</td>
                                            <td className="px-4 py-3">
                                                {new Date(cliente.fecha_registro).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 flex space-x-3">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEdit(cliente)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(cliente._id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal dinámico */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            {editMode ? "Editar Cliente" : "Agregar Cliente"}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {[
                                { name: "nombre", label: "Nombre", maxLength: 50 },
                                { name: "correo", label: "Correo", maxLength: 100 },
                                { name: "telefono", label: "Teléfono", pattern: /^[0-9]+$/, maxLength: 15 },
                                { name: "direccion", label: "Dirección", maxLength: 100 },
                            ].map(({ name, label, maxLength, pattern }) => (
                                <div key={name} className="mb-4">
                                    <label
                                        htmlFor={name}
                                        className="block text-gray-600 text-sm font-medium"
                                    >
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        id={name}
                                        className="w-full border border-gray-300 rounded p-2 mt-1"
                                        {...register(name, {
                                            required: `${label} es obligatorio`,
                                            maxLength: { value: maxLength, message: `${label} no puede superar los ${maxLength} caracteres` },
                                            pattern: pattern && { value: pattern, message: `${label} debe ser un número válido` },
                                        })}
                                    />
                                    {errors[name] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
                                    )}
                                </div>
                            ))}
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha_registro"
                                    className="block text-gray-600 text-sm font-medium"
                                >
                                    Fecha Registro
                                </label>
                                <input
                                    type="text"
                                    id="fecha_registro"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 bg-gray-100"
                                    {...register("fecha_registro")}
                                    disabled
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
