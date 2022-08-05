import { Table } from "antd";

import useDatesFormat from "hooks/useDatesFormat";
import { TableProps } from "types/table";

const TableList = ({
  dataSource,
  params,
  isLoading,
  pagination,
  fetchDataSource,
}: TableProps) => {
  const { toDMYTimeFormat } = useDatesFormat();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: any, b: any) =>
        a.username && a.username.localeCompare(b.username),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "first",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Registered Date",
      dataIndex: "registeredDate",
      key: "registeredDate",
      render: (date: string) => toDMYTimeFormat(date),
      sorter: (a: any, b: any) =>
        a.registeredDate.localeCompare(b.registeredDate),
    },
  ];

  const handleChangePage = (page: number, pageSize: number) => {
    fetchDataSource({ ...params, page, results: pageSize });
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={isLoading}
      pagination={{ ...pagination, onChange: handleChangePage }}
    />
  );
};

export default TableList;
