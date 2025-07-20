"use client";

import { saveSaleApi } from "@/lib/api/sales";
import useStore from "@/store";
import { DeliveredProcedureOutlined, UploadOutlined } from "@ant-design/icons";
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
  message,
  UploadFile,
  GetProp,
  UploadProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AntdUpload, getBase64 } from "../../../admin/users/AntdUpload";
import { PaymentMethod } from "@/types/types";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod | null;
}

export default function AddiForm(props: Props) {
  const [form] = Form.useForm();
  const user = useStore((state) => state.user);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  
  const [addiCommission, setAddiCommission] = useState(0);
  const [partnersCommission, setPartnersCommission] = useState(
    user?.sale_data?.asesor_sale_commission || 0
  );
  const [totalToPay, setTotalToPay] = useState(0);
  const [valueToDeposit, setValueToDeposit] = useState(0);
  const [fixedCommission, setFixedCommission] = useState(0);
  const [profit, setProfit] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);

  const vehicleType = Form.useWatch("vehicle_type", form);
  const financedAmount = Form.useWatch("financed_amount", form);
  const soatValue = Form.useWatch("soat_value", form);

  useEffect(() => {
    const profitValue = financedAmount - addiCommission - totalToPay;
    setProfit(Number(profitValue.toFixed(1)));

    const grossProfitValue =
      partnersCommission === profit ? profit : profit - partnersCommission;
    setGrossProfit(Number(grossProfitValue.toFixed(1)));
  }, [totalToPay, addiCommission, financedAmount, partnersCommission, profit]);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();

    const value = type === "motorcycle" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  useEffect(() => {
    if (!financedAmount) return;
    // Calcula el 6.5% de financedAmount y luego suma el 19% de ese resultado
    const addiCommissionValue =
      financedAmount * 0.065 + financedAmount * 0.065 * 0.19;
    setAddiCommission(Number(addiCommissionValue.toFixed(1)));
  }, [financedAmount]);

  useEffect(() => {
    if (!financedAmount || !addiCommission) return;
    // Calcula el valor a consignar restando la comisión de Addi y el SOAT del valor financiado
    const value = financedAmount - addiCommission;
    setValueToDeposit(Number(value.toFixed(1)));
  }, [financedAmount, addiCommission]);

  useEffect(() => {
    const value = (soatValue || 0) + fixedCommission;
    setTotalToPay(Number(value.toFixed(1)));
  }, [soatValue, fixedCommission]);

  const handleSubmit = async (values: any) => {
    try {
      message.loading("Registrando venta...", 0);

        let file = null;
        if (fileList?.length > 0 && fileList[0]?.originFileObj) {
          file = await getBase64(fileList[0]?.originFileObj as FileType);
        }
  
      const saleData = {
        ...values,
        invoice_file: file,
        seller: user,
        payment_method_id: props.method?.id,
        payment_method_name: props.method?.name,
        sale_summary: {
          fixed_commission: fixedCommission,
          addi_commission: addiCommission,
          partners_commission: partnersCommission,
          profit: profit,
          gross_profit: grossProfit,
          value_to_deposit: valueToDeposit,
          total_to_pay: totalToPay,
        },
      };
      
      await saveSaleApi(saleData);
      message.success("Venta registrada exitosamente", 2);
      form.resetFields();
      setFileList([]);
      props.onCloseModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      router.refresh();
      message.destroy();
    }
  };

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
