import {
  Modal,
  Form,
  Input,
  message,
  Button,
  InputNumber,
  Switch,
  Row,
  Col,
} from "antd";
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: "El nombre es requerido" }]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
            <Form.Item
              name="asesor_sale_commission"
              label="Comisión aliados"
              rules={[
                {
                  required: true,
                  message: "La comisión para lso aliados es requerida",
                },
              ]}
            >
              <InputNumber
                className="h-8 rounded-md"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Dirección"
              rules={[{ required: true, message: "La dirección es requerida" }]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
            <Form.Item
              name="can_add_profit"
              label="¿Puede agregar utilidades?"
              valuePropName="checked"
              rules={[{ required: true, message: "Este campo es requerido" }]}
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Crear sede
        </Button>
      </Form>
    </Modal>
  );
}
