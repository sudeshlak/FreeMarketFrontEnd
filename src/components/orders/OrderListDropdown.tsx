import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { SelectStatusType } from "../../types/AdminOrderListType";
import { styleSelect } from "../createProduct/CreateProductConstants";
import { toast } from "../sweetalert/sweetalert";

type OrderListDropdownProps = {
  status: SelectStatusType[];
  activeStatus: SelectStatusType;
  handleOnActiveStatus: (selected: SelectStatusType | null) => void;
};

const OrderListDropdown: React.FC<OrderListDropdownProps> = (props) => {
 const [donloaded, setDonloaded] = React.useState(0);

  async function onclickCsvImport() {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "/exports/orders";
      const response = await fetch(`${baseUrl}/exports/orders`, {
        method: "GET",
        headers: {
          Authorization: token!,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast("Failed to dowload csv file", "", "error");
        return;
      }
      const reader = response.body?.getReader();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader!.read();
              if (done) {
                setTimeout(() => {
                  setDonloaded(0);
                },3000);
                break;
              };
              setDonloaded((value?.length || 0)/1024);
              controller.enqueue(value);
            }
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      const csvBlob = await new Response(stream).blob();

      const url = window.URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orders-export-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast("Failed to dowload csv file", "", "error");
    }
  }

  return (
    <Row className="order-list-dropdown">
      <Col xs={4} md={2}>
        <label>Status : </label>
      </Col>
      <Col xs={4} sm={6} md={4} className="pb-2">
        <Select
          options={props.status}
          isClearable={false}
          isSearchable={true}
          styles={styleSelect}
          onChange={(selected: SelectStatusType | null) => {
            props.handleOnActiveStatus(selected);
          }}
          defaultValue={props.activeStatus}
        />
      </Col>
      <Col xs={4} md={6} className="d-flex justify-content-end">
        <Button variant="link" size="sm" onClick={onclickCsvImport}>
          Download CSV {donloaded > 0 && `(${donloaded.toFixed(2)} KB)`}
        </Button>
      </Col>
    </Row>
  );
};

export default OrderListDropdown;
