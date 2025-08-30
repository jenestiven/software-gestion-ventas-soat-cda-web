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
  Cascader,
} from "antd";
import dayjs from "dayjs";
import { AntdUpload } from "../../../admin/users/AntdUpload";
import { PaymentMethod, Tariff } from "@/types/types";
import useBrillaForm from "@/hooks/use-sale-creation/useBrillaForm";
import { moneyFormat } from "@/utils/utils";

const { Text, Title } = Typography;

type Props = {
  onCloseModal: (open: boolean) => void;
  method: PaymentMethod | null;
  tariffSchedule: Tariff;
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
    financedAmount,
    isSoatValueDisabled,
    setIsSoatValueDisabled,
    user,
    place_total_gains,
    cascaderOptions,
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

            <AntdUpload fileList={fileList} setFileList={setFileList} />

            {user?.main_place ? (
              <>
                <Divider orientation="left">Resumen de venta</Divider>

                <section className="px-4 flex flex-col gap-1">
                  <div className="flex justify-between">
                    <Text>Comision fija:</Text> ${moneyFormat(fixedCommission)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Comisión Aliados:</Text> $
                    {moneyFormat(partnersCommission)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Utilidad bruta:</Text> ${moneyFormat(profit)}
                  </div>
                  <div className="flex justify-between">
                    <Text>Utilidad neta:</Text> ${moneyFormat(grossProfit)}
                  </div>

                  <Divider />
                  <div className="flex justify-between">
                    <Text strong>Total a financiar:</Text> $
                    {moneyFormat(financedAmount)}
                  </div>
                  <Divider />
                </section>
              </>
            ) : (
              <>
                <Divider />
                <div className="flex justify-between">
                  <Text>Ganancias:</Text> ${moneyFormat(place_total_gains)}
                </div>
                <div className="flex justify-between">
                  <Text strong>Total a financiar:</Text> $
                  {moneyFormat(financedAmount)}
                </div>
              </>
            )}
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
