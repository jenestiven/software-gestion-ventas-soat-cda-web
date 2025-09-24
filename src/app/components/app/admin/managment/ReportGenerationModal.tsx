"use client";

import { useState, useEffect } from "react";
import { PlacesDataType } from "@/types/types";
import { Modal, Select, DatePicker, Button, Form } from "antd";
import { getSalesPlacesApi } from "@/lib/api/salesPlaces";

const { RangePicker } = DatePicker;

interface ReportGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: (
    salesPlaceId: string,
    startDate: string,
    endDate: string
  ) => void;
}

export default function ReportGenerationModal({
  isOpen,
  onClose,
  onGenerateReport,
}: ReportGenerationModalProps) {
  const [salesPlaces, setSalesPlaces] = useState<PlacesDataType[]>([]);  
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      const fetchSalesPlaces = async () => {
        try {
          const places = await getSalesPlacesApi();          
          setSalesPlaces(places);
        } catch (error) {
          console.error("Error fetching sales places:", error);
        }
      };
      fetchSalesPlaces();
    }
  }, [isOpen]);

  const handleSubmit = (values: any) => {
    const { salesPlace, dateRange } = values;
    if (salesPlace && dateRange) {
      const [startDate, endDate] = dateRange;
      onGenerateReport(
        salesPlace,
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      );
      onClose();
      form.resetFields();
    }
  };

  return (
    <Modal
      title="Generar Reporte de Ventas"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="salesPlace"
          label="Sede"
          rules={[
            { required: true, message: "Por favor, seleccione una sede" },
          ]}
        >
          <Select placeholder="Seleccione una sede">
            {salesPlaces?.map((place) => (
              <Select.Option key={place.id} value={place.id}>
                {place.place_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dateRange"
          label="Rango de Fechas"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione un rango de fechas",
            },
          ]}
        >
          <RangePicker placeholder={["Fecha de inicio", "Fecha de fin"]} className="w-full" />
        </Form.Item>
        <Form.Item className="flex justify-end gap-4">
          <Button onClick={onClose}>Cancelar</Button>
          <Button className="ml-2" type="primary" htmlType="submit">
            Generar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
