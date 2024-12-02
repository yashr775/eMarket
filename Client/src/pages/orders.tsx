/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useState, useEffect } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Skeleton } from "../components/loader";

const data = {
  orders: [
    {
      _id: "order1",
      total: 150.0,
      discount: 10.0,
      orderItems: [
        { productId: "prod1", name: "Item 1", quantity: 1 },
        { productId: "prod2", name: "Item 2", quantity: 2 },
      ],
      status: "Processing",
    },
    {
      _id: "order2",
      total: 250.0,
      discount: 15.0,
      orderItems: [
        { productId: "prod3", name: "Item 3", quantity: 1 },
        { productId: "prod4", name: "Item 4", quantity: 1 },
      ],
      status: "Shipped",
    },
    {
      _id: "order3",
      total: 100.0,
      discount: 5.0,
      orderItems: [{ productId: "prod5", name: "Item 5", quantity: 1 }],
      status: "Delivered",
    },
  ],
};

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const orders = () => {
  const [rows, setRows] = useState<DataType[]>([]);

  const isLoading = false;

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton length={20} /> : Table}
    </div>
  );
};

export default orders;
