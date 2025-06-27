"use client";

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
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function AddiForm() {
  const [form] = Form.useForm();

  const [addiCommission, setAddiCommission] = useState(15000);
  const [partnersCommission, setPartnersCommission] = useState(2000);
  const [soatValue, setSoatValue] = useState(180000);
  const [fixedCommission, setFixedCommission] = useState(0);

  const vehicleType = Form.useWatch("vehicleType", form);
  const financedAmount = Form.useWatch("financedAmount", form);

  useEffect(() => {
    if (!vehicleType) return;
    const type = vehicleType.toLowerCase();
    const value = type === "moto" ? 15000 : 0;
    setFixedCommission(value);
  }, [vehicleType]);

  const calculateDerivedValues = () => {
    const financed = Number(financedAmount || 0);
    const totalToPay = soatValue + fixedCommission;
    const grossProfit = financed - addiCommission - totalToPay;
    const netProfit = grossProfit - partnersCommission;

    form.setFieldsValue({
      totalToPay,
      grossProfit,
      netProfit,
      amountToDeposit: financed - addiCommission,
    });
  };

  useEffect(() => {
    calculateDerivedValues();
  }, [financedAmount, fixedCommission]);

  const handleSubmit = (values: any) => {
    console.log("Submitted:", values);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        creditDate: dayjs(),
        status: "pending",
        soatPaid: "no",
        vehicleType: "moto",
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item name="creditDate" label="Credit Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="vehicleType" label="Vehicle Type">
            <Select
              options={[
                { label: "Motorbike", value: "moto" },
                { label: "Car", value: "carro" },
                { label: "SUV", value: "camioneta" },
                { label: "Taxi", value: "taxi" },
              ]}
            />
          </Form.Item>

          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>

          <Form.Item name="idNumber" label="ID Number">
            <Input />
          </Form.Item>

          <Form.Item name="licensePlate" label="License Plate">
            <Input />
          </Form.Item>

          <Form.Item name="financedAmount" label="Financed Amount">
            <InputNumber
              style={{ width: "100%" }}
              onChange={calculateDerivedValues}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item name="fixedCommission" label="Fixed Commission">
            <InputNumber
              style={{ width: "100%" }}
              value={fixedCommission}
              disabled
            />
          </Form.Item>

          <Form.Item name="totalToPay" label="Total to Pay">
            <InputNumber style={{ width: "100%" }} disabled />
          </Form.Item>

          <Form.Item name="grossProfit" label="Gross Profit">
            <InputNumber style={{ width: "100%" }} disabled />
          </Form.Item>

          <Form.Item name="netProfit" label="Net Profit">
            <InputNumber style={{ width: "100%" }} disabled />
          </Form.Item>

          <Form.Item name="status" label="SOAT Status">
            <Select
              options={[
                { label: "Pending", value: "pending" },
                { label: "Delivered", value: "delivered" },
              ]}
            />
          </Form.Item>

          <Form.Item name="soatPaid" label="SOAT Paid">
            <Select
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </Form.Item>

          <Form.Item name="invoiceNumber" label="Invoice Number">
            <Input />
          </Form.Item>

          <Form.Item name="remarks" label="Remarks">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Summary</Divider>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Text strong>SOAT Value:</Text> ${soatValue.toLocaleString()}
          <br />
          <Text strong>Addi Commission:</Text> $
          {addiCommission.toLocaleString()}
          <br />
          <Text strong>Partners Commission:</Text> $
          {partnersCommission.toLocaleString()}
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="amountToDeposit" label="Amount to Deposit">
            <InputNumber style={{ width: "100%" }} disabled />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
