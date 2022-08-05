import { FormInstance } from "antd";

export interface DataType {
  key?: number;
  username: string;
  name: string;
  email: string;
  gender: string;
  registeredDate: string;
}

export interface Params {
  page: number | string;
  results: number | string;
  gender: string;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export interface FilterProps {
  form: FormInstance;
  params: Params;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  fetchDataSource: (params: Params, isReset?: boolean) => void;
}

export interface TableProps {
  dataSource: DataType[];
  params: Params;
  isLoading: boolean;
  pagination: Pagination;
  fetchDataSource: (params: Params, isReset?: boolean) => void;
}
