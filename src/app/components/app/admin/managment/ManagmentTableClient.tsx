"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  Modal,
  Button,
  Input,
  DatePicker,
  Select,
  Avatar,
  Row,
  Col,
  Menu,
  Dropdown,
  Tag,
  Divider,
} from "antd";
import type { TableProps } from "antd";
import { AuditOutlined, MoreOutlined } from "@ant-design/icons";
import { Sale } from "@/types/types";
import SaleDetail from "./SaleDetail";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ManagmentTableClientProps {
  initialData: Sale[];
}

const ManagmentTableClient: React.FC<ManagmentTableClientProps> = ({
  initialData,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Sale | null>(null);
  const [filters, setFilters] = useState<any>({});

  const filteredData = useMemo(() => {
    let data = [...initialData];

    if (filters.dates) {
      const [startDate, endDate] = filters.dates;
      data = data.filter((item) => {
        const itemDate = new Date(item.created_at);
        return itemDate >= startDate.toDate() && itemDate <= endDate.toDate();
      });
    }
    if (filters.client_name) {
      data = data.filter((item) =>
        item.client_data.client_name
          .toLowerCase()
          .includes(filters.client_name.toLowerCase())
      );
    }
    if (filters.payment_method) {
      data = data.filter(
        (item) => item.payment_method_id === filters.payment_method
      );
    }
    if (filters.vehicle_type) {
      data = data.filter((item) =>
        item.vehicle_data.vehicle_type_id
          .toLowerCase()
          .includes(filters.vehicle_type.toLowerCase())
      );
    }
    if (filters.plate) {
      data = data.filter((item) =>
        item.vehicle_data.vehicle_plate
          .toLowerCase()
          .includes(filters.plate.toLowerCase())
      );
    }
    if (filters.sale_place) {
      data = data.filter(
        (item) => item.sale_place.place_name === filters.sale_place
      );
    }
    if (filters.asesor) {
      data = data.filter((item) =>
        item.asesor_data.name
          .toLowerCase()
          .includes(filters.asesor.toLowerCase())
      );
    }
    if (filters.receipt_status !== undefined) {
      if (filters.receipt_status === "delivered") {
        data = data.filter((item) => item?.receipt_status === "delivered");
      } else if (filters.receipt_status === "pending") {
        data = data.filter((item) => item?.receipt_status === "pending");
      }
    }

    return data;
  }, [initialData, filters]);

  const handleViewMore = (record: Sale) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleFilterChange = (filterName: string, value: any) => {
    const newFilters = { ...filters, [filterName]: value };
    if (
      value === "" ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete newFilters[filterName];
    }
    setFilters(newFilters);
  };

  const columns: TableProps<Sale>["columns"] = [
    {
      title: "Fecha",
      dataIndex: "created_at",
      key: "date",
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (date: string) =>
        new Date(date).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Asesor",
      key: "asesor",
      render: (_, record) => (
        <span>
          <Avatar src={record.asesor_data.thumnail} style={{ marginRight: 8 }}>
            {!record.asesor_data.thumnail
              ? `${record.asesor_data.name.charAt(0).toUpperCase()}`
              : null}
          </Avatar>
          {record.asesor_data.name}
        </span>
      ),
    },
    {
      title: "Metodo de pago",
      dataIndex: "payment_method_name",
      key: "payment_method",
    },
    {
      title: "Nombre del cliente",
      dataIndex: ["client_data", "client_name"],
      key: "client_name",
    },
    {
      title: "Vehiculo",
      dataIndex: ["vehicle_data", "vehicle_type_name"],
      key: "vehicle_type",
    },
    {
      title: "Placa",
      dataIndex: ["vehicle_data", "vehicle_plate"],
      key: "vehicle_plate",
    },
    {
      title: "Sede",
      dataIndex: ["sale_place", "place_name"],
      key: "sale_place",
    },
    {
      title: "Total",
      dataIndex: ["sale_sumary", "total_payed"],
      key: "total_payed",
      sorter: (a, b) => a.sale_sumary.total_payed - b.sale_sumary.total_payed,
      render: (total: number) => `$${total.toLocaleString("es-CO")}`,
    },
    {
      title: "Compobante",
      dataIndex: "receipt_status",
      key: "receipt_status",
      render: (
        receipt_status: "delivered" | "pending" | null,
        record: Sale
      ) => {
        if (receipt_status === "delivered") {
          return <Tag color="success">Entregado</Tag>;
        } else if (receipt_status === "pending") {
          return <Tag color="warning">Pendiente</Tag>;
        } else {
          return <Tag color="default">Innecesario</Tag>;
        }
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item onClick={() => handleViewMore(record)} key="1">
              ver detalle
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Button icon={<AuditOutlined />} type="primary">
        Conciliar facturas
      </Button>
      <Divider />
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col>
          <RangePicker
            onChange={(dates) => handleFilterChange("dates", dates)}
          />
        </Col>
        <Col>
          <Input
            className="h-8 rounded-md"
            placeholder="Nombre del cliente"
            onChange={(e) => handleFilterChange("client_name", e.target.value)}
            style={{ width: 280 }}
          />
        </Col>
        <Col>
          <Input
            className="h-8 rounded-md"
            placeholder="Asesor"
            onChange={(e) => handleFilterChange("asesor", e.target.value)}
            style={{ width: 280 }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Metodo de pago"
            onChange={(value) => handleFilterChange("payment_method", value)}
            style={{ width: 180 }}
            allowClear
          >
            <Option value="cash">Efectivo</Option>
            <Option value="datafono">Datafono</Option>
            <Option value="brilla">Brilla</Option>
            <Option value="sistecredito">Sistecredito</Option>
            <Option value="addi">Addi</Option>
          </Select>
        </Col>
        <Col>
          <Select
            placeholder="Tipo de vehiculo"
            onChange={(e) => {
              handleFilterChange("vehicle_type", e);
            }}
            options={[
              { label: "Moto", value: "motorcycle" },
              { label: "Carro", value: "car" },
              { label: "Camioneta", value: "suv" },
              { label: "Taxi", value: "taxi" },
            ]}
            style={{ width: 150 }}
            allowClear
          />
        </Col>
        <Col>
          <Input
            className="h-8 rounded-md"
            placeholder="Placa"
            onChange={(e) => handleFilterChange("plate", e.target.value)}
            style={{ width: 150 }}
          />
        </Col>
        <Col>
          <Select
            placeholder="Sede"
            onChange={(value) => handleFilterChange("sale_place", value)}
            style={{ width: 180 }}
            allowClear
          >
            <Option value="Punto vial">Punto vial</Option>
            <Option value="Asesorias KG">Asesorias KG</Option>
            <Option value="Moto GP">Moto GP</Option>
            <Option value="TCC">TCC</Option>
          </Select>
        </Col>
        <Col>
          <Select
            placeholder="Estado de comprobante"
            onChange={(value) => handleFilterChange("receipt_status", value)}
            style={{ width: 200 }}
            allowClear
          >
            <Option value="delivered">Entregado</Option>
            <Option value="pending">Pendiente</Option>
          </Select>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Detalle de la venta"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <SaleDetail sale={selectedRecord} />
      </Modal>
    </div>
  );
};

export default ManagmentTableClient;
