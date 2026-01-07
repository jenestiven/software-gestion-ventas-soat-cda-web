"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Dropdown,
  Tag,
  Divider,
  Cascader,
  message,
} from "antd";
import type { TableProps } from "antd";
import {
  AuditOutlined,
  DownloadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { PlacesDataType, Sale, VehicleClass } from "@/types/types";
import SaleDetail from "./SaleDetail";
import ConciliationModal from "./ConciliationModal";
import { getTariffScheduleApi } from "@/lib/api/asesor";
import { deleteSaleApi } from "@/lib/api/sales";
import ReportGenerationModal from "./ReportGenerationModal";
import { generateSalesReport } from "@/utils/excel";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";
import { useRouter } from "next/navigation";
import CreateNewSellHandler from "../../asesor/modal/CreateNewSellHandler";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ManagmentTableClientProps {
  initialData: Sale[];
  places: PlacesDataType[];
}

const ManagmentTableClient: React.FC<ManagmentTableClientProps> = ({
  initialData,
  places,
}) => {
  const [sales, setSales] = useState<Sale[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Sale | null>(null);
  const [isConciliationModalVisible, setIsConciliationModalVisible] =
    useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [tariff, setTariff] = React.useState<VehicleClass[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTariffSchedule = async () => {
      const tariffSchedule = await getTariffScheduleApi();
      setTariff(tariffSchedule);
    };
    
    fetchTariffSchedule();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sales"), (snapshot) => {
      console.log("Received sales snapshot with", snapshot.docs.length, "documents");
      
      const salesData = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Sale)
      );
      setSales(salesData);
    });

    return () => unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    let data = [...sales];

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
      console.log(filters.payment_method);
      
      data = data.filter(
        (item) => item.payment_method_id === filters.payment_method
      );
    }
    if (filters.vehicle_type && filters.vehicle_type.length > 0) {
      data = data.filter((item) => {
        const vehicleTypeId = item.vehicle_data.vehicle_type_id;
        if (Array.isArray(vehicleTypeId) && vehicleTypeId.length > 0) {
          if (filters.vehicle_type.length === 1) {
            return vehicleTypeId[0] === filters.vehicle_type[0];
          }
          if (filters.vehicle_type.length === 2) {
            return (
              vehicleTypeId[0] === filters.vehicle_type[0] &&
              vehicleTypeId[1] === filters.vehicle_type[1]
            );
          }
        }
        return false;
      });
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
        (item) => item.sale_place.place_id === filters.sale_place
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
    if (filters.receipts) {
      data = data.filter((item) =>
        item?.receipts
          ?.at(0)
          ?.id.toLowerCase()
          .includes(filters.receipts.toLowerCase())
      );
    }

    return data;
  }, [sales, filters]);

  const handleViewMore = (record: Sale) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const showDeleteModal = (record: Sale) => {
    setSaleToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setSaleToDelete(null);
    setDeleteConfirmationInput("");
  };

    const handleDeleteConfirm = async () => {

      if (deleteConfirmationInput === "eliminar" && saleToDelete) {

        try {

          await deleteSaleApi(saleToDelete.id);

          message.success("Venta eliminada con éxito");

          router.refresh();

          handleDeleteCancel();

        } catch (error) {

          console.error("Error al eliminar la venta:", error);

          message.error("Error al eliminar la venta. Por favor, intente de nuevo.");

        }

      }

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

  const handleGenerateReport = async (
    salesPlaceId: string,
    startDate: string,
    endDate: string
  ) => {
    try {
      const sales = filteredData.filter((sale) => sale.sale_place.place_id === salesPlaceId && new Date(sale.created_at) >= new Date(startDate) && new Date(sale.created_at) <= new Date(endDate));
      const salesPlace = places.find((p) => p.id === salesPlaceId);
      if (salesPlace) {
        await generateSalesReport(sales, salesPlace, startDate, endDate);
      }
    } catch (error) {
      console.error("Error generating report:", error);
      message.error("Error al generar el reporte. Por favor, intente de nuevo.");
    }
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
      width: 200,
      render: (_, record) => (
        <span>
          <Avatar src={record.asesor_data.thumnail} style={{ marginRight: 8 }}>
            {!record.asesor_data.thumnail
              ? `${record.asesor_data.name.charAt(0).toUpperCase()}`
              : null}
          </Avatar>
          {record.asesor_data.name.toUpperCase()}
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
      render: (client_name: string) => {
        return client_name ? client_name.toUpperCase() : "Desconocido";
      },
    },
    {
      title: "Vehiculo",
      dataIndex: ["vehicle_data", "vehicle_type_id"],
      key: "vehicle_type",
      render: (item: string[]) => {
        let text = "Desconocido";
        if (item && Array.isArray(item) && item.length >= 2) {
          const vehicle = tariff.find((v) => v.id === item[0]);
          const type = vehicle?.categories.find((c) => c.code === item[1]);
          const vehicleClass = vehicle?.vehicle_class || "Desconocido";
          const typeName = type?.type || "Desconocido";
          text = `${vehicleClass}/${typeName}`;
        }
        return <span>{text}</span>;
      },
    },
    {
      title: "Placa",
      dataIndex: ["vehicle_data", "vehicle_plate"],
      key: "vehicle_plate",
      render: (vehicle_plate: string) => {
        return vehicle_plate ? vehicle_plate.toUpperCase() : "Desconocido";
      },
    },
    {
      title: "Sede",
      dataIndex: ["sale_place", "place_name"],
      width: 100,
      key: "sale_place",
    },
    {
      title: "Total",
      dataIndex: ["sale_sumary", "total_payed"],
      key: "total_payed",
      sorter: (a, b) => a.sale_sumary.total_payed - b.sale_sumary.total_payed,
      render: (total: number) => `${total.toLocaleString("es-CO")}`,
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
      title: "Conciliación",
      dataIndex: "conciliation_status",
      key: "conciliation_status",
      render: (status: string | undefined) => (
        <Tag color={status === "conciliated" ? "success" : "warning"}>
          {status === "conciliated" ? "Conciliado" : "Pendiente"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => {
        const menu = [
          {
            key: "1",
            label: <a onClick={() => handleViewMore(record)}>Ver detalle</a>,
          },
          {
            key: "2",
            label: <a onClick={() => showDeleteModal(record)}>Eliminar</a>,
          },
        ];
        return (
          <Dropdown
            menu={{ items: menu }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  const cascaderOptions = tariff.map((vehicleClass) => ({
    label: vehicleClass.vehicle_class,
    value: vehicleClass.id,
    children: vehicleClass.categories.map((category) => ({
      label: category.type,
      value: category.code,
    })),
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div>
          <Button icon={<AuditOutlined />} type="primary" onClick={() => setIsConciliationModalVisible(true)}>
            Conciliar facturas
          </Button>
          <Button className="ml-4" icon={<DownloadOutlined />} type="dashed" onClick={() => setIsReportModalOpen(true)}>
            Descargar reporte de ventas
          </Button>
        </div>
        <CreateNewSellHandler />
      </div>
      <Divider />
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col>
          <RangePicker
            placeholder={["Fecha inicio", "Fecha fin"]}
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
            <Option value="dataphone">Datafono</Option>
            <Option value="brilla">Brilla</Option>
            <Option value="sistecredito">Sistecredito</Option>
            <Option value="addi">Addi</Option>
          </Select>
        </Col>
        <Col>
          <Cascader
            options={cascaderOptions}
            onChange={(value) => handleFilterChange("vehicle_type", value)}
            placeholder="Selecciona un tipo de vehículo"
            style={{ width: "100%" }}
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
            {places.map((place) => (
              <Select.Option key={place.id} value={place.id}>
                {place.place_name}
              </Select.Option>
            ))}
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
        <Col>
          <Input
            className="h-8 rounded-md"
            placeholder="No. de comprobante"
            onChange={(e) => handleFilterChange("receipts", e.target.value)}
            style={{ width: 180 }}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Detalle de la venta"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <SaleDetail sale={selectedRecord} tariff={tariff} />
      </Modal>

      <ConciliationModal
        visible={isConciliationModalVisible}
        onCancel={() => setIsConciliationModalVisible(false)}
        initialData={sales}
      />

      <ReportGenerationModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onGenerateReport={handleGenerateReport}
      />

      <Modal
        title="Confirmar Eliminación"
        open={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="back" onClick={handleDeleteCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            disabled={deleteConfirmationInput !== "eliminar"}
            onClick={handleDeleteConfirm}
          >
            Eliminar
          </Button>,
        ]}
      >
                <p>Para confirmar la eliminación, por favor escriba &quot;eliminar&quot; en el campo de abajo.</p>
        <Input
          className="mt-2 rounded-md"
          value={deleteConfirmationInput}
          onChange={(e) => setDeleteConfirmationInput(e.target.value)}
          placeholder='eliminar'
        />
      </Modal>
    </div>
  );
};

export default ManagmentTableClient;
