import { useState, useEffect } from "react";
import { NavBar } from '../components/Navbar';
import { SideBar } from "../components/Sidebar";
import { getAllCategorias, getCategoria, createCategoria, deleteCategoria, updateCategoria } from "../api/CategoriaRequest";
import { getAllTiendas } from "../api/TiendaRequest";
import { useForm } from "react-hook-form";

export function CategoriaPage() {
    const [categorias, setCategorias] = useState([]);
    const [tiendas, setTiendas] = useState([]); // Estado para las tiendas
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCategoriaId, setEditCategoriaId] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Cargar categorías y tiendas al montar el componente
    useEffect(() => {
        async function loadData() {
            const [categoriasRes, tiendasRes] = await Promise.all([
                getAllCategorias(),
                getAllTiendas()
            ]);
            setCategorias(categoriasRes.data);
            setTiendas(tiendasRes.data);
        }
        loadData();
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

    // Agregar o actualizar una categoría
    const onSubmit = async (data) => {
        try {
            if (editMode) {
                await updateCategoria(editCategoriaId, data);
            } else {
                await createCategoria(data);
            }
            const res = await getAllCategorias();
            setCategorias(res.data);
            closeModal();
        } catch (error) {
            console.error("Error al guardar categoría:", error.response?.data || error.message);
        }
    };

    // Preparar el formulario para editar
    const handleEdit = (categoria) => {
        setEditMode(true);
        setEditCategoriaId(categoria._id);
        Object.keys(categoria).forEach((key) => setValue(key, categoria[key]));
        openModal();
    };

    // Eliminar categoría
    const handleDelete = async (id) => {
        try {
            await deleteCategoria(id);
            const res = await getAllCategorias();
            setCategorias(res.data);
        } catch (error) {
            console.error("Error al eliminar categoría:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <div className="sm:ml-64 bg-slate-100">
                <div className="p-4 mt-16">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Categorías</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                Agregar Categoría
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Nombre</th>
                                        <th className="px-4 py-3">Descripción</th>
                                        <th className="px-4 py-3">Tienda</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((categoria, index) => (
                                        <tr key={categoria._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{categoria.nombre}</td>
                                            <td className="px-4 py-3">{categoria.descripcion}</td>
                                            <td className="px-4 py-3">{categoria.tienda_id?.nombre || "Sin asignar"}</td>
                                            <td className="px-4 py-3 flex space-x-3">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEdit(categoria)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(categoria._id)}
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
                            {editMode ? "Editar Categoría" : "Agregar Categoría"}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label
                                    htmlFor="nombre"
                                    className="block text-gray-600 text-sm font-medium"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("nombre", {
                                        required: "El nombre es obligatorio",
                                        maxLength: { value: 50, message: "El nombre no puede superar los 50 caracteres" },
                                    })}
                                />
                                {errors.nombre && (
                                    <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="descripcion"
                                    className="block text-gray-600 text-sm font-medium"
                                >
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("descripcion", {
                                        required: "La descripción es obligatoria",
                                        maxLength: { value: 100, message: "La descripción no puede superar los 100 caracteres" },
                                    })}
                                />
                                {errors.descripcion && (
                                    <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tienda_id"
                                    className="block text-gray-600 text-sm font-medium"
                                >
                                    Tienda
                                </label>
                                <select
                                    id="tienda_id"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("tienda_id", {
                                        required: "La tienda es obligatoria",
                                    })}
                                >
                                    <option value="">Seleccionar tienda</option>
                                    {tiendas.map((tienda) => (
                                        <option key={tienda._id} value={tienda._id}>
                                            {tienda.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.tienda_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.tienda_id.message}</p>
                                )}
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
