import { NavBar } from '../components/Navbar'
import { SideBar } from '../components/Sidebar'
import { Package, DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';
import { useState, useEffect } from "react";
import { getAllTiendas } from "../api/TiendaRequest";
import { getAllProductos } from "../api/ProductoRequest";
import { getAllVentas } from "../api/VentaRequest";

import { IngresosPorMes } from "../charts/IngresosPorMes";
import { CategoriasMasVendidas } from "../charts/CategoriasMasVendidas";

export function AnaliticaPage() {
  const [totalTiendas, setTotalTiendas] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [ingresos, setIngresos] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const tiendasRes = await getAllTiendas();
        const productosRes = await getAllProductos();
        const ventasRes = await getAllVentas();

        // Total de tiendas
        setTotalTiendas(tiendasRes.data.length);

        // Total de categorías únicas
        const categoriasUnicas = new Set(productosRes.data.map(producto => producto.categoria));
        setTotalCategorias(categoriasUnicas.size);


        // Calcular ingresos con un descuento del 20%
        const totalIngresos = ventasRes.data.reduce((sum, venta) => sum + venta.total, 0);
        const ingresosConDescuento = totalIngresos * 0.8;
        setIngresos(ingresosConDescuento);

        // Calcular total de ventas (suma de productos vendidos)
        const totalVentas = ventasRes.data.reduce((sum, venta) => {
          return sum + venta.productos.reduce((productoSum, producto) => {
            return productoSum + producto.cantidad;
          }, 0);
        }, 0);
        setVentas(totalVentas);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    loadData();
  }, []);
  
  
  return (
    <>
      <NavBar />
      <SideBar />
      
      <div className="sm:ml-64 bg-slate-100">
        <div className="p-4 mt-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">

            {/* Tarjeta 1 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <Package size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Total de tiendas
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">{totalTiendas}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  25%
                </span>
              </div>

            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <DollarSign size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                Ingresos de la empresa
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg mx-auto">
                <p className="text-3xl font-bold text-blue-500">S/{ingresos.toFixed(2)}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  12%
                </span>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <Users size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Total de categorias
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">{totalCategorias}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  15%
                </span>
              </div>
            </div>

            {/* Tarjeta 4 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <CreditCard size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Ventas
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg mx-auto">
                <p className="text-3xl font-bold text-blue-500">{ventas}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  19%
                </span>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 ">

            {/* Tarjeta 1 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center justify-center gap-4 h-[500px]">
                
                <CategoriasMasVendidas />

              </div>

            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center justify-center mb-4 gap-4 h-[500px]">
                <IngresosPorMes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

