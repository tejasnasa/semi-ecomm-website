import type { Product } from "../types/Product";
import "./Sidebar.css";

interface Props {
  grouped: Record<string, Record<string, Product[]>>;
  onSelect: (category: string, subcategory: string) => void;
  selected: string | null;
}

export default function Sidebar({ grouped, onSelect, selected }: Props) {
  return (
    <aside className="sidebar">
      {Object.entries(grouped).map(([category, subcategories]) => (
        <div key={category} className="sidebar-category">
          <div className="sidebar-category-title">{category}</div>
          {Object.keys(subcategories).map((sub) => (
            <div
              key={sub}
              className={`sidebar-subitem ${selected === sub ? "active" : ""}`}
              onClick={() => onSelect(category, sub)}
            >
              › {sub}
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
}
