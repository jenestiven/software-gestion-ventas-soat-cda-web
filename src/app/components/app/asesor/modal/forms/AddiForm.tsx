"use client";

import { DeliveredProcedureOutlined, UploadOutlined } from "@ant-design/icons";
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
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Text, Title } = Typography;

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
    <div>
      <Title level={5} className="mb-4 text-center">
        Registrar venta con Addi
      </Title>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          creditDate: dayjs(),
          SOAT_state: "pending",
          soat_payed: false,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="date" label="Fecha">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="vehicle_type" label="Tipo de vehículo">
              <Select
                options={[
                  { label: "Moto", value: "motorbike" },
                  { label: "Carro", value: "car" },
                  { label: "Camioneta", value: "suv" },
                  { label: "Taxi", value: "taxi" },
                ]}
              />
            </Form.Item>

            <Form.Item name="client_name" label="Nombre del cliente">
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="client_id" label="No. Identificación">
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="plate" label="Placa">
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="financed_amount" label="Valor financiado">
              <InputNumber
                style={{ width: "100%" }}
                onChange={calculateDerivedValues}
              />
            </Form.Item>

            <Form.Item name="SOAT_state" label="Estado">
              <Select
                options={[
                  { label: "SOAT Pendiente", value: "pending" },
                  { label: "SOAT Entregado", value: "delivered" },
                ]}
              />
            </Form.Item>

            <Form.Item name="soat_payed" label="¿Ha pagado el SOAT?">
              <Select
                options={[
                  { label: "Pagado", value: true },
                  { label: "Pendiente", value: false },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="invoice_number" label="Número de Factura">
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={7} />
            </Form.Item>

            <Upload>
              <Button icon={<UploadOutlined />}>Subir factura</Button>
            </Upload>

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4 flex flex-col gap-1">
              <div className="flex justify-between">
                <Text>Comision fija:</Text> $15000
              </div>
              <div className="flex justify-between">
                <Text>Comisión Addi:</Text> ${addiCommission.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad:</Text> ${partnersCommission.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad neta:</Text> $
                {partnersCommission.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Valor SOAT:</Text> ${soatValue.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Valor a consignar:</Text> $
                {addiCommission.toLocaleString()}
              </div>
              <Divider />
              <div className="flex justify-between">
                <Text strong>Total a pagar:</Text> $340000
              </div>
              <Divider />
            </section>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item>
              <div className="flex justify-end w-full">
                <Button
                  icon={<DeliveredProcedureOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Registrar venta
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
