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
import { PaymentMethod } from "@/types/types";

type Props = {
  method: PaymentMethod;
  onCloseModal: (open: boolean) => void;
};

export default function CreditCardForm(props: Props) {
  const [form] = Form.useForm();
  const { Text, Title } = Typography;
  const user = useStore((state) => state.user);

  const [datafonoCommission, setDatafonoCommission] = useState(0);
  const [clientCommission, setClientCommission] = useState(0);
  const [fixedCommission, setFixedCommission] = useState(0);
  const [reteica, setReteica] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalToPay, setTotalToPay] = useState(0);
  const [boldDepositValue, setBoldDepositValue] = useState(0);
  const [totalCostTransfer, setTotalCostTransfer] = useState(0);

  // Calcula el cobro del datafono: valor en efectivo + comisión cliente
  const cashValuePayed = Form.useWatch("cash_value_payed", form);
  const creditType = Form.useWatch("credit_type", form);
  const soatValue = Form.useWatch("soat_value", form);
  const vehicleType = Form.useWatch("vehicle_type", form);

  const cobroDatafono = (cashValuePayed || 0) + (clientCommission || 0);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();
    const value = type === "motorcycle" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  useEffect(() => {
    if (!cobroDatafono) return;
    const reteicaValue = cobroDatafono * 0.007;
    setReteica(reteicaValue);
  }, [cobroDatafono]);

  useEffect(() => {
    let commission = 0;

    if (creditType && cobroDatafono) {
      switch (creditType) {
        case "debit":
          commission = (cobroDatafono * 0.0219) + 300;
          break;
        case "credit":
          commission = (cobroDatafono * 0.0269) + 300;
          break;
        case "alkosto":
        case "olimpica":
        case "exito":
        case "american_express":
          commission = (cobroDatafono * 0.0299) + 300;
          break;
        default:
          commission = 0;
      }
    }
    setDatafonoCommission(commission);
  }, [creditType, cobroDatafono]);

  useEffect(() => {
    let commission = 0;
    if (creditType && cashValuePayed) {
      const value = Number(cashValuePayed);
      switch (creditType) {
        case "credit":
          commission = 0.015 * value;
          break;
        case "debit":
          commission = 0.012 * value;
          break;
        case "alkosto":
        case "olimpica":
        case "exito":
        case "american_express":
          commission = 0.015 * value;
          break;
        default:
          commission = 0;
      }
    }
    setClientCommission(commission);
  }, [creditType, cashValuePayed]);

  useEffect(() => {
    const totalToPayValue = (soatValue || 0) + fixedCommission;
    setTotalToPay(totalToPayValue);
  }, [soatValue, fixedCommission]);

  useEffect(() => {
    const boldDepositValueValue = cobroDatafono - datafonoCommission - reteica;
    setBoldDepositValue(boldDepositValueValue);
  }, [cobroDatafono, datafonoCommission, reteica]);

  useEffect(() => {
    const profitValue = boldDepositValue - totalToPay;
    setProfit(profitValue);
  }, [boldDepositValue, totalToPay]);

  useEffect(() => {
    const totalCostTransferValue = boldDepositValue - profit;
    setTotalCostTransfer(totalCostTransferValue);
  }, [boldDepositValue, profit]);

  const onFinish = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);
      const saleData = {
        ...values,
        seller_id: user?.uid,
        sale_summary: {
          datafono_commission: datafonoCommission,
          client_commission: clientCommission,
          fixed_commission: fixedCommission,
          reteica: reteica,
          profit: profit,
          total_to_pay: totalToPay,
          bold_deposit_value: boldDepositValue,
          total_cost_transfer: totalCostTransfer,
        },
      };
      
      await saveSaleApi(saleData);
      message.success("Venta registrada con éxito", 2);
      form.resetFields();
      props.onCloseModal(false);
    } catch (error) {
      message.error("Error al registrar la venta", 2);
    } finally {
      message.destroy();
    }
  };

  return (
    <div>
      <Title level={5} className="mb-4 text-center">
        Registrar venta con Datafono / Tarjeta de crédito
      </Title>

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
              <DatePicker style={{ width: "100%" }} />
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

            <Form.Item
              name="credit_type"
              label="Tipo de tarjeta"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, selecciona un tipo de tarjeta",
                },
              ]}
            >
              <Select
                options={[
                  { label: "Crédito", value: "credit" },
                  { label: "Débito", value: "debit" },
                  { label: "Link de pago", value: "pay_link" },
                  { label: "American Express", value: "american_express" },
                  { label: "Alkosto", value: "alkosto" },
                  { label: "Exito", value: "exito" },
                  { label: "Olimpica", value: "olimpica" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="SOAT_state"
              label="Estado"
              required={true}
              rules={[
                { required: true, message: "Por favor, selecciona un estado" },
              ]}
            >
              <Select
                options={[
                  { label: "SOAT Entregado", value: "delivered" },
                  { label: "SOAT Pendiente", value: "pending" },
                ]}
              />
            </Form.Item>

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={6} />
            </Form.Item>

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4 flex flex-col gap-1">
              <div className="flex justify-between">
                <Text>Comisión datafono:</Text> $
                {datafonoCommission.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Comisión fija:</Text> ${fixedCommission.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Reteica (0.7 %):</Text> ${reteica.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Comisión cliente:</Text> $
                {clientCommission.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Cobro del datafono:</Text> $
                {cobroDatafono.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Valor a consignar Bold:</Text> $
                {boldDepositValue.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad:</Text> ${profit.toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Total a trasferir costos:</Text> $
                {totalCostTransfer.toLocaleString()}
              </div>
              <Divider />
              <div className="flex justify-between">
                <Text strong>Total a pagar:</Text> $
                {totalToPay.toLocaleString()}
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
