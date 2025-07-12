import type { Product, Sale } from '../domain/types';

const STORAGE_KEY = 'ventas-ropa';

export interface PersistedData {
  products: Product[];
  sales: Sale[];
}

const defaultData: PersistedData = {
  products: [],
  sales: [],
};

export function loadFromStorage(): PersistedData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error al cargar datos del almacenamiento', error);
    return defaultData;
  }
}

export function saveToStorage(data: PersistedData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar datos en el almacenamiento:', error);
  }
}
