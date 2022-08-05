import { useCallback } from "react";
import { Col, Form, Row, Input, Select, Button } from "antd";

import { debounce } from "utils";
import { FilterProps } from "types/table";

const { Search } = Input;
const { Option } = Select;

const Filter = ({ form, onSearch, fetchDataSource, params }: FilterProps) => {
  const debouncedHandler = useCallback(debounce(onSearch, 700), [onSearch]);

  const onGenderSelect = (value: string) => {
    fetchDataSource({ ...params, page: 1, gender: value });
  };

  const onReset = () => {
    fetchDataSource({ ...params, page: 1, gender: "all" }, true);
  };

  return (
    <Form form={form} layout="vertical" initialValues={{ gender: "all" }}>
      <Row gutter={16} align="middle">
        <Col span={4}>
          <Form.Item label="Search" name="search">
            <Search
              placeholder="Search..."
              onChange={debouncedHandler}
              enterButton
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Gender" name="gender">
            <Select onChange={(value: string) => onGenderSelect(value)}>
              <Option value="all">All</Option>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button className="mt-1" onClick={onReset}>
            Reset Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
