"use client";

import { Button } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

type Props = {
  collapsed: boolean;
  onClick: () => void;
};

export default function ToggleButton({ collapsed, onClick }: Props) {
  return (
    <Button
      type="text"
      icon={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      onClick={onClick}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
    />
  );
}