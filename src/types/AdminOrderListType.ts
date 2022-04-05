import DisplayImage from "../components/displayImage/DisplayImage";
import NumberFormat from "react-number-format";
import {smallCentsWithPrefix} from "../util/uiComponents";
import React from "react";

export interface SelectStatusType {
  value: number,
  label: string
}

export interface AdminOrderTableRow {
  key: string;
  OrderNo: string;
  Image: JSX.Element;
  OrderDate: string;
  OrderTotal: JSX.Element;
  PaymentMethod: string;
  Status: JSX.Element;
  Action: JSX.Element;
}

export interface AdminOrderItemTableRow {
  key: number;
  id: number;
  Name: string;
  Category: string;
  Image: JSX.Element;
  Qty: number;
  UnitPrice: JSX.Element;
  Amount: JSX.Element;
}

export interface UserOrderTableRow {
  key: string;
  OrderNo: string;
  Image: JSX.Element;
  OrderDate: string;
  OrderTotal: JSX.Element;
  PaymentMethod: string;
  State: string;
  Action: JSX.Element;
}