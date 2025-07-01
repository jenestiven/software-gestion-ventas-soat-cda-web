"use client";
import { DeliveredProcedureOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Typography,
  Select,
  Row,
  Col,
  Divider,
  Upload,
} from "antd";
import dayjs from "dayjs";

export default function SistecreditoForm() {
  const [form] = Form.useForm();
  const { Text, Title } = Typography;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Title level={5} className="mb-4 text-center">
        Registrar venta con Sistecredito
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

            <Form.Item name="financed_amount" label="Valor financiado">
              <InputNumber style={{ width: "100%" }} />
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
            <Form.Item name="sis_status" label="Pagado/pendiente pagar SIS">
              <Select
                options={[
                  { label: "Pagado", value: true },
                  { label: "Pendiente", value: false },
                ]}
              />
            </Form.Item>

            <Form.Item name="pagare_number" label="Pagare">
              <InputNumber placeholder="Escribe el número del pagare" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={5} />
            </Form.Item>

            <Upload>
              <Button icon={<UploadOutlined />}>Subir pagare</Button>
            </Upload>

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4 flex flex-col gap-1">
              <div className="flex justify-between">
                <Text>Comision fija:</Text> $15000
              </div>
              <div className="flex justify-between">
                <Text>Comisión Aliados:</Text> $50000
              </div>
              <div className="flex justify-between">
                <Text>Utilidad bruta:</Text> $2000
              </div>
              <div className="flex justify-between">
                <Text>Utilidad neta:</Text> $50000
              </div>
              <div className="flex justify-between">
                <Text>Valor SOAT:</Text> $2000
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
