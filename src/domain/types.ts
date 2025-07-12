export type Category = 'Camisetas' | 'Pantalones' | 'Zapatos' | 'Accesorios';

export interface Product {
  id: string;
  name: string;
  cost: number;
  price: number;
  category: Category;
  createdAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  date: string;
}
