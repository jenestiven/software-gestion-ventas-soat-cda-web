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

export default function CashForm() {
  const [form] = Form.useForm();
  const { Text } = Typography;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Typography.Title level={5} className="mb-4 text-center">
        Registrar venta en efectivo
      </Typography.Title>

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
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={5} />
            </Form.Item>

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4">
              <div className="flex justify-between">
                <Text>Comision fija:</Text> $15000
              </div>

              <div className="flex justify-between">
                <Text>Utilidad:</Text> $20000
              </div>

              <div className="flex justify-between">
                <Text>Valor SOAT:</Text> $300000
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
