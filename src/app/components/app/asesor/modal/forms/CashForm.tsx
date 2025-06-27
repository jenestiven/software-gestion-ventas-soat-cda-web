"use client";
import { Form, Input, InputNumber, DatePicker, Button } from "antd";

export default function CashForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="fecha" label="Fecha">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="tipo" label="Tipo">
        <Input />
      </Form.Item>

      <Form.Item name="cliente" label="Nombre del cliente">
        <Input />
      </Form.Item>

      <Form.Item name="placa" label="Placa">
        <Input />
      </Form.Item>

      <Form.Item name="valorEfectivo" label="Valor efectivo">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="valorSoat" label="Valor SOAT">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="comisionFija" label="Comisión pago a la fija">
        <Input />
      </Form.Item>

      <Form.Item name="totalPagar" label="Total a pagar">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="utilidad" label="Utilidad">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="trafico" label="Trafico">
        <Input />
      </Form.Item>

      <Form.Item name="observaciones" label="Observaciones">
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
}
