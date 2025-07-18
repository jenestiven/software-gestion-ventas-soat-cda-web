'use client';

import React, { useState } from 'react';
import { MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Button, Dropdown, Input, Avatar, Modal, message } from 'antd';
import UserCreationModal from './UserCreationModal';
import type { TableProps } from 'antd';
import { DbUser } from '@/types/types';
import { useRouter } from 'next/navigation';
import { deleteUserApi } from '@/lib/api/users';

type Props = {
  dataSource: DbUser[];
};

export default function UsersTableClient({ dataSource }: Props) {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<DbUser | null>(null);
  const router = useRouter();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleUserAction = () => {
    handleModalClose();
    router.refresh();
  };

  const handleEdit = (user: DbUser) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = (user: DbUser) => {
    Modal.confirm({
      title: `¿Estás seguro de que quieres eliminar a ${user.name}?`,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      centered: true,
      cancelText: 'No, cancelar',
      async onOk() {
        try {
          await deleteUserApi(user.uid);
          message.success('Usuario eliminado exitosamente');
          router.refresh();
        } catch (error) {
          message.error('Error al eliminar el usuario');
          console.error('Error deleting user:', error);
        }
      },
    });
  };

  const filteredDataSource = dataSource.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableProps<DbUser>['columns'] = [
    {
      title: 'Usuario',
      dataIndex: '',
      key: 'name',
      render: (item: { name: string; thumbnail: string }) => (
        <span className='flex items-center gap-2'>
          <Avatar src={item.thumbnail} alt='thumbnail' className='rouded-full w-10 h-10'>
            {!item.thumbnail && item.name.charAt(0).toUpperCase()}
          </Avatar>
          {item.name}
        </span>
      ),
    },
    {
      title: 'Telefono',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Estado',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (active ? 'Activo' : 'Inactivo'),
      filters: [
        { text: 'Activo', value: true },
        { text: 'Inactivo', value: false },
      ],
      onFilter: (value, record) => record.active === value,
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role: 'asesor' | 'admin') =>
        role === 'asesor' ? 'Asesor' : 'Administrador',
      filters: [
        { text: 'Administrador', value: 'admin' },
        { text: 'Asesor', value: 'asesor' },
      ],
      onFilter: (value, record: any) => record.role.includes(value),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (record: DbUser) => {
        const menuItems = [
          {
            key: '1',
            label: 'Editar',
            onClick: () => handleEdit(record),
          },
          {
            key: '2',
            label: 'Eliminar',
            onClick: () => handleDelete(record),
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <div className='p-5 bg-white rounded-lg shadow'>
        <div className='mb-4 flex justify-end items-center gap-4'>
          <Input
            prefix={<SearchOutlined />}
            placeholder='Buscar usuario'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='h-8 rounded-md w-1/4'
          />
          <Button onClick={handleCreate} type='primary' icon={<PlusOutlined />}>
            Crear nuevo usuario
          </Button>
        </div>
        <Table
          dataSource={filteredDataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey={'uid'}
        />
      </div>
      <UserCreationModal
        open={isModalOpen}
        onClose={handleModalClose}
        onUserCreated={handleUserAction}
        userToEdit={editingUser}
      />
    </>
  );
}