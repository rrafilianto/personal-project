// import { DataType } from "../types/table";

export const COLUMNS = [
  {
    title: "Username",
    dataIndex: ["login", "username"],
    key: "username",
    // sorter: (a: DataType, b: DataType) => a.username && a.username.localeCompare(b.username),
  },
  {
    title: "Name",
    dataIndex: ["name", "first"],
    key: "first",
    render: (first: string, { name }: any) => `${first} ${name.last}`,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Registered Date",
    dataIndex: ["registered", "date"],
    key: "date",
  },
];
