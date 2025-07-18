"use client";

import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
  UploadFile,
  UploadProps,
  GetProp,
} from "antd";
import React, { useState, useEffect } from "react";
import { AntdUpload, getBase64 } from "./AntdUpload";
import { createUserApi, updateUserApi } from "@/lib/api/users";
import { DbUser } from "@/types/types";
import useStore from "@/store";

type Props = {
  open: boolean;
  onClose: () => void;
  onUserCreated: () => void; // Re-used for both create and update
  userToEdit?: DbUser | null;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function UserCreationModal({
  open,
  onClose,
  onUserCreated,
  userToEdit,
}: Props) {
  const [form] = Form.useForm();
  const [rol, setRol] = useState<"admin" | "asesor">();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const salesPlaces = useStore((state) => state.salesPlaces);
  const isEditMode = !!userToEdit;

  useEffect(() => {
    if (isEditMode && userToEdit) {
      form.setFieldsValue({
        name: userToEdit.name,
        tel: userToEdit.tel,
        email: userToEdit.email,
        rol: userToEdit.role,
        sales_place: userToEdit.sales_place,
        // La cédula no se puede editar, pero la mostramos deshabilitada
        cc: "********",
      });
      setRol(userToEdit.role as "admin" | "asesor");
      if (userToEdit.thumbnail) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: userToEdit.thumbnail,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [userToEdit, form, isEditMode]);

  const onFinish = async (values: any) => {
    try {
      const actionMessage = isEditMode ? "Actualizando" : "Creando";
      message.loading(`${actionMessage} usuario...`);

      let file = null;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        file = await getBase64(fileList[0].originFileObj as FileType);
      }

      if (isEditMode) {
        const userData = {
          uid: userToEdit!.uid,
          name: values.name,
          tel: values.tel,
          role: values.rol,
          sales_place: values?.sales_place || null,
          file: file ?? null,
        };
        await updateUserApi(userData);
        message.success("Usuario actualizado con éxito");
      } else {
        const userData = {
          email: values.email,
          name: values.name,
          tel: values.tel,
          rol: values.rol,
          cc: values.cc,
          sales_place: values?.sales_place || "",
          file: file ?? null,
        };
        await createUserApi(userData);
        message.success("Usuario creado con éxito");
      }

      form.resetFields();
      onUserCreated(); // This will trigger router.refresh()
    } catch (error) {
      const actionMessage = isEditMode ? "actualizar" : "crear";
      console.error(`Error ${actionMessage} usuario:`, error);
      message.error(`Error al ${actionMessage} el usuario`);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEditMode ? "Editar Usuario" : "Crear Nuevo Usuario"}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
              name="cc"
              label="Cédula"
              rules={[{ required: true, message: "La cédula es requerida" }]}
            >
              <Input className="h-8 rounded-md" disabled={isEditMode} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="tel"
              label="Telefono"
              rules={[{ required: true, message: "El telefono es requerido" }]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Correo electronico"
              rules={[{ required: true, message: "El correo electronico es requerido" }]}
            >
              <Input className="h-8 rounded-md" disabled={isEditMode} />
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
          {rol === "asesor" && (
            <Col span={12}>
              <Form.Item name="sales_place" label="Punto de venta">
                <Select>
                  {salesPlaces.map((place) => (
                    <Select.Option key={place.id} value={place.id}>
                      {place.place_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Foto de perfil">
              <AntdUpload fileList={fileList} setFileList={setFileList} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Actualizar Usuario" : "Crear Usuario"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
