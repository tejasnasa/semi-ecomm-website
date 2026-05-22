import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductTable from "./components/ProductTable";
import Sidebar from "./components/Sidebar";
import { useProducts } from "./hooks/useProducts";

function App() {
  const { grouped, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );

  const handleSelect = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const selectedProducts =
    selectedCategory && selectedSubcategory
      ? (grouped[selectedCategory]?.[selectedSubcategory] ?? [])
      : [];

  if (loading)
    return (
      <main className="app">
        <Navbar grouped={grouped} onSelect={handleSelect} />
        <main className="loading">
          <div className="spinner"></div>
        </main>
      </main>
    );

  return (
    <main className="app">
      <Navbar grouped={grouped} onSelect={handleSelect} />
      <div className="main">
        <Sidebar
          grouped={grouped}
          onSelect={handleSelect}
          selected={selectedSubcategory}
        />
        <ProductTable
          products={selectedProducts}
          selected={selectedSubcategory}
        />
      </div>
    </main>
  );
}

export default App;
