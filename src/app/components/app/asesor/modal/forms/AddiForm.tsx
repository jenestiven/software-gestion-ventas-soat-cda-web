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
  Typography,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { AntdUpload } from "../../../admin/users/AntdUpload";
import { PaymentMethod } from "@/types/types";
import useAddiForm from "@/hooks/use-sale-creation/useAddiForm";

const { Text, Title } = Typography;

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod | null;
}

export default function AddiForm(props: Props) {
  const {
    form,
    fileList,
    setFileList,
    handleSubmit,
    fixedCommission,
    addiCommission,
    partnersCommission,
    profit,
    grossProfit,
    valueToDeposit,
    totalToPay,
  } = useAddiForm(props);

  return (
    <div>
      <Title level={5} className="mb-4 text-center">
        Registrar venta con Addi
      </Title>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          date: dayjs(),
          SOAT_state: "pending",
          soat_payed: false,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="date" label="Fecha" required={true} rules={[{ required: true, message: "Por favor, selecciona una fecha" }]}>
              <DatePicker placeholder="Selecciona una fecha" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="vehicle_type" label="Tipo de vehículo" required={true} rules={[{ required: true, message: "Por favor, selecciona un tipo de vehículo" }]}>
              <Select
                options={[
                  { label: "Moto", value: "motorcycle" },
                  { label: "Carro", value: "car" },
                  { label: "Camioneta", value: "suv" },
                  { label: "Taxi", value: "taxi" },
                ]}
              />
            </Form.Item>

            <Form.Item name="client_name" label="Nombre del cliente" required={true} rules={[{ required: true, message: "Por favor, ingresa el nombre del cliente" }]}>
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="client_id" label="No. Identificación" required={true} rules={[{ required: true, message: "Por favor, ingresa el número de identificación" }]}>
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="plate" label="Placa" required={true} rules={[{ required: true, message: "Por favor, ingresa la placa" }]}>
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="soat_value" label="Valor SOAT" required={true} rules={[{ required: true, message: "Por favor, ingresa el valor del SOAT" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="financed_amount" label="Valor financiado" required={true} rules={[{ required: true, message: "Por favor, ingresa el valor financiado" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="SOAT_state" label="Estado" required={true} rules={[{ required: true, message: "Por favor, selecciona un estado" }]}>
              <Select
                options={[
                  { label: "SOAT Pendiente", value: "pending" },
                  { label: "SOAT Entregado", value: "delivered" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="soat_payed" label="¿Ha pagado el SOAT?" required={true} rules={[{ required: true, message: "Por favor, selecciona una opción" }]}>
              <Select
                options={[
                  { label: "Pagado", value: true },
                  { label: "Pendiente", value: false },
                ]}
              />
            </Form.Item>

            <Form.Item name="invoice_number" label="Número de Factura" required={true} rules={[{ required: true, message: "Por favor, ingresa el número de factura" }]}>
              <Input className="h-8 rounded-md" />
            </Form.Item>

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={4} />
            </Form.Item>

            <AntdUpload fileList={fileList} setFileList={setFileList} />

            <Divider orientation="left">Resumen de venta</Divider>

            <section className="px-4 flex flex-col gap-1">
              <div className="flex justify-between">
                <Text>Comision fija:</Text> $
                {Number(fixedCommission).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Comisión Addi:</Text> $
                {Number(addiCommission).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Comisión Aliados:</Text> $
                {Number(partnersCommission).toLocaleString()}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad:</Text> $
                {profit ? Number(profit).toLocaleString() : 0}
              </div>
              <div className="flex justify-between">
                <Text>Utilidad neta:</Text> $
                {grossProfit ? Number(grossProfit).toLocaleString() : 0}
              </div>
              <div className="flex justify-between">
                <Text>Valor a consignar:</Text> $
                {Number(valueToDeposit).toLocaleString()}
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