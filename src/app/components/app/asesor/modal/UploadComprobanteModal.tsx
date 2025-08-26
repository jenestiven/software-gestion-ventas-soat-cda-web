
import React, { useState } from "react";
import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import { uploadComprobanteApi } from "@/lib/api/sales";
import { getBase64 } from "@/app/components/app/admin/users/AntdUpload";

interface UploadComprobanteModalProps {
  visible: boolean;
  onCancel: () => void;
  saleId: string;
  onUploadSuccess: () => void;
}

const { Dragger } = Upload;

export const UploadComprobanteModal: React.FC<UploadComprobanteModalProps> = ({
  visible,
  onCancel,
  saleId,
  onUploadSuccess,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Por favor, seleccione un archivo para subir.");
      return;
    }

    setIsUploading(true);
    const file = fileList[0];
    console.log(file, "file");

    try {
      const fileToProcess = file.originFileObj || file;
      const base64File = await getBase64(fileToProcess as any);
      await uploadComprobanteApi(saleId, base64File);
      message.success("Comprobante subido con éxito.");
      onUploadSuccess();
      handleCancel();
    } catch (error) {
      message.error("Error al subir el comprobante.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setFileList([]);
    onCancel();
  };

  const props: any = {
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: UploadFile) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Modal
      title="Subir Comprobante"
      visible={visible}
      onOk={handleUpload}
      onCancel={handleCancel}
      confirmLoading={isUploading}
      okText="Subir"
      cancelText="Cancelar"
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Haz clic o arrastra un archivo a esta área para subirlo
        </p>
        <p className="ant-upload-hint">
          Soporte para una carga única. El archivo se utilizará como comprobante de la venta.
        </p>
      </Dragger>
    </Modal>
  );
};
