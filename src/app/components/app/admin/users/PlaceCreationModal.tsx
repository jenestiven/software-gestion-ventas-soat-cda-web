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
  Radio,
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
  const [baseValueType, setBaseValueType] = useState<Record<string, "fixed" | "dynamic">>({});
  const [paymentMethodStatus, setPaymentMethodStatus] = useState<Record<string, boolean>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<any>({});

  const isEditMode = !!placeToEdit;

  useEffect(() => {
    if (open) {
      if (isEditMode && placeToEdit) {
        const initialValues: any = {
          name: placeToEdit?.place_name,
          address: placeToEdit?.place_address,
        };

        const newBaseValueType: Record<string, "fixed" | "dynamic"> = {};
        const newPaymentMethodStatus: Record<string, boolean> = {};

        payments.forEach((payment) => {
          const cost = placeToEdit.fixed_costs?.[payment.id];
          if (cost) {
            initialValues[payment.id] = {
              base_value: cost.base_value,
              base_value_gt_1m: cost.base_value_gt_1m,
              base_value_lt_1m: cost.base_value_lt_1m,
              can_add_profit: cost.can_add_profit,
              place_profit: cost.place_profit,
              transfer_method: cost.transfer_method,
            };
            newBaseValueType[payment.id] = cost.base_value_type;
            newPaymentMethodStatus[payment.id] = cost.is_active;
          } else {
            newBaseValueType[payment.id] = "fixed";
            newPaymentMethodStatus[payment.id] = true; // Default to active
          }
        });

        form.setFieldsValue(initialValues);
        setFormValues(initialValues);
        setBaseValueType(newBaseValueType);
        setPaymentMethodStatus(newPaymentMethodStatus);
      } else {
        form.resetFields();
        const initialBaseValueType: Record<string, "fixed" | "dynamic"> = {};
        const initialPaymentMethodStatus: Record<string, boolean> = {};
        payments.forEach((payment) => {
          initialBaseValueType[payment.id] = "fixed";
          initialPaymentMethodStatus[payment.id] = true; // Default to active
        });
        setBaseValueType(initialBaseValueType);
        setPaymentMethodStatus(initialPaymentMethodStatus);
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
        const isDynamic = baseValueType[payment.id] === "dynamic";
        const isActive = paymentMethodStatus[payment.id];

        fixed_costs[payment.id] = {
          is_active: isActive,
          base_value_type: baseValueType[payment.id],
          base_value: isActive && !isDynamic ? finalValues[payment.id]?.base_value ?? 0 : 0,
          base_value_gt_1m: isActive && isDynamic ? finalValues[payment.id]?.base_value_gt_1m ?? 0 : 0,
          base_value_lt_1m: isActive && isDynamic ? finalValues[payment.id]?.base_value_lt_1m ?? 0 : 0,
          can_add_profit: isActive ? finalValues[payment.id]?.can_add_profit ?? false : false,
          place_profit: isActive ? finalValues[payment.id]?.place_profit ?? 0 : 0,
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
        fixed_costs,
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
      setCurrentStep(0);
      setFormValues({});
      onClose();
    } catch (error) {
      const actionMessage = isEditMode ? "actualizar" : "crear";
      console.error("Error creating/updating place:", error);
      message.error(`Error al ${actionMessage} la sede`);
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 2000);
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
              name="address"
              label="Dirección"
              rules={[{ required: true, message: "La dirección es requerida" }]}
            >
              <Input className="h-8 rounded-md" />
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
            <Form.Item label={`Activar ${payment.name}`}>
              <Switch
                checked={paymentMethodStatus[payment.id]}
                onChange={(checked) =>
                  setPaymentMethodStatus({
                    ...paymentMethodStatus,
                    [payment.id]: checked,
                  })
                }
              />
            </Form.Item>

            <fieldset disabled={!paymentMethodStatus[payment.id]}>
              <Form.Item label="Tipo de Valor Base">
                <Radio.Group
                  onChange={(e) =>
                    setBaseValueType({
                      ...baseValueType,
                      [payment.id]: e.target.value,
                    })
                  }
                  value={baseValueType[payment.id]}
                >
                  <Radio value="fixed">Fijo</Radio>
                  <Radio value="dynamic">Dinámico</Radio>
                </Radio.Group>
              </Form.Item>

              {baseValueType[payment.id] === "dynamic" ? (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={[payment.id, "base_value_lt_1m"]}
                      label="Valor Base (SOAT < 1,000,000)"
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[payment.id, "base_value_gt_1m"]}
                      label="Valor Base (SOAT > 1,000,000)"
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <Form.Item name={[payment.id, "base_value"]} label="Valor Base">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              )}

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name={[payment.id, "place_profit"]}
                    label="Ganancia de la Sede"
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={[payment.id, "can_add_profit"]}
                    label="¿Puede aumentar sus utilidades?"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

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
            </fieldset>
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
