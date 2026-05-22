import { useState } from "react";
import type { Product } from "../types/Product";
import "./Navbar.css";

interface Props {
  grouped: Record<string, Record<string, Product[]>>;
  onSelect: (category: string, subcategory: string) => void;
}

export default function Navbar({ grouped, onSelect }: Props) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Ecomm Website</div>
      <div className="navbar-menu">
        <div
          className="navbar-item"
          onMouseEnter={() => setHoveredCategory("open")}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          Products ▾
          {hoveredCategory && (
            <div className="dropdown">
              {Object.entries(grouped).map(([category, subcategories]) => (
                <div
                  key={category}
                  className="dropdown-category"
                  onMouseEnter={() => setHoveredCategory(category)}
                >
                  <span className="dropdown-title">
                    {category.toUpperCase()}
                  </span>
                  <div className="dropdown-subcategories">
                    {Object.keys(subcategories).map((sub) => (
                      <div
                        key={sub}
                        className="dropdown-subitem"
                        onClick={() => {
                          onSelect(category, sub);
                          setHoveredCategory(null);
                        }}
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
