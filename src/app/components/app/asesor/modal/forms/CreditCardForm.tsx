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
  Divider,
  Typography,
} from "antd";
import dayjs from "dayjs";

export default function CreditCardForm() {
  const [form] = Form.useForm();
  const { Text, Title } = Typography;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Title level={5} className="mb-4 text-center">
        Registrar venta con Datafono / Tarjeta de crédito
      </Title>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ date: dayjs() }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="date" label="Fecha">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="client_name" label="Nombre del cliente">
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="client_id" label="No. Identificación">
              <Input className="h-8 rounded-md" />
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

            <Form.Item name="plate" label="Placa">
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="cash_value_payed" label="Valor pagado en efectivo">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="financed_amount" label="Valor financiado">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="credit_type" label="Tipo de tarjeta">
              <Select
                options={[
                  { label: "Crédito", value: "credit" },
                  { label: "Débito", value: "debit" },
                  { label: "Link de pago", value: "pay_link" },
                  { label: "American Express", value: "american_express" },
                  { label: "Alkosto", value: "alkosto" },
                  { label: "Exito", value: "exito" },
                  { label: "Olimpica", value: "olimpica" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="SOAT_state" label="Estado">
              <Select
                options={[
                  { label: "SOAT Entregado", value: "delivered" },
                  { label: "SOAT Pendiente", value: "pending" },
                ]}
              />
            </Form.Item>

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={6} />
            </Form.Item>

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4 flex flex-col gap-1">
              <div className="flex justify-between">
                <Text>Comisión datafono:</Text> $15000
              </div>
              <div className="flex justify-between">
                <Text>Comisión fija:</Text> $15000
              </div>
              <div className="flex justify-between">
                <Text>Reteica (0.7 %):</Text> $40000
              </div>
              <div className="flex justify-between">
                <Text>Comisión cliente:</Text> $5000
              </div>
              <div className="flex justify-between">
                <Text>Cobro del datafono:</Text> $4000000
              </div>
              <div className="flex justify-between">
                <Text>Valor a consignar Bold:</Text> $40000
              </div>
              <div className="flex justify-between">
                <Text>Valor SOAT:</Text> $744000
              </div>
              <div className="flex justify-between">
                <Text>Utilidad:</Text> $744000
              </div>
              <div className="flex justify-between">
                <Text>Total a trasferir costos:</Text> $744000
              </div>
              <Divider />
              <div className="flex justify-between">
                <Text strong>Total a pagar:</Text> $340000
              </div>
              <Divider />
            </section>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item className="flex justify-end w-full">
              <Button
                icon={<DeliveredProcedureOutlined />}
                type="primary"
                htmlType="submit"
              >
                Registrar venta
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
