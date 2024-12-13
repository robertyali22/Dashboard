import { useState, useEffect } from "react";
import { NavBar } from '../components/Navbar';
import { SideBar } from "../components/Sidebar";
import { getAllTiendas, getTienda, createTienda, deleteTienda, updateTienda } from "../api/TiendaRequest";
import { useForm } from "react-hook-form";

export function TiendaPage() {
    const [tiendas, setTiendas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editTiendaId, setEditTiendaId] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();


    // Cargar tiendas al montar el componente
    useEffect(() => {
        async function loadTienda() {
            const res = await getAllTiendas(); // Asegúrate de usar el nombre correcto
            console.log(res.data);
            setTiendas(res.data);
        }
        loadTienda();
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

    // Agregar o actualizar una tienda
    const onSubmit = async (data) => {
        console.log("Datos enviados:", data);
        try {
            if (editMode) {
                await updateTienda(editTiendaId, data);
            } else {
                await createTienda(data);
            }
            const res = await getAllTiendas();
            setTiendas(res.data);
            closeModal();
        } catch (error) {
            console.error("Error al guardar tienda:", error.response?.data || error.message);
        }
    };

    // const onSubmit = async (data) => {
    //     if (editMode) {
    //         await updateProducto(editProductoId, data); // Actualizar producto
    //     } else {
    //         await createProducto(data); // Crear producto
    //     }
    //     const res = await getAllProducto();
    //     setProductos(res.data);
    //     closeModal();
    // };


    // Preparar el formulario para editar
    const handleEdit = (tienda) => {
        setEditMode(true);
        setEditTiendaId(tienda._id);
        Object.keys(tienda).forEach((key) => setValue(key, tienda[key]));
        openModal();
    };

    // Eliminar tienda
    const handleDelete = async (id) => {
        await deleteTienda(id);
        const res = await getAllTiendas();
        setTiendas(res.data);
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="sm:ml-64 bg-slate-100">
                <div className="p-4 mt-16">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Tiendas</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                Agregar Tienda
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Nombre</th>
                                        <th className="px-4 py-3">Direccion</th>
                                        <th className="px-4 py-3">Ciudad</th>
                                        <th className="px-4 py-3">Contacto</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tiendas.map((tienda, index) => (
                                        <tr key={tienda._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{tienda.nombre}</td>
                                            <td className="px-4 py-3">{tienda.direccion}</td>
                                            <td className="px-4 py-3">{tienda.ciudad}</td>
                                            <td className="px-4 py-3">{tienda.contacto}</td>
                                            <td className="px-4 py-3 flex space-x-3">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEdit(tienda)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(tienda._id)}
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
                            {editMode ? "Editar Tienda" : "Agregar Tienda"}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {[
                                { name: "nombre", label: "Nombre", maxLength: 50 },
                                { name: "direccion", label: "Dirección", maxLength: 100 },
                                { name: "ciudad", label: "Ciudad", maxLength: 50 },
                                { name: "contacto", label: "Contacto", pattern: /^[0-9]+$/, maxLength: 15 },
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
