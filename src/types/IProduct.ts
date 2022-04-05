export interface IProduct {
  id: string,
  title: string,
  category: ICategory,
  quantity: number,
  regular_price: number,
  discount_price: number,
  image: string
}

export interface ICategory {
  id: number,
  title: string
}

export interface ISearchedCategory {
  id: number,
  title: string,
  searchedString: string
}

export interface IDropDownCategory {
  value: number,
  label: string
}

export interface IProducts {
  products: IProduct[]
}