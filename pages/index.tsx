import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { Divider, Form, message } from "antd";

import { Filter, TableList } from "components";
import { dataWithKey } from "utils";
import { RANDOM_PICK_API } from "constants/api";
import { DataType, Pagination, Params } from "types/table";

const Home: NextPage = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataFilter, setDataFilter] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 10,
    total: 100,
  });
  const [params, setParams] = useState<Params>({
    page: 1,
    results: 10,
    gender: "all",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchDataSource();
  }, []);

  const fetchDataSource = async (
    paramsProps: Params = params,
    isReset: boolean = false
  ) => {
    setIsLoading(true);

    const newParams = getParams(paramsProps);
    const url = new URL(RANDOM_PICK_API);
    url.search = new URLSearchParams(newParams).toString();

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        isReset && form.resetFields();
        handleSuccess(data, newParams);
      })
      .catch((error) => handleError(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const data = dataSource.map((val) => {
      delete val.key;

      return val;
    });

    const newDataFilter = data.filter((obj) =>
      Object.values(obj).some((val) => val.includes(value))
    );

    setDataFilter(dataWithKey(newDataFilter));
    !value && setDataSource(dataWithKey(dataSource));
  };

  const handleSuccess = ({ info, results }: any, newParams: Params) => {
    const { page, results: pageSize } = info;
    const mappingData = results.map(
      ({ login, name, email, gender, registered }: any) => {
        return {
          username: login.username,
          name: `${name.first} ${name.last}`,
          email,
          gender,
          registeredDate: registered.date,
        };
      }
    );

    setPagination({ ...pagination, current: page, pageSize });
    setParams(newParams);
    setDataFilter([]);
    setDataSource(dataWithKey(mappingData));
  };

  const handleError = (error: any, duration: number = 3) => {
    let text = "";

    if (typeof error === "string") {
      text = error;
    } else {
      const { data } = error || {};
      if (data?.message) {
        text = data?.message;
      } else if (data?.error) {
        text = data?.error;
      } else if (!data) {
        text = "Network Error";
      }
    }

    message.error({ content: text, duration });
  };

  const getParams = (paramsProps: Params) => {
    const { page, results } = paramsProps;

    const newParams = {
      ...paramsProps,
      page: page.toString(),
      results: results.toString(),
    };

    return newParams;
  };

  return (
    <div>
      <Head>
        <title>Example With Search and Filter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5 px-8">
        <h1 className="font-bold text-2xl mb-5">
          Example With Search and Filter
        </h1>

        <Filter
          form={form}
          onSearch={onSearch}
          fetchDataSource={fetchDataSource}
          params={params}
        />
        <Divider />
        <TableList
          dataSource={form.getFieldValue("search") ? dataFilter : dataSource}
          params={params}
          isLoading={isLoading}
          pagination={pagination}
          fetchDataSource={fetchDataSource}
        />
      </main>
    </div>
  );
};

export default Home;
