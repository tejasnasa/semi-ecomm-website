import type { Product } from "../types/Product";
import "./ProductTable.css";

interface Props {
  products: Product[];
  selected: string;
}

const SPEC_COLUMNS: { key: keyof Product; label: string }[] = [
  { key: "vdss", label: "VDSS V" },
  { key: "vgs", label: "VGS V" },
  { key: "vthMin", label: "VTH Min V" },
  { key: "vthMax", label: "VTH Max V" },
  { key: "idTa25", label: "ID(A) / TA=25" },
  { key: "vthVMax", label: "VTH(V) Max." },
  { key: "ron45v", label: "Ron 4.5v" },
  { key: "ron10v", label: "Ron 10v" },
];

export default function ProductTable({ products, selected }: Props) {
  if (products.length === 0) {
    return (
      <div className="table-empty">Select a subcategory to view products.</div>
    );
  }

  const visibleColumns = SPEC_COLUMNS.filter((col) =>
    products.some((p) => p[col.key] !== null),
  );

  return (
    <section className="table-wrapper">
      <div className="title">{selected}</div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Part No.</th>
            <th>Datasheet</th>
            {visibleColumns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.partNo}</td>
              <td>
                {product.datasheetUrl ? (
                  <a
                    href={product.datasheetUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    PDF
                  </a>
                ) : (
                  "—"
                )}
              </td>
              {visibleColumns.map((col) => (
                <td key={col.key}>{product[col.key] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
