export interface Storage {
  catalog: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface Product {
  "id": number;
  "title": string;
  "price": number;
  "description": string;
  "category": string;
  "image": string;
  "rating": {
    "rate": number;
    "count": number;
  }
}
