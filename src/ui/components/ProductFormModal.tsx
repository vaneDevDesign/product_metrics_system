// src/ui/components/ProductFormModal.tsx
import { useState } from 'react';
import type { Category, Product } from '../../domain/types';
import { useApp } from '../../context/useApp';

const categoryOptions: Category[] = [
  'Camisetas',
  'Pantalones',
  'Zapatos',
  'Accesorios',
];

interface ProductFormModalProps {
  initialProduct: Product | null;
  closeModal: () => void;
}

export const ProductFormModal = ({
  initialProduct,
  closeModal,
}: ProductFormModalProps) => {
  const { dispatch } = useApp();
  const isEditing = Boolean(initialProduct);

  const [productName, setProductName] = useState(initialProduct?.name ?? '');
  const [productCategory, setProductCategory] = useState<Category>(
    initialProduct?.category ?? 'Camisetas',
  );
  const [unitCost, setUnitCost] = useState(
    initialProduct?.cost.toString() ?? '',
  );
  const [unitPrice, setUnitPrice] = useState(
    initialProduct?.price.toString() ?? '',
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const costNumber = parseFloat(unitCost);
    const priceNumber = parseFloat(unitPrice);

    if (!productName || isNaN(costNumber) || isNaN(priceNumber)) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const productPayload: Product = {
      id: isEditing ? initialProduct!.id : crypto.randomUUID(),
      name: productName,
      category: productCategory,
      cost: costNumber,
      price: priceNumber,
      createdAt: isEditing
        ? initialProduct!.createdAt
        : new Date().toISOString(),
    };

    dispatch({
      type: isEditing ? 'UPDATE_PRODUCT' : 'ADD_PRODUCT',
      payload: productPayload,
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
      <div className="w-[22rem] rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">
          {isEditing ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm">
            Nombre
            <input
              className="mt-1 w-full rounded border px-2 py-1"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <label className="block text-sm">
            Categoría
            <select
              className="mt-1 w-full rounded border px-2 py-1"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value as Category)}
            >
              {categoryOptions.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <div className="flex gap-4">
            <label className="flex-1 text-sm">
              Costo
              <input
                type="number"
                step="0.01"
                className="mt-1 w-full rounded border px-2 py-1"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
              />
            </label>

            <label className="flex-1 text-sm">
              Precio
              <input
                type="number"
                step="0.01"
                className="mt-1 w-full rounded border px-2 py-1"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {isEditing ? 'Guardar' : 'Crear'}
            </button>
            <button
              type="button"
              className="rounded border px-4 py-2 hover:bg-gray-50"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
