export const styleSelect: any = {
  control: (base: any) => ({
    ...base,
    cursor: 'pointer',
    "@media only screen and (max-width: 992px)": {
      ...base["@media only screen and (max-width: 992px)"],
      fontSize: "0.8em",
    }
  }),
  option: (base: any) => ({
    ...base,
    cursor: 'pointer',
    "@media only screen and (max-width: 992px)": {
      ...base["@media only screen and (max-width: 992px)"],
      fontSize: "0.8em",
    }
  }),
  placeholder: (base: any) => ({
    ...base,
    "@media only screen and (max-width: 992px)": {
      ...base["@media only screen and (max-width: 992px)"],
      fontSize: "0.8em",
    }
  })
}

export const columns = [{
  dataField: 'OrderNo',
  text: 'Order No',
}, {
  dataField: 'OrderDate',
  text: 'Order Date',
  sort: true
}, {
  dataField: 'OrderTotal',
  text: 'Order Total',
}, {
  dataField: 'PaymentMethod',
  text: 'Payment method'
}, {
  dataField: 'State',
  text: 'State'
}, {
  dataField: 'Action',
  text: ''
}];

export const options :any= {
  paginationSize: 4,
  pageStartIndex: 1,
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: '>>',
  nextPageTitle: 'First page',
  prePageTitle: 'Previous page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: '20', value: 20
  }, {
    text: '50', value: 50
  }, {
    text: '100', value: 100
  }]
};