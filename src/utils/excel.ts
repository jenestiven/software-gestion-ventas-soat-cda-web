import ExcelJS from "exceljs";
import { Sale, DbSalesPlace, PlacesDataType } from "@/types/types";

export const generateSalesReport = async (
  salesData: Sale[],
  salesPlace: PlacesDataType,
  startDate: string,
  endDate: string
) => {  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Reporte de Ventas");

  // Información de la Sede y Fechas
  worksheet.mergeCells("A1:F1");
  worksheet.getCell(
    "A1"
  ).value = `Reporte de Ventas - ${salesPlace.place_name}`;
  worksheet.getCell("A1").font = { bold: true, size: 16 };
  worksheet.getCell("A1").alignment = { horizontal: "center" };

  worksheet.mergeCells("A2:F2");
  worksheet.getCell("A2").value = `Dirección: ${salesPlace.place_address}`;
  worksheet.getCell("A2").alignment = { horizontal: "center" };

  worksheet.mergeCells("A3:F3");
  worksheet.getCell("A3").value = `Periodo: ${startDate} - ${endDate}`;
  worksheet.getCell("A3").alignment = { horizontal: "center" };

  worksheet.addRow([]); // Espacio

  // Encabezados de la tabla
  const headers = [
    "Fecha de Venta",
    "Método de Pago",
    "Placa del Vehículo",
    "Valor Financiado",
    "Ganancia por Venta",
  ];
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" }, // Gris claro
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Datos de las ventas
  let totalProfit = 0;
  salesData.forEach((sale) => {
    const financedValue = sale.financed_amount || 0;
    const profit = salesPlace.main_place ? sale.sale_sumary.profit : sale.sale_sumary.place_total_gains || 0;
    totalProfit += profit;

    const row = worksheet.addRow([
      new Date(sale.created_at).toLocaleString("es-CO"),
      sale.payment_method_name,
      sale.vehicle_data.vehicle_plate.toUpperCase(),
      financedValue,
      profit,
    ]);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Fila de totales
  const totalRow = worksheet.addRow(["Total", "", "", "", totalProfit]);
  totalRow.font = { bold: true };
  totalRow.getCell(1).alignment = { horizontal: "right" };
  worksheet.mergeCells(`A${totalRow.number}:D${totalRow.number}`);

  // Ajustar ancho de columnas
  worksheet.columns.forEach((column) => {
    if (column.eachCell) {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 12 ? 12 : maxLength + 2;
    }
  });

  // Descargar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Reporte_Ventas_${salesPlace.place_name}_${startDate}_${endDate}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
};
