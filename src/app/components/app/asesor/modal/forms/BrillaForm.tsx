"use client";
import { Form, Input, InputNumber, DatePicker, Button } from "antd";

export default function BrillaForm() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="fechaCredito" label="Fecha crédito">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="tipo" label="Tipo">
        <Input />
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

      <Form.Item name="valorFinanciado" label="Valor financiado">
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

      <Form.Item name="trafico" label="Trafico">
        <Input />
      </Form.Item>

      <Form.Item name="utilidadBruta" label="Utilidad Bruta">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="comisionAliados" label="Comisión Aliados">
        <Input />
      </Form.Item>

      <Form.Item name="utilidadNeta" label="Utilidad Neta">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="estado" label="Estado">
        <Input />
      </Form.Item>

      <Form.Item name="soatPagado" label="SOAT Pagado">
        <Input />
      </Form.Item>

      <Form.Item name="pagadoBrilla" label="Pagado/pendiente pagar - BRILLA">
        <Input />
      </Form.Item>

      <Form.Item name="contratoBrilla" label="Contrato Brilla">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="actas" label="ACTAS">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
}
