const options: any = {
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

const columns = [{
  dataField: 'index',
  text: '#',
}, {
  dataField: 'image',
  text: 'Item',
}, {
  dataField: 'name',
  text: 'Name',
  sort: true
}, {
  dataField: 'qty',
  text: 'Qty',
}, {
  dataField: 'unitPrice',
  text: 'Unit Price',
}, {
  dataField: 'discount',
  text: 'Discount',
}, {
  dataField: 'editIcon',
  text: '',
}, {
  dataField: 'removeIcon',
  text: '',
}];

const styleSelect: any = {
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

export {options, columns, styleSelect};