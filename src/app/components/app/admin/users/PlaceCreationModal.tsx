import {
  createSalesPlaceApi,
  updateSalesPlaceApi,
} from "@/lib/api/salesPlaces";
import { PlacesDataType } from "@/types/types";
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
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onPlaceCreated: () => void;
  placeToEdit: PlacesDataType | null;
};

export default function PlaceCreationModal({
  open,
  onClose,
  onPlaceCreated,
  placeToEdit,
}: Props) {
  const [form] = Form.useForm();

  const isEditMode = !!placeToEdit;

  useEffect(() => {
    if (isEditMode && placeToEdit) {
      form.setFieldsValue({
        name: placeToEdit?.place_name,
        address: placeToEdit?.place_address,
        asesor_sale_commission: placeToEdit?.asesor_sale_commission,
        can_add_profit: placeToEdit?.can_add_profit ?? false,
      });
    } else {
      form.resetFields();
    }
  }, [placeToEdit, form, isEditMode]);

  const onFinish = async (values: any) => {
    try {
      const actionMessage = isEditMode ? "actualizar" : "crear";
      message.loading(`Cargando para ${actionMessage} la sede...`, 0);

      const placeData: PlacesDataType = {
        id: isEditMode ? placeToEdit?.id : "",
        place_name: values.name,
        place_address: values.address,
        asesor_sale_commission: values.asesor_sale_commission,
        can_add_profit: values.can_add_profit ?? false,
      };
      
      if (isEditMode) {
        await updateSalesPlaceApi(placeData);
        message.success("Sede actualizada exitosamente");
      } else {
        await createSalesPlaceApi(placeData);
        message.success("Sede creada exitosamente");
      }

      form.resetFields();
      onPlaceCreated();
    } catch (error) {
      const actionMessage = isEditMode ? "actualizar" : "crear";
      console.error("Error creating/updating place:", error);
      message.error(`Error al ${actionMessage} la sede`);
    } finally {
      message.destroy();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Error al crear sede");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEditMode ? "Editar sede" : "Crear nueva sede"}
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
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          {isEditMode ? "Actualizar sede" : "Crear sede"}
        </Button>
      </Form>
    </Modal>
  );
}
