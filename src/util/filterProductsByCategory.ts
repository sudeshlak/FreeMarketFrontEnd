import {IProduct, ISearchedCategory} from "../types/IProduct";

/** Maps legacy/typo backend titles to the canonical shopping category title. */
const CATEGORY_TITLE_ALIASES: Record<string, string> = {
  Eletronic: "Electronic",
  Electronics: "Electronic",
};

export function normalizeCategoryTitle(title: string): string {
  return CATEGORY_TITLE_ALIASES[title] ?? title;
}

export function filterProductsByCategory(
  products: IProduct[],
  category: ISearchedCategory
): IProduct[] {
  if (!products?.length) {
    return [];
  }
  if (category.title === "Searched") {
    const query = category.searchedString.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }
  return products.filter(
    (product) =>(product.category.title.toLowerCase() === category.title.toLowerCase()  )
  );
}
