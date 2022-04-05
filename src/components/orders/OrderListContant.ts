const options: any = {
  paginationSize: 4,
  pageStartIndex: 1,
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: '>>',
  nextPageTitle: 'First page',
  showTotal: true,
  prePageTitle: 'Previous page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
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
  dataField: 'OrderNo',
  text: 'Order No',
},
  {
  dataField: 'OrderDate',
  text: 'Order Date',
  sort: true
},
  {
  dataField: 'OrderTotal',
  text: 'Order Total',
}, {
  dataField: 'PaymentMethod',
  text: 'Payment method'
}, {
  dataField: 'Status',
  text: 'Status'
}, {
  dataField: 'Action',
  text: 'Action'
}];

export {options, columns};