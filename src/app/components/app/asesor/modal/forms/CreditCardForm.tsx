"use client";
import { Form, Input, InputNumber, DatePicker, Button } from "antd";

export default function CreditCardForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="fecha" label="Fecha">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="cliente" label="Nombre del cliente">
        <Input />
      </Form.Item>

      <Form.Item name="identificacion" label="Identificación">
        <Input />
      </Form.Item>

      <Form.Item name="placa" label="Placa">
        <Input />
      </Form.Item>

      <Form.Item name="valorEfectivo" label="Valor efectivo">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="tipoTarjeta" label="Tipo de tarjeta">
        <Input />
      </Form.Item>

      <Form.Item name="comisionDatafono" label="Comisión Datafono">
        <Input />
      </Form.Item>

      <Form.Item name="reteica" label="Reteica (0.7%)">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="comisionCliente" label="Comisión cliente">
        <Input />
      </Form.Item>

      <Form.Item name="valorCobrar" label="Valor a cobrar por el datafono">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="valorConsignar" label="Valor a consignar Bold">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="comisionFija" label="Comisión pago a la fija">
        <Input />
      </Form.Item>

      <Form.Item name="totalPagarSOAT" label="Total a pagar plataforma SOAT">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="utilidad" label="Utilidad">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="totalTransferir" label="Total a transferir - Costos">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="estado" label="Conciliado/Pdte conciliar">
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
