import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllVentas } from "../api/VentaRequest";

export const ProductosMasVendidos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await getAllVentas();
        const productos = {};

        res.data.forEach((venta) => {
          venta.productos.forEach(({ producto_id, cantidad }) => {
            productos[producto_id.nombre] = (productos[producto_id.nombre] || 0) + cantidad;
          });
        });

        const formattedData = Object.entries(productos).map(([key, value]) => ({
          name: key,
          value,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Productos Más Vendidos
      </h2>
      <ResponsiveContainer width={600} height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
