const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.api-store.workers.dev/api/bazardor";


export interface MarketPrice {
    marketName: string;
    district: string;
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
}

export interface Product {
    _id: string;
    id?: string;
    name: string;
    nameBn?: string;
    emoji: string;
    category: string;
    unit: string;
    todayPrice: number;
    changePercent: number;
    changeType: "up" | "down" | "flat";
    markets?: MarketPrice[];
}

export interface Category {
    _id: string;
    name: string;
    nameBn?: string;
    icon: string;
    slug: string;
}


async function fetcher<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} on ${endpoint}`);
    }

    return res.json();
}

export async function getAllProducts(): Promise<Product[]> {
    return fetcher<Product[]>("/products");
}

export async function getProductsByCategory(
    category: string,
): Promise<Product[]> {
    return fetcher<Product[]>(`/products?category=${category}`);
}

export async function getSingleProduct(id: string): Promise<Product> {
    return fetcher<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
    return fetcher<Category[]>("/categories");
}


export async function getSingleCategory(slug: string): Promise<Category> {
    return fetcher<Category>(`/categories/${slug}`);
}