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
  Cascader,
  Divider,
  Typography,
  Switch,
} from "antd";
import dayjs from "dayjs";
import {
  PaymentMethod,
  Tariff,
} from "@/types/types";
import useCashForm from "@/hooks/use-sale-creation/useCashForm";
import { AntdUpload } from "../../../admin/users/AntdUpload";

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod;
  tariffSchedule: Tariff;
};

export default function CashForm(props: Props) {
  const { Text } = Typography;
  const {
    form,
    onFinish,
    cascaderOptions,
    totalToPay,
    isSoatValueDisabled,
    setIsSoatValueDisabled,
    payByTransfer,
    fileList,
    setFileList,
  } = useCashForm(props);

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
              {props.method?.fixedCost?.can_add_profit && (
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

            <Form.Item
                name="transfer_method"
                label="Pagó por transferencia"
              >
                <Switch />
            </Form.Item>

            {
              payByTransfer && (
                <Form.Item
                name="transfer_proof"
                label="Subir comprobante de transferencia"
                >
                  <AntdUpload setFileList={setFileList} fileList={fileList} />
                </Form.Item>
              )
            }

            <Form.Item name="remarks" label="Observaciones">
              <Input.TextArea rows={5} />
            </Form.Item>

              <Divider />
            <section className="px-2">

              <div className="flex justify-between">
                <Text strong>Total a pagar:</Text> $
                {totalToPay ? Number(totalToPay).toLocaleString() : 0}
              </div>

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