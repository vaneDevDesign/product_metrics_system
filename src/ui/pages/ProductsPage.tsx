import { ProductTable } from '../components/ProductTable';

export const ProductsPage = () => (
  <main className="container mx-auto max-w-4xl p-6">
    <h1 className="text-2xl font-semibold mb-6">Gestión de productos</h1>
    <ProductTable />
  </main>
);
