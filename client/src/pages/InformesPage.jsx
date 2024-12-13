import React, { useState } from 'react';
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/Sidebar';

export function InformesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                                        <th className="px-4 py-3">Marca</th>
                                        <th className="px-4 py-3">Precio</th>
                                        <th className="px-4 py-3">Stock</th>
                                        <th className="px-4 py-3">Stock Minimo</th>
                                        <th className="px-4 py-3">Cantidad Vendida</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">1</td>
                                        <td className="px-4 py-3 flex items-center">
                                            <img
                                                src="https://home.ripley.com.pe/Attachment/WOP_5/2004330618438/2004330618438-1.jpg"
                                                alt="Product"
                                                className="w-10 h-10 rounded mr-3"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">Categoria del producto</p>
                                                <p className="text-xs text-gray-500">
                                                    Nombre del producto
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">Marca del producto</td>
                                        <td className="px-4 py-3">Precio del producto - S/399.99</td>
                                        <td className="px-4 py-3 text-green-500">Stock del producto</td>
                                        <td className="px-4 py-3">Stock minimo del producto</td>
                                        <td className="px-4 py-3">Cantidad Vendida</td>
                                        <td className="px-4 py-3 items-center space-x-3">
                                            {/* Botón Editar */}
                                            <button
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => {}}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15.232 5.232l3.536 3.536M16 8l-9.536 9.536a1.5 1.5 0 01-.768.402l-2.598.52a.75.75 0 01-.902-.902l.52-2.598a1.5 1.5 0 01.402-.768L16 8z"
                                                    />
                                                </svg>
                                            </button>
                                            {/* Botón Eliminar */}
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => {}}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
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
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Agregar Producto</h3>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="productName" className="block text-gray-600 text-sm font-medium">
                                    Nombre del Producto
                                </label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="LAPTOP ASUS VIVOBOOK"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productCategory" className="block text-gray-600 text-sm font-medium">
                                    Categoria del producto
                                </label>
                                <input
                                    type="text"
                                    id="productCategory"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="Laptop"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productImg" className="block text-gray-600 text-sm font-medium">
                                    Imagen del Producto
                                </label>
                                <input
                                    type="text"
                                    id="productImg"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="https://home.ripley.com.pe/Attachment/WOP_5/2004330618438/2004330618438-1.jpg"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productBrand" className="block text-gray-600 text-sm font-medium">
                                    Marca del producto
                                </label>
                                <input
                                    type="text"
                                    id="productBrand"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="Asus"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productPrice" className="block text-gray-600 text-sm font-medium">
                                    Precio
                                </label>
                                <input
                                    type="text"
                                    id="productPrice"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="S/3999.99"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productStock" className="block text-gray-600 text-sm font-medium">
                                    Stock del producto
                                </label>
                                <input
                                    type="text"
                                    id="productStock"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="250"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productStockMin" className="block text-gray-600 text-sm font-medium">
                                    Stock minimo del producto
                                </label>
                                <input
                                    type="text"
                                    id="productStockMin"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="20"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productSold" className="block text-gray-600 text-sm font-medium">
                                    Cantidad Vendida
                                </label>
                                <input
                                    type="text"
                                    id="productSold"
                                    className="w-full border border-gray-300 rounded p-2 mt-1 text-gray-700"
                                    defaultValue="200"
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => {
                                        // Aquí puedes agregar la lógica de guardado
                                        closeModal();
                                    }}
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