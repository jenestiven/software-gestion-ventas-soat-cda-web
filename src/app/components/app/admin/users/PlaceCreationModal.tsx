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
  Divider,
  Steps,
  Space,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import payments from "@/app/api/local/payments-types/payments-types.json";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  onPlaceCreated: () => void;
  placeToEdit: PlacesDataType | null;
};

const { Step } = Steps;

export default function PlaceCreationModal({
  open,
  onClose,
  onPlaceCreated,
  placeToEdit,
}: Props) {
  const [form] = Form.useForm();
  const [conditionalSoat, setConditionalSoat] = useState<
    Record<string, boolean>
  >({});
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<any>({});

  const isEditMode = !!placeToEdit;

  useEffect(() => {
    if (open) {
      if (isEditMode && placeToEdit) {
        const initialValues = {
          name: placeToEdit?.place_name,
          address: placeToEdit?.place_address,
          can_add_profit: placeToEdit?.can_add_profit ?? false,
          ...placeToEdit.fixed_costs,
        };
        form.setFieldsValue(initialValues);
        setFormValues(initialValues);

        const newConditionalSoat: Record<string, boolean> = {};
        payments.forEach((payment) => {
          if (placeToEdit.fixed_costs?.[payment.id]?.conditional) {
            newConditionalSoat[payment.id] = true;
          }
        });
        setConditionalSoat(newConditionalSoat);
      } else {
        form.resetFields();
        setConditionalSoat({});
        setFormValues({});
        setCurrentStep(0);
      }
    }
  }, [placeToEdit, form, isEditMode, open]);

  const onFinish = async (values: any) => {
    const finalValues = { ...formValues, ...values };
    try {
      const actionMessage = isEditMode ? "actualizar" : "crear";
      message.loading(`Cargando para ${actionMessage} la sede...`, 0);

      const fixed_costs: any = {};
      payments.forEach((payment) => {
        fixed_costs[payment.id] = {
          conditional: conditionalSoat[payment.id] ?? false,
          value: finalValues[payment.id]?.value ?? 0,
          value_gt_1m: finalValues[payment.id]?.value_gt_1m ?? 0,
          value_lt_1m: finalValues[payment.id]?.value_lt_1m ?? 0,
        };
        if (payment.id === "cash") {
          fixed_costs[payment.id].transfer_method =
            finalValues[payment.id]?.transfer_method;
        }
      });

      const placeData: PlacesDataType = {
        id: isEditMode ? placeToEdit?.id : "",
        place_name: finalValues.name,
        place_address: finalValues.address,
        can_add_profit: finalValues.can_add_profit ?? false,
        fixed_costs,
      };

      if (isEditMode) {
        console.log("Updating place with data:", placeData);

        await updateSalesPlaceApi(placeData);
        message.success("Sede actualizada exitosamente");
      } else {
        await createSalesPlaceApi(placeData);
        message.success("Sede creada exitosamente");
      }

      form.resetFields();
      onPlaceCreated();
      setCurrentStep(0);
      setFormValues({});
      onClose();
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

  const handleNext = () => {
    form
      .validateFields()
      .then(() => {
        setFormValues({ ...formValues, ...form.getFieldsValue() });
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        console.log("Validation Failed:", err);
      });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Información General",
      content: (
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: "El nombre es requerido" }]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="address"
              label="Dirección"
              rules={[{ required: true, message: "La dirección es requerida" }]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="can_add_profit"
              label="¿Puede agregar utilidades extras?"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    ...payments.map((payment) => ({
      title: payment.name,
      content: (
        <Row gutter={16}>
          <Col span={24}>
            <Divider>{payment.name}</Divider>
            <Form.Item
              label="¿El metodo de pago esta sujeto a una condicion del valor de SOAT mayor a $1.000.000 COP?"
              valuePropName="checked"
            >
              <Switch
                onChange={(checked) =>
                  setConditionalSoat({
                    ...conditionalSoat,
                    [payment.id]: checked,
                  })
                }
                checked={conditionalSoat[payment.id]}
              />
            </Form.Item>
            {conditionalSoat[payment.id] ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={[payment.id, "value_gt_1m"]}
                    label="Costo Fijo (> 1M)"
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={[payment.id, "value_lt_1m"]}
                    label="Costo Fijo (< 1M)"
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <Form.Item name={[payment.id, "value"]} label="Costo Fijo">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            )}
            {payment.id === "cash" && (
              <Form.List name={[payment.id, "transfer_method"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            { required: true, message: "Nombre requerido" },
                          ]}
                        >
                          <Input
                            placeholder="Nombre del método"
                            className="h-8 rounded-md"
                          />
                        </Form.Item>
                        <Tooltip title="¿Este método de transferencia está exento del impuesto 4*1000?">
                          <Form.Item
                            {...restField}
                            name={[name, "is_exempt"]}
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>
                        </Tooltip>
                        <MinusCircleOutlined
                          className="text-red-500"
                          onClick={() => remove(name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add({ is_exempt: false })}
                        block
                        icon={<PlusOutlined />}
                      >
                        Añadir método de transferencia
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            )}
          </Col>
        </Row>
      ),
    })),
  ];

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={isEditMode ? "Editar sede" : "Crear nueva sede"}
      footer={null}
      centered
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={formValues}
      >
        <Steps current={currentStep} size="small">
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>{steps[currentStep].content}</div>
        <div style={{ marginTop: 24, textAlign: "right" }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrev}>
              Anterior
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={handleNext}>
              Siguiente
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Actualizar sede" : "Crear sede"}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
}
