import React from 'react';
import NumberFormat from "react-number-format";
import {Button, Image} from "react-bootstrap";
import Image2 from "../../assets/images/all-cat.jpg";
import Select from "react-select";

const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
]

const OrderListItem = [
    {
        id: 1,
        OrderNo: '0001',
        Image: <Image src ={Image2} width="50%" height="30px" alt = "ad" roundedCircle/>,
        OrderDate: new Date().toDateString(),
        OrderTotal:<NumberFormat value={1568.00}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}/>,
        PaymentMethod:"Card",
        Status:<Select options={options}/>,
        Action:<Button size="sm">view</Button>
    },
    {
        id: 2,
        OrderNo: '0002',
        Image: <Image src ={Image2} width="50%" height="30px" alt = "ad" roundedCircle/>,
        OrderDate: new Date().toDateString(),
        OrderTotal:<NumberFormat value={1568.00}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}/>,
        PaymentMethod:"Card",
        Status:<Select options={options}/>,
        Action:<Button size="sm">view</Button>
    },
    {
        id: 3,
        OrderNo: '0003',
        Image: <Image src ={Image2} width="50%" height="30px" alt = "ad" roundedCircle/>,
        OrderDate: new Date().toDateString(),
        OrderTotal:<NumberFormat value={1568.00}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}/>,
        PaymentMethod:"Cash on Delivery",
        Status:<Select options={options}/>,
        Action:<Button size="sm">view</Button>
    },
    {
        id: 4,
        OrderNo: '0004',
        Image: <Image src ={Image2} width="50%" height="30px" alt = "ad" roundedCircle/>,
        OrderDate: new Date().toDateString(),
        OrderTotal:<NumberFormat value={1568.00}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}/>,
        PaymentMethod:"Cash on Delivery",
        Status:<Select options={options}/>,
        Action:<Button size="sm">view</Button>
    },
    {
        id: 5,
        OrderNo: '0005',
        Image: <Image src ={Image2} width="50%" height="30px" alt = "ad" roundedCircle/>,
        OrderDate: new Date().toDateString(),
        OrderTotal:<NumberFormat value={1568.00}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}/>,
        PaymentMethod:"Cash on Delivery",
        Status:<Select options={options}/>,
        Action:<Button size="sm">view</Button>
    },
    {
        id: 6,
        OrderNo: '0006',
        Image: <img src = "../../assets/images/delivery.png" alt = "ad"/>,
        OrderDate: new Date().toDateString(),
        OrderTotal:<NumberFormat value={1568.00}
                                 thousandSeparator={true}
                                 displayType='text'
                                 prefix={'Rs. '}
                                 decimalScale={2}
                                 fixedDecimalScale={true}/>,
        PaymentMethod:"Cash on Delivery",
        Status:<Select options={options}/>,
        Action:<Button size="sm">view</Button>
    }
    ];
export default OrderListItem;