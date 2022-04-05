import React, {useEffect, useState} from 'react';
import {IProduct} from "../../types/IProduct";
import NumberFormat from "react-number-format";

type OrderListTotalProps = {
  productList: IProduct[]
  discountPercentage:number
}

const OrderListTotal: React.FC<OrderListTotalProps> = (props) => {
  const [total, setTotal] = useState<number>(0);
  const renderTotal = React.useCallback(() => {
    const prices: number[] = props.productList.map((product: IProduct) => {
      return (product.regular_price - product.discount_price) * product.quantity
    });
    const total:number=prices.reduce(function (a, b) {
      return a + b;
    }, 0);
    return total-(total*props.discountPercentage/100);
  }, [props.discountPercentage, props.productList]);

  useEffect(() => {
    setTotal(renderTotal());
  }, [renderTotal],);
  return (
    <NumberFormat value={total}
                  thousandSeparator={true}
                  displayType='text'
                  prefix={'Rs. '}
                  decimalScale={2}
                  fixedDecimalScale={true}/>
  );
}

export default OrderListTotal;