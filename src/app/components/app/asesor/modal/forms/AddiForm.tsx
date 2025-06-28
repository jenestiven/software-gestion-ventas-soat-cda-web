"use client";

import { DeliveredProcedureOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Row,
  Col,
  Select,
  Typography,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function AddiForm() {
  const [form] = Form.useForm();

  const [addiCommission, setAddiCommission] = useState(15000);
  const [partnersCommission, setPartnersCommission] = useState(2000);
  const [soatValue, setSoatValue] = useState(180000);
  const [fixedCommission, setFixedCommission] = useState(0);

  const vehicleType = Form.useWatch("vehicleType", form);
  const financedAmount = Form.useWatch("financedAmount", form);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();
    const value = type === "moto" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  const calculateDerivedValues = () => {
    const financed = Number(financedAmount || 0);
    const totalToPay = soatValue + fixedCommission;
    const grossProfit = financed - addiCommission - totalToPay;
    const netProfit = grossProfit - partnersCommission;

    form.setFieldsValue({
      totalToPay,
      grossProfit,
      netProfit,
      amountToDeposit: financed - addiCommission,
    });
  };

  useEffect(() => {
    calculateDerivedValues();
  }, [financedAmount, fixedCommission]);

  const handleSubmit = (values: any) => {
    console.log("Submitted:", values);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        creditDate: dayjs(),
        status: "pending",
        soatPaid: "no",
        vehicleType: "motorbike",
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item name="creditDate" label="Fecha de Crédito">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="vehicleType" label="Tipo de Vehículo">
            <Select
              options={[
                { label: "Moto", value: "motorbike" },
                { label: "Carro", value: "car" },
                { label: "Camioneta", value: "suv" },
                { label: "Taxi", value: "taxi" },
              ]}
            />
          </Form.Item>

          <Form.Item name="customerName" label="Nombre del Cliente">
            <Input className="h-8 rounded-md" />
          </Form.Item>

          <Form.Item name="idNumber" label="No. identificación">
            <Input className="h-8 rounded-md" />
          </Form.Item>

          <Form.Item name="licensePlate" label="Placa">
            <Input className="h-8 rounded-md" />
          </Form.Item>

          <Form.Item name="financedAmount" label="Valor Financiado">
            <InputNumber
              style={{ width: "100%" }}
              onChange={calculateDerivedValues}
            />
          </Form.Item>

          <Form.Item name="status" label="Estado">
            <Select
              options={[
                { label: "Pendiente", value: "pending" },
                { label: "Entregado", value: "delivered" },
              ]}
            />
          </Form.Item>

          <Form.Item name="soatPaid" label="¿Ha pagado el SOAT?">
            <Select
              options={[
                { label: "Si", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="invoiceNumber" label="Número de Factura">
            <Input className="h-8 rounded-md" />
          </Form.Item>
          <Form.Item name="remarks" label="Observaciones">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Divider orientation="right">Resumen</Divider>
          <Text strong>Comision fija:</Text> $15000
          <br />
          <Text strong>SOAT Value:</Text> ${soatValue.toLocaleString()}
          <br />
          <Text strong>Addi Commission:</Text> $
          {addiCommission.toLocaleString()}
          <br />
          <Text strong>Partners Commission:</Text> $
          {partnersCommission.toLocaleString()}
          <Divider />
          <Text strong>Total a pagar:</Text> $340000
          <Form.Item>
            <Button
              icon={<DeliveredProcedureOutlined />}
              type="primary"
              htmlType="submit"
            >
              Guardar venta
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
