import { Modal, Form, Input, message, Button } from "antd";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PlaceCreationModal({ open, onClose }: Props) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("Sede creada con exito");
    onClose();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Error al crear sede");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Crear nueva sede"
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "El nombre es requerido" }]}
        >
          <Input className="h-8 rounded-md" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Dirección"
          rules={[{ required: true, message: "La dirección es requerida" }]}
        >
          <Input className="h-8 rounded-md" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Crear sede
        </Button>
      </Form>
    </Modal>
  );
}
