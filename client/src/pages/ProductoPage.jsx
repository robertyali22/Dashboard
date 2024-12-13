import { useState, useEffect } from "react";
import { NavBar } from '../components/Navbar';
import { SideBar } from "../components/Sidebar";
import { getAllProductos, createProducto, deleteProducto, updateProducto } from "../api/ProductoRequest";
import { getAllTiendas } from "../api/TiendaRequest";
import { getAllCategorias } from "../api/CategoriaRequest";
import { useForm } from "react-hook-form";

export function ProductoPage() {
    const [productos, setProductos] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProductoId, setEditProductoId] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Cargar productos y tiendas al montar el componente
    useEffect(() => {
        async function loadData() {
            const productosRes = await getAllProductos();
            const tiendasRes = await getAllTiendas();
            const categoriasRes = await getAllCategorias();
            setProductos(productosRes.data);
            setTiendas(tiendasRes.data);
            setCategorias(categoriasRes.data);
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

    // Agregar o actualizar un producto
    const onSubmit = async (data) => {
        try {
            if (editMode) {
                await updateProducto(editProductoId, data);
            } else {
                await createProducto(data);
            }
            const productosRes = await getAllProductos();
            setProductos(productosRes.data);
            closeModal();
        } catch (error) {
            console.error("Error al guardar producto:", error.response?.data || error.message);
        }
    };

    // Preparar el formulario para editar
    const handleEdit = (producto) => {
        setEditMode(true);
        setEditProductoId(producto._id);
        Object.keys(producto).forEach((key) => setValue(key, producto[key]));
        openModal();
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        await deleteProducto(id);
        const productosRes = await getAllProductos();
        setProductos(productosRes.data);
    };

    return (
        <>
            <NavBar />
            <SideBar />

            <div className="sm:ml-64 bg-slate-100">
                <div className="p-4 mt-16">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                Agregar Producto
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Nombre</th>
                
                                        <th className="px-4 py-3">Precio</th>
                                        <th className="px-4 py-3">Stock</th>
                                        <th className="px-4 py-3">Categoria</th>
                                        <th className="px-4 py-3">Tienda</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto, index) => (
                                        <tr key={producto._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 flex items-center">
                                                <img
                                                    src={producto.img}
                                                    alt="Product"
                                                    className="w-10 h-10 rounded mr-3"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{producto.descripcion}</p>
                                                    <p className="text-xs text-gray-500">{producto.nombre}</p>
                                                </div>
                                            </td>
                                            
                                            <td className="px-4 py-3">S/{producto.precio}</td>
                                            <td className="px-4 py-3">{producto.stock}</td>
                                            <td className="px-4 py-3">{producto.categoria_id?.nombre || "Sin categoria"}</td>
                                            <td className="px-4 py-3">{producto.tienda_id?.nombre || "Sin tienda"}</td>
                                            <td className="px-4 py-3 space-x-3">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEdit(producto)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(producto._id)}
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
                            {editMode ? "Editar Producto" : "Agregar Producto"}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {"nombre descripcion img".split(" ").map((field) => (
                                <div key={field} className="mb-4">
                                    <label htmlFor={field} className="block text-gray-600 text-sm font-medium">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        className="w-full border border-gray-300 rounded p-2 mt-1"
                                        {...register(field, { required: `${field} es obligatorio` })}
                                    />
                                    {errors[field] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>
                                    )}
                                </div>
                            ))}
                            <div className="mb-4">
                                <label htmlFor="precio" className="block text-gray-600 text-sm font-medium">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    id="precio"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("precio", { required: "El precio es obligatorio", min: 0 })}
                                />
                                {errors.precio && (
                                    <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stock" className="block text-gray-600 text-sm font-medium">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("stock", { required: "El stock es obligatorio", min: 0 })}
                                />
                                {errors.stock && (
                                    <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tienda_id" className="block text-gray-600 text-sm font-medium">
                                    Tienda
                                </label>
                                <select
                                    id="tienda_id"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("tienda_id", { required: "Seleccionar una tienda es obligatorio" })}
                                >
                                    <option value="">Seleccione una tienda</option>
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
                            <div className="mb-4">
                                <label htmlFor="categoria_id" className="block text-gray-600 text-sm font-medium">
                                    Categoría
                                </label>
                                <select
                                    id="categoria_id"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("categoria_id", { required: "Seleccionar una categoría es obligatorio" })}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria._id} value={categoria._id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoria_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.categoria_id.message}</p>
                                )}
                            </div>
                            
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {editMode ? "Actualizar" : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
