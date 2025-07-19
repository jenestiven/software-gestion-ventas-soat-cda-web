"use client";

import { DeliveredProcedureOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Row,
  Col,
  Select,
  Divider,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useStore from "@/store";
import { saveSaleApi } from "@/lib/api/sales";

type Props = {
  onCloseModal: (open: boolean) => void;
};

export default function CashForm(props: Props) {
  const [form] = Form.useForm();
  const { Text } = Typography;
  const user = useStore((state) => state.user);

  const [fixedCommission, setFixedCommission] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);

  const vehicleType = Form.useWatch("vehicle_type", form);
  const inCashValue = Form.useWatch("cash_value_payed", form);
  const soatValue = Form.useWatch("soat_value", form);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();

    const value = type === "motorcycle" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  useEffect(() => {
    const profitValue = (inCashValue || 0) - totalToPay;
    setProfit(Number(profitValue.toFixed(1)));
  }, [totalToPay, inCashValue]);

  useEffect(() => {
    const value = (soatValue || 0) + fixedCommission;
    setTotalToPay(Number(value.toFixed(1)));
  }, [soatValue, fixedCommission]);

  const onFinish = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);
      const saleData = {
        ...values,
        seller_id: user?.uid,
        sale_summary: {
          fixed_commission: fixedCommission,
          profit: profit,
          total_to_pay: totalToPay,
        },
      };

      console.log("Submitting to API:", saleData);
      await saveSaleApi(saleData);
      message.success("Venta registrada exitosamente");
      form.resetFields();
      props.onCloseModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      message.destroy();
    }
  };

  return (
    <div>
      <Typography.Title level={5} className="mb-4 text-center">
        Registrar venta en efectivo
      </Typography.Title>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ date: dayjs() }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="date"
              label="Fecha"
              required={true}
              rules={[
                { required: true, message: "Por favor, selecciona una fecha" },
              ]}
            >
              <DatePicker
                placeholder="Selecciona una fecha"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="client_name"
              label="Nombre del cliente"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre del cliente",
                },
              ]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item
              name="client_id"
              label="No. Identificación"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el número de identificación",
                },
              ]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item
              name="vehicle_type"
              label="Tipo de vehículo"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, selecciona un tipo de vehículo",
                },
              ]}
            >
              <Select
                options={[
                  { label: "Moto", value: "motorcycle" },
                  { label: "Carro", value: "car" },
                  { label: "Camioneta", value: "suv" },
                  { label: "Taxi", value: "taxi" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="plate"
              label="Placa"
              required={true}
              rules={[
                { required: true, message: "Por favor, ingresa la placa" },
              ]}
            >
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item
              name="soat_value"
              label="Valor SOAT"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el valor del SOAT",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="cash_value_payed"
              label="Valor pagado en efectivo"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el valor pagado en efectivo",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={5} />
            </Form.Item>

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4">
              <div className="flex justify-between">
                <Text>Comision fija:</Text> $
                {Number(fixedCommission).toLocaleString()}
              </div>

              <div className="flex justify-between">
                <Text>Utilidad:</Text> $
                {profit ? Number(profit).toLocaleString() : 0}
              </div>

              <Divider />

              <div className="flex justify-between">
                <Text strong>Total a pagar:</Text> $
                {totalToPay ? Number(totalToPay).toLocaleString() : 0}
              </div>

              <Divider />
            </section>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item className="flex justify-end w-full">
              <Button
                icon={<DeliveredProcedureOutlined />}
                type="primary"
                htmlType="submit"
              >
                Registrar venta
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
