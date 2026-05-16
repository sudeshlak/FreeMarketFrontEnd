import {ISearchedCategory} from "../types/IProduct";

export const ALL_CATEGORY: ISearchedCategory = {
  id: 1,
  title: "All",
  searchedString: "",
};

export const GROCERY_CATEGORY: ISearchedCategory = {
  id: 2,
  title: "Grocery",
  searchedString: "",
};

export const PHARMACY_CATEGORY: ISearchedCategory = {
  id: 3,
  title: "Pharmacy",
  searchedString: "",
};

export const FOOD_CATEGORY: ISearchedCategory = {
  id: 4,
  title: "Food",
  searchedString: "",
};

export const ELECTRONIC_CATEGORY: ISearchedCategory = {
  id: 5,
  title: "Electronic",
  searchedString: "",
};

/** Product categories shown when "All" is selected (stable references for props). */
export const SHOPPING_CATEGORIES: ISearchedCategory[] = [
  GROCERY_CATEGORY,
  PHARMACY_CATEGORY,
  FOOD_CATEGORY,
  ELECTRONIC_CATEGORY,
];
