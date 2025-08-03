"use client";

import { MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, message, Modal, Table } from "antd";
import type { TableProps } from "antd";
import React, { useEffect, useState } from "react";
import PlaceCreationModal from "./PlaceCreationModal";
import { PlacesDataType } from "@/types/types";
import { useRouter } from "next/navigation";
import { deleteSalesPlaceApi } from "@/lib/api/salesPlaces";
import useStore from "@/store";

type Props = {
  dataSource: PlacesDataType[];
};

export default function PlacesTableClient({ dataSource }: Props) {
  const [searchText, setSearchText] = useState("");
  const [openPlaceCreationModal, setOpenCreationModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState<PlacesDataType | null>(null);
  
  const { setSalesPlaces } = useStore();
  const router = useRouter();

  useEffect(() => {
    setSalesPlaces(dataSource);
  }, [dataSource]); //eslint-disable-line react-hooks/exhaustive-deps

  const filteredDataSource = dataSource?.filter((place) =>
    place.place_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleModalClose = () => {
    setOpenCreationModal(false);
    setEditingPlace(null);
  };

  const handleUserAction = () => {
    handleModalClose();
    router.refresh();
  };

  const handleCreate = () => {
    setEditingPlace(null);
    setOpenCreationModal(true);
  };

  const handleEdit = (place: PlacesDataType) => {
    setEditingPlace(place);
    setOpenCreationModal(true);
  };

  const handleDelete = (place: PlacesDataType) => {
    Modal.confirm({
      title: `¿Estás seguro de que quieres eliminar la sede ${place.place_name}?`,
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, eliminar",
      okType: "danger",
      centered: true,
      cancelText: "No, cancelar",
      async onOk() {
        try {
          await deleteSalesPlaceApi(place.id);
          message.success("Sede eliminada exitosamente");
          router.refresh();
        } catch (error) {
          message.error("Error al eliminar la sede");
          console.error("Error deleting place:", error);
        }
      },
    });
  };

  const columns: TableProps<PlacesDataType>["columns"] = [
    {
      title: "Nombre de la sede",
      dataIndex: "place_name",
      key: "placeName",
    },
    {
      title: "Dirección",
      dataIndex: "place_address",
      key: "placeAddress",
    },
    {
      title: "No. de asesores",
      dataIndex: "asesors_number",
      key: "asesorsNumber",
    },
    {
      title: "Fecha de creación",
      dataIndex: "created_at",
      key: "createdAt",
      render: (text) =>
        new Date(text).toLocaleDateString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Acciones",
      key: "action",
      render: (record: PlacesDataType) => {
        const menuItems = [
          {
            key: "1",
            label: "Editar",
            onClick: () => handleEdit(record),
          },
          {
            key: "2",
            label: "Eliminar",
            onClick: () => handleDelete(record),
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-5 bg-white rounded-lg shadow">
        <div className="mb-4 flex justify-end items-center gap-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar sede"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-8 rounded-md w-1/4"
          />
          <Button onClick={handleCreate} type="primary" icon={<PlusOutlined />}>
            Crear nueva sede
          </Button>
        </div>
        <Table
          dataSource={filteredDataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey={"id"}
        />
      </div>
      <PlaceCreationModal
        open={openPlaceCreationModal}
        onClose={() => setOpenCreationModal(false)}
        onPlaceCreated={handleUserAction}
        placeToEdit={editingPlace}
      />
    </>
  );
}
