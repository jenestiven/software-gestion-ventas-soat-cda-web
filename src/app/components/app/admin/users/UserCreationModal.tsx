"use client";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import React from "react";
import { AntdUpload } from "./AntdUpload";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function UserCreationModal({ open, onClose }: Props) {
  const [form] = Form.useForm();
  const [rol, setRol] = React.useState<"admin" | "asesor">();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("Usuario creado con exito");
    onClose();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Error al crear el usuario");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Crear nuevo usuario"
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
          </Col>
          <Col span={12}>
            <Form.Item
              name="tel"
              label="Telefono"
              rules={[{ required: true, message: "El telefono es requerido" }]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Correo electronico"
              rules={[
                {
                  required: true,
                  message: "El email es requerido",
                  type: "email",
                },
              ]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rol"
              label="Rol"
              rules={[{ required: true, message: "El rol es requerido" }]}
            >
              <Select onChange={(value) => setRol(value)}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="asesor">Asesor</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {rol === "asesor" && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="place"
                label="Punto de venta"
                rules={[
                  { required: true, message: "El punto de venta es requerido" },
                ]}
              >
                <Select>
                  <Select.Option value="Moto GP">Moto GP</Select.Option>
                  <Select.Option value="Punto vial">Punto vial</Select.Option>
                  <Select.Option value="asesorias KG">
                    Asesorias KG
                  </Select.Option>
                  <Select.Option value="TCC">TCC</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="thumbnail" label="Foto de perfil">
              <AntdUpload />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Crear usuario
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
