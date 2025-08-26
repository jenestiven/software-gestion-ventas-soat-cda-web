'use client';

import { Button, Input, Space, Table, Tag, DatePicker, Tooltip } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sell, VehicleClass } from '@/types/types';
import {
  CloudUploadOutlined,
  EditOutlined,
  FilePdfOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { getTariffScheduleApi } from '@/lib/api/asesor';
import type { InputRef } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { UploadComprobanteModal } from '../modal/UploadComprobanteModal';
dayjs.extend(isBetween);

interface Props {
  data: Sell[];
}

export default function AsesorSellsTable({ data }: Props) {
  const [tariff, setTariff] = useState<VehicleClass[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState<string>('');

  const handleUploadSuccess = () => {
    // Here you can refetch the data to update the table
    console.log('Upload successful');
  };

  const showUploadModal = (saleId: string) => {
    setSelectedSaleId(saleId);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSaleId('');
  };

  const filteredData = useMemo(() => {
    if (!selectedMonth) {
      return data;
    }
    return data.filter(sell => {
      return dayjs(sell.date).isSame(selectedMonth, 'month');
    });
  }, [data, selectedMonth]);

  useEffect(() => {
    const fetchTariffSchedule = async () => {
      const tariffSchedule = await getTariffScheduleApi();
      setTariff(tariffSchedule);
    };
    fetchTariffSchedule();
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof Sell
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: keyof Sell): ColumnType<Sell> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          className="h-8 rounded-md"
          ref={searchInput}
          placeholder={'Buscar'}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())) ?? false,
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <span>{text?.toString().toUpperCase()}</span>
      ) : (
        <span>{text?.toString().toUpperCase()}</span>
      ),
  });

  const columns: ColumnsType<Sell> = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) =>
        new Date(date).toLocaleDateString('es-CO', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
      key: 'client',
      ...getColumnSearchProps('client'),
    },
    {
      title: 'Placa',
      dataIndex: 'vehicle_license_plate',
      key: 'vehicle_license_plate',
      ...getColumnSearchProps('vehicle_license_plate'),
    },
    {
      title: 'Vehículo',
      dataIndex: 'vehicle_type',
      key: 'vehicle_type',
      render: (item: string) => {
        let text = 'Desconocido';
        if (item && Array.isArray(item) && item.length >= 2) {
          const vehicle = tariff.find(v => v.id === item[0]);
          const type = vehicle?.categories.find(c => c.code === item[1]);
          const vehicleClass = vehicle?.vehicle_class || 'Desconocido';
          const typeName = type?.type || 'Desconocido';
          text = `${vehicleClass}/${typeName}`;
        }
        return <span>{text}</span>;
      },
    },
    {
      title: 'Valor SOAT',
      dataIndex: 'soat_value',
      key: 'soat_value',
      render: (item: number) => <span>${item.toLocaleString()}</span>,
    },
    {
      title: 'Valor de venta',
      dataIndex: 'total_value',
      key: 'total_value',
      render: (item: number) => <span>${item.toLocaleString()}</span>,
    },
    {
      title: 'Método de pago',
      dataIndex: 'payment_method',
      key: 'payment_method',
      filters: Array.from(new Set(data.map(item => item.payment_method))).map(
        method => ({ text: method, value: method })
      ),
      onFilter: (value, record) => record.payment_method === value,
    },
    {
      title: 'Comprobante',
      dataIndex: 'doc_state',
      key: 'doc_state',
      render: (item: string) => (
        <Tag color={item === 'pending' ? 'volcano' : 'green'}>
          {item === 'pending' ? 'Pendiente' : 'Completado'}
        </Tag>
      ),
      filters: [
        { text: 'Pendiente', value: 'pending' },
        { text: 'Completado', value: 'completed' },
      ],
      onFilter: (value, record) => record.doc_state === value,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <span className="flex gap-2">
          <Tooltip title="Subir comprobante">
            <Button
              icon={<CloudUploadOutlined />}
              onClick={() => showUploadModal(record.id)}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="p-4 font-semibold">Ventas actuales</h2>
        <div className="mr-4">
          <FilterOutlined />{' '}
          <DatePicker
            id="month-picker"
            picker="month"
            value={selectedMonth}
            onChange={date => setSelectedMonth(date)}
            style={{ marginBottom: 16 }}
            placeholder="Seleccionar mes"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={[...filteredData].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
        rowKey="id"
        pagination={{ pageSize: 7 }}
      />
      <UploadComprobanteModal
        visible={isModalVisible}
        onCancel={handleCancel}
        saleId={selectedSaleId}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
}
