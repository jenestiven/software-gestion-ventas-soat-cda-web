import * as ExcelJS from 'exceljs';

export const processConciliationFile = async (file: File, paymentMethod: string): Promise<(string | number)[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const worksheet = workbook.worksheets[0];
  const sheetValues = worksheet.getSheetValues();

  const headerRowIndex = sheetValues.findIndex(row => Array.isArray(row) && row.length > 0);
  if (headerRowIndex === -1) {
      throw new Error("El archivo de Excel está vacío o tiene un formato incorrecto.");
  }

  const header = sheetValues[headerRowIndex] as any[];
  const dataRows = sheetValues.slice(headerRowIndex + 1);

  const idColumnName =
    paymentMethod === "sistecredito"
      ? "Pagaré"
      : paymentMethod === "brilla"
      ? "Contrato"
      : "ID Crédito";

  const idColumnIndex = header.findIndex(cell => typeof cell === 'string' && cell.trim().toLowerCase() === idColumnName.toLowerCase());

  if (idColumnIndex === -1) {
    throw new Error(`No se encontró la columna de identificación '${idColumnName}'.`);
  }

  const ids = dataRows
    .map((row: any) => (row && row[idColumnIndex] ? row[idColumnIndex] : null))
    .filter(id => id !== null && id !== undefined);

  return ids;
};