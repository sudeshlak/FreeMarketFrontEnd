export interface ICategory {
    value: number,
    label: string
}
export interface SelectCategoryType{
    value: number,
    label: string
}

export interface ISearchedCategory{
    id: number,
    title: string,
    searchedString: string
}

export interface CategoryList {
    category: ISearchedCategory
}

export interface AdminProductTableRow {
  key: string;
  name:string;
  image:JSX.Element;
  index:number;
  qty:JSX.Element;
  unitPrice:JSX.Element;
  discount:JSX.Element;
  editIcon:JSX.Element;
  removeIcon:JSX.Element;
}