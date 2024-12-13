import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllVentas } from "../api/VentaRequest";

export const IngresosPorTienda = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await getAllVentas();
        const tiendas = {};

        res.data.forEach((venta) => {
          const tienda = venta.tienda_id.nombre;
          tiendas[tienda] = (tiendas[tienda] || 0) + venta.total;
        });

        const formattedData = Object.entries(tiendas).map(([key, value]) => ({
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

  return (
    <div className="card bg-white rounded-lg shadow">
      <div className="card-header">
        <p className="card-title text-lg font-semibold text-gray-700 mb-4 text-center">Ingresos por Tienda</p>
      </div>
      <div className="card-body p-0">
        <ResponsiveContainer width={600} height={400}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              cursor={false}
              formatter={(value) => `${value}`}
              contentStyle={{
                backgroundColor: "#f3f4f6",
                border: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />

            <XAxis
              dataKey="name"
              strokeWidth={0}
              stroke="#475569"
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 100)}
            />
            <YAxis
              dataKey="value"
              strokeWidth={0}
              stroke="#475569"
              tickFormatter={(value) => `${value}`}
              tickMargin={6}
              domain={[0, "dataMax"]}
            />

          <Bar dataKey="value" fill="url(#colorTotal)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};