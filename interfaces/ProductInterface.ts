export interface Product {
  id?: number;
  name: string;
  img?: string;
  price: number;
  description?: string;
  storeId?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
