export interface Product {
  id: number;
  name: string;
  img?: string;
  price: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
