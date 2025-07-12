import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, Sale } from '../domain/types';
import { loadFromStorage, saveToStorage } from '../infrastructure/storage';
import type { PersistedData } from '../infrastructure/storage';

type Action =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'ADD_SALE'; payload: Sale };

const reducer = (state: PersistedData, action: Action): PersistedData => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        sales: state.sales.filter((s) => s.productId !== action.payload), // limpiar ventas asociadas
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case 'ADD_SALE':
      return { ...state, sales: [...state.sales, action.payload] };

    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: PersistedData;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, loadFromStorage());

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
