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
  Cascader,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { PaymentMethod, Tariff } from "@/types/types";
import useDataphoneForm from "@/hooks/use-sale-creation/useDataphoneForm";
import { moneyFormat } from "@/utils/utils";

type Props = {
  method: PaymentMethod;
  onCloseModal: (open: boolean) => void;
  tariffSchedule: Tariff;
};

export default function DataphoneForm(props: Props) {
  const { Text, Title } = Typography;
  const {
    form,
    onFinish,
    cascaderOptions,
    isSoatValueDisabled,
    setIsSoatValueDisabled,
    datafonoCommission,
    fixedCommission,
    reteica,
    clientCommission,
    cobroDatafono,
    boldDepositValue,
    profit,
    totalCostTransfer,
    place_total_gains,
    user,
    coop,
  } = useDataphoneForm(props);

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
              <Cascader
                options={cascaderOptions}
                placeholder="Selecciona un tipo de vehículo"
                style={{ width: "100%" }}
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

            <Form.Item name="cooperative" label="¿Es venta de aliado?">
              <Switch />
            </Form.Item>

            <div className="flex items-center gap-2">
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
                className="flex-grow "
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled={isSoatValueDisabled}
                />
              </Form.Item>
              <Button
                className="mt-1.5"
                onClick={() => setIsSoatValueDisabled(!isSoatValueDisabled)}
              >
                {isSoatValueDisabled ? "Habilitar" : "Deshabilitar"}
              </Button>
            </div>
          </Col>
          <Col xs={24} sm={12}>
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

            {coop && <Form.Item
              name="custom_base_value"
              label="Valor base personalizado"
              required={true}
              rules={[
                { required: true, message: "Por favor, ingresa el valor base personalizado" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>}

             {coop && <Form.Item
              name="custom_place_profit"
              label="Ganancia del aliado personalizada"
              required={true}
              rules={[
                { required: true, message: "Por favor, ingresa la ganancia del aliado personalizada" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>}

            {props.method.fixedCost?.can_add_profit && (
              <Form.Item
                name="place_profit"
                label="Utilidad"
                required={true}
                rules={[
                  { required: true, message: "Por favor, ingresa la utilidad" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            )}

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={4} />
            </Form.Item>

            {user?.main_place ? (
              <>
                <Divider orientation="left">Resumen de venta</Divider>

                <section className="px-4 flex flex-col gap-1">
                  <div className="flex justify-between">
                    <Text>Comisión datafono:</Text> $
                    {moneyFormat(datafonoCommission)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Comisión fija:</Text> ${moneyFormat(fixedCommission)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Reteica (0.7 %):</Text> ${moneyFormat(reteica)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Comisión cliente:</Text> $
                    {moneyFormat(clientCommission)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Cobro del datafono:</Text> $
                    {moneyFormat(cobroDatafono)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Valor a consignar Bold:</Text> $
                    {moneyFormat(boldDepositValue)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Utilidad:</Text> ${moneyFormat(profit)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Total a trasferir costos:</Text> $
                    {moneyFormat(totalCostTransfer)}
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <Text strong>Total a pagar:</Text> $
                    {moneyFormat(cobroDatafono)}
                  </div>
                  <Divider />
                </section>
              </>
            ) : (
              <>
                <Divider />
                <div className="px-4">
                  <div className="flex justify-between">
                    <Text>Ganancias:</Text> ${moneyFormat(place_total_gains)}
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Total a pagar:</Text> $
                    {moneyFormat(cobroDatafono)}
                  </div>
                </div>
              </>
            )}
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
