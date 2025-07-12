// src/ui/components/ProductTable.tsx
import { useState } from 'react';
import { useApp } from '../../context/useApp';
import { ProductFormModal } from './ProductFormModal';
import type { Product } from '../../domain/types';

export const ProductTable = () => {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [productBeingEdited, setProductBeingEdited] = useState<Product | null>(
    null,
  );

  const openModalForCreation = () => {
    setProductBeingEdited(null);
    setShowModal(true);
  };

  const openModalForEditing = (product: Product) => {
    setProductBeingEdited(product);
    setShowModal(true);
  };

  const deleteProduct = (productId: string) =>
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });

  return (
    <>
      <button
        onClick={openModalForCreation}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + Nuevo producto
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full rounded border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Costo</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2 w-24">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 text-sm text-gray-800"
              >
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">${product.cost.toFixed(0)}</td>
                <td className="px-4 py-2">${product.price.toFixed(0)}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => openModalForEditing(product)}
                    className="rounded bg-emerald-500 px-2 py-1 text-white hover:bg-emerald-600"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                    title="Eliminar"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductFormModal
          initialProduct={productBeingEdited}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};
