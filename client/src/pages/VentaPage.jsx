import { useState, useEffect } from "react";
import { NavBar } from "../components/Navbar";
import { SideBar } from "../components/Sidebar";
import { getAllVentas, createVenta } from "../api/VentaRequest";
import { getAllClientes } from "../api/ClienteRequest";
import { getAllProductos } from "../api/ProductoRequest";
import { getAllTiendas } from "../api/TiendaRequest";
import { useForm } from "react-hook-form";

export function VentaPage() {
    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(0);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        async function loadData() {
            const ventasRes = await getAllVentas();
            const clientesRes = await getAllClientes();
            const productosRes = await getAllProductos();
            const tiendasRes = await getAllTiendas();

            setVentas(ventasRes.data);
            setClientes(clientesRes.data);
            setProductos(productosRes.data);
            setTiendas(tiendasRes.data);
        }
        loadData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setSelectedProducts([]);
    };

    const addProduct = () => {
        if (!productoSeleccionado || cantidadSeleccionada <= 0) {
            alert("Seleccione un producto y asegúrese de ingresar una cantidad válida.");
            return;
        }
        const product = productos.find(p => p._id === productoSeleccionado);
        if (product) {
            const subtotal = cantidadSeleccionada * product.precio;
            setSelectedProducts(prev => [...prev, { producto_id: productoSeleccionado, nombre: product.nombre, cantidad: cantidadSeleccionada, subtotal }]);
            setProductoSeleccionado("");
            setCantidadSeleccionada(0);
        }
    };


    const removeProduct = (index) => {
        setSelectedProducts(prev => prev.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((sum, product) => sum + product.subtotal, 0);
    };

    const onSubmit = async (data) => {
        try {
            data.productos = selectedProducts.map(({ producto_id, cantidad, subtotal }) => ({ producto_id, cantidad, subtotal }));
            data.total = calculateTotal();
            await createVenta(data);
            const ventasRes = await getAllVentas();
            setVentas(ventasRes.data);
            closeModal();
        } catch (error) {
            console.error("Error al crear venta:", error.response?.data || error.message);
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
                            <h2 className="text-lg font-semibold text-gray-700">Ventas</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                Registrar Venta
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Tienda</th>
                                        <th className="px-4 py-3">Cliente</th>
                                        <th className="px-4 py-3">Total</th>
                                        <th className="px-4 py-3">Fecha</th>
                                        <th className="px-4 py-3">Productos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventas.map((venta, index) => (
                                        <tr key={venta._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{venta.tienda_id?.nombre || "Sin tienda"}</td>
                                            <td className="px-4 py-3">{venta.cliente_id?.nombre || "Sin cliente"}</td>
                                            <td className="px-4 py-3">S/{venta.total}</td>
                                            <td className="px-4 py-3">{new Date(venta.fecha).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">
                                                {venta.productos.map((p, i) => (
                                                    <div key={i} className="text-sm text-gray-700">
                                                        {p.producto_id?.nombre || "Producto desconocido"} (x{p.cantidad}) - S/{p.subtotal}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Registrar Venta</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <label htmlFor="cliente_id" className="block text-gray-600 text-sm font-medium">
                                    Cliente
                                </label>
                                <select
                                    id="cliente_id"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("cliente_id", { required: "Seleccionar un cliente es obligatorio" })}
                                >
                                    <option value="">Seleccione un cliente</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente._id} value={cliente._id}>
                                            {cliente.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.cliente_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.cliente_id.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="producto" className="block text-gray-600 text-sm font-medium">
                                    Producto
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        id="producto"
                                        className="flex-1 border border-gray-300 rounded p-2 mt-1"
                                        value={productoSeleccionado}
                                        onChange={(e) => setProductoSeleccionado(e.target.value)}
                                    >
                                        <option value="">Seleccione un producto</option>
                                        {productos.map((producto) => (
                                            <option key={producto._id} value={producto._id}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        className="w-24 border border-gray-300 rounded p-2 mt-1"
                                        placeholder="Cantidad"

                                        value={cantidadSeleccionada}
                                        onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value, 10) || 0)}
                                    />

                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={() => addProduct(productoSeleccionado, cantidadSeleccionada)}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-gray-700 text-sm font-medium mb-2">Productos Seleccionados</h4>
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="bg-gray-100 text-gray-700 uppercase">
                                        <tr>
                                            <th className="px-4 py-3">Producto</th>
                                            <th className="px-4 py-3">Cantidad</th>
                                            <th className="px-4 py-3">Subtotal</th>
                                            <th className="px-4 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProducts.map((product, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-3">{product.nombre}</td>
                                                <td className="px-4 py-3">{product.cantidad}</td>
                                                <td className="px-4 py-3">S/{product.subtotal.toFixed(2)}</td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        type="button"
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        onClick={() => removeProduct(index)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="text-right mt-2 text-gray-700 font-medium">
                                    Total: S/{calculateTotal().toFixed(2)}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Guardar Venta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}