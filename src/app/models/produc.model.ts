export interface Category {
  id: string;
  name: string,
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: Category;
  description: string;
  taxes?: number | null;
}

export interface CreateProductDto extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {

}
