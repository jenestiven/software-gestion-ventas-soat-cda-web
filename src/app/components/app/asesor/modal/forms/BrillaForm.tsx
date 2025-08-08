"use client";

import { DeliveredProcedureOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Typography,
  Row,
  Col,
  Select,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { AntdUpload } from "../../../admin/users/AntdUpload";
import { PaymentMethod } from "@/types/types";
import useBrillaForm from "@/hooks/use-sale-creation/useBrillaForm";

const { Text, Title } = Typography;

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod | null;
};

export default function BrillaForm(props: Props) {
  const {
    form,
    fileList,
    setFileList,
    onFinish,
    fixedCommission,
    partnersCommission,
    profit,
    grossProfit,
    totalToPay,
  } = useBrillaForm(props);

  return (
    <div>
      <Title level={5} className="mb-4 text-center">
        Registrar venta con Brilla
      </Title>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ date: dayjs() }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="date" label="Fecha">
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

            <Form.Item
              name="financed_amount"
              label="Valor financiado"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el valor financiado",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="soat_state"
              label="Estado"
              required={true}
              rules={[
                { required: true, message: "Por favor, selecciona un estado" },
              ]}
            >
              <Select
                options={[
                  { label: "SOAT Pendiente", value: "pending" },
                  { label: "SOAT Entregado", value: "delivered" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="soat_payed"
              label="¿Ha pagado el SOAT?"
              required={true}
              rules={[
                { required: true, message: "Por favor, selecciona una opción" },
              ]}
            >
              <Select
                options={[
                  { label: "Pagado", value: true },
                  { label: "Pendiente", value: false },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="brilla_payed"
              label="Pagado/pendiente pagar - BRILLA"
              required={true}
              rules={[
                { required: true, message: "Por favor, selecciona una opción" },
              ]}
            >
              <Select
                options={[
                  { label: "Pagado", value: true },
                  { label: "Pendiente", value: false },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="brilla_contract_number"
              label="Contrato Brilla"
              required={true}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el número de contrato",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="proceedings" label="Actas">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <AntdUpload fileList={fileList} setFileList={setFileList} />

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4 flex flex-col gap-1">
              <div className="flex justify-between">
                <Text>Comision fija:</Text> $
                {Number(fixedCommission).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Comisión Aliados:</Text> $
                {Number(partnersCommission).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad bruta:</Text> $
                {profit ? Number(profit).toLocaleString() : 0}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad neta:</Text> $
                {grossProfit ? Number(grossProfit).toLocaleString() : 0}
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
            <Form.Item>
              <div className="flex justify-end w-full">
                <Button
                  icon={<DeliveredProcedureOutlined />}
                  type="primary"
                  htmlType="submit"
                >
                  Registrar venta
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}