import { AliwangwangOutlined, TwitterOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import Image from "next/image";

export default function WebHomePage() {
  return (
    <main className="flex flex-col items-center p-24">
      <Image
        width={150}
        height={150}
        className="mx-auto h-36 w-auto"
        src="/images/adammeditate.png"
        alt="a logo"
      />
      <h1 className="text-3xl">Next + Firebase starter</h1>
      <TwitterOutlined />
      <AliwangwangOutlined />
      <DatePicker />
    </main>
  );
}
