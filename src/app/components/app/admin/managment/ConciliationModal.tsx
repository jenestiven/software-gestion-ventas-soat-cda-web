"use client";

import React, { useState } from "react";
import {
  Modal,
  Button,
  Select,
  DatePicker,
  Upload,
  message,
  Table,
  Spin,
  Space,
} from "antd";
import {
  DownloadOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Sale } from "@/types/types";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ConciliationModalProps {
  visible: boolean;
  onCancel: () => void;
  initialData: Sale[];
}

const ConciliationModal: React.FC<ConciliationModalProps> = ({
  visible,
  onCancel,
  initialData,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [matchedSales, setMatchedSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);

  const handleFindSales = async () => {
    if (!paymentMethod || !dateRange || !file) {
      message.error("Por favor, complete todos los campos.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("paymentMethod", paymentMethod!);

    try {
      const response = await fetch(
        "/api/server/sales/process-conciliation-file",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al procesar el archivo.");
      }

      const { ids } = await response.json();
      findMatches(ids);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const findMatches = (excelIds: (string | number)[]) => {
    const salesToConcile = initialData.filter((sale) => {
      const saleDate = new Date(sale.created_at);
      const [startDate, endDate] = dateRange;

      return (
        sale.payment_method_id === paymentMethod &&
        saleDate >= startDate.toDate() &&
        saleDate <= endDate.toDate() &&
        sale.conciliation_status !== "conciliated"
      );
    });

    const excelIdsSet = new Set(excelIds.map((id) => String(id)));

    const matches = salesToConcile.filter((sale) => {
      const saleId =
        paymentMethod === "sistecredito"
          ? sale.pagare_number
          : paymentMethod === "brilla"
          ? sale.brilla_contract_number
          : sale.invoice_number;

      return excelIdsSet.has(String(saleId));
    });

    setMatchedSales(matches);
    if (matches.length > 0) {
      message.success(`Se encontraron ${matches.length} ventas coincidentes.`);
      setResultsModalVisible(true);
    } else {
      message.info(
        "No se encontraron ventas coincidentes con los criterios seleccionados."
      );
    }
  };

  const handleConciliation = async () => {
    setLoading(true);
    try {
      const saleIds = matchedSales.map((sale) => sale.id);
      const response = await fetch(
        "/api/server/sales/update-conciliation-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ saleIds }),
        }
      );

      if (response.ok) {
        message.success("Ventas conciliadas exitosamente.");
        setResultsModalVisible(false);
        onCancel(); // Cierra el modal principal
      } else {
        message.error("Ocurrió un error al conciliar las ventas.");
      }
    } catch (error) {
      console.error("Error conciliating sales:", error);
      message.error("Ocurrió un error al conciliar las ventas.");
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadTemplate = () => {
    if (!paymentMethod) {
      message.error("Seleccione un método de pago primero.");
      return;
    }
    try {
      const fileUrl = `/templates/${paymentMethod}.xlsx`;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${paymentMethod}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      message.error("No se pudo descargar la plantilla.");
    }
  };

  const handleCancel = () => {
    setPaymentMethod(null);
    setDateRange(null);
    setFile(null);
    setMatchedSales([]);
    onCancel();
  };

  return (
    <>
      <Modal
        title="Conciliación de Facturas"
        open={visible}
        onCancel={handleCancel}
        centered
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            icon={<SearchOutlined />}
            onClick={handleFindSales}
          >
            Encontrar ventas para conciliar
          </Button>,
        ]}
      >
        <Spin spinning={loading} tip="Procesando...">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space direction="horizontal">
              <Select
                placeholder="Método de pago"
                style={{ width: 296 }}
                onChange={(value) => setPaymentMethod(value)}
                value={paymentMethod}
              >
                <Option value="brilla">Brilla</Option>
                <Option value="sistecredito">Sistecredito</Option>
                <Option value="addi">Addi</Option>
              </Select>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleDownloadTemplate}
              >
                Descargar plantilla
              </Button>
            </Space>
            <RangePicker
              style={{ width: "100%" }}
              onChange={(dates) => setDateRange(dates)}
              value={dateRange}
              placeholder={["Fecha inicio", "Fecha fin"]}
            />
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false; // Evita la subida automática
              }}
              onRemove={() => setFile(null)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
            </Upload>
          </Space>
        </Spin>
      </Modal>

      <Modal
        title="Ventas Encontradas para Conciliar"
        open={resultsModalVisible}
        onCancel={() => setResultsModalVisible(false)}
        width={1000}
        centered
        footer={[
          <Button
            type="primary"
            key="conciliate"
            onClick={handleConciliation}
            icon={<SafetyCertificateOutlined />}
          >
            Conciliar
          </Button>,
        ]}
      >
        <Spin spinning={loading} tip="Conciliando...">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space style={{ marginBottom: 16 }}></Space>
            <Table
              dataSource={matchedSales}
              rowKey="id"
              columns={[
                {
                  title: "Fecha",
                  dataIndex: "created_at",
                  key: "date",
                  render: (date: string) => new Date(date).toLocaleDateString(),
                },
                {
                  title: "Id",
                  dataIndex: "",
                  key: "id",
                  render: (_: any, record: Sale) =>
                    paymentMethod === "sistecredito"
                      ? record.pagare_number
                      : paymentMethod === "brilla"
                      ? record.brilla_contract_number
                      : record.invoice_number,
                },
                {
                  title: "Sede",
                  dataIndex: ["sale_place", "place_name"],
                  key: "sale_place",
                  render: (placeName: string) => placeName,
                },
                {
                  title: "Método de Pago",
                  dataIndex: "payment_method_name",
                  key: "payment_method",
                  render: (paymentMethod: string) => paymentMethod,
                },
                {
                  title: "Cliente",
                  dataIndex: ["client_data", "client_name"],
                  key: "client",
                },
                {
                  title: "Vehículo",
                  dataIndex: ["vehicle_data", "vehicle_plate"],
                  key: "vehicle",
                },
                //pagare
                {
                  title: "Valor de venta",
                  dataIndex: ["sale_sumary", "total_payed"],
                  key: "value",
                  render: (value: number) => `${value.toLocaleString("es-CO")}`,
                },
                {
                  title: "Ganancia",
                  dataIndex: ["sale_sumary", "place_total_gains"],
                  key: "value",
                  render: (value: number) => `${value.toLocaleString("es-CO")}`,
                },
              ]}
            />
          </Space>
        </Spin>
      </Modal>
    </>
  );
};

export default ConciliationModal;
