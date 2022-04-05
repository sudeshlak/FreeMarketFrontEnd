export const columns = [{
  dataField: 'id',
  text: '#'
}, {
  dataField: 'Image',
  text: ''
}, {
  dataField: 'Name',
  text: 'Name'
},{
  dataField: 'Category',
  text: 'Category'
}, {
  dataField: 'Qty',
  text: 'Qty',
  sort: true
}, {
  dataField: 'UnitPrice',
  text: 'Unit Price'
}, {
  dataField: 'Amount',
  text: 'Amount',
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