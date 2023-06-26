import { create } from "zustand";
import { ProductType } from "../components/cart/Cart";
export interface IUseProductData {
  setzdata(data: ProductType[]): void;
  zdata: ProductType[];
  searchdata: string;
  setSearchData(data: string): void;
  cartitems: ProductType[];
  setCartItems(data: ProductType): void;
  deleteCartItem(id: number): void;
}

const useProductData = create<IUseProductData>((set) => ({
  zdata: [],
  setzdata: (data) => {
    set(() => ({
      zdata: data,
    }));
  },
  searchdata: "",
  setSearchData: (data) =>
    set(() => ({
      searchdata: data,
    })),
  cartitems: [],
  setCartItems: (data) =>
    set((state: IUseProductData) => ({
      cartitems: [...state.cartitems, data],
    })),
  deleteCartItem: (id) =>
    set((state: IUseProductData) => ({
      cartitems: state.cartitems.filter((d: ProductType) => d.id !== id),
    })),
}));
export default useProductData;
