export interface Product {
  id: string;
  category: string;
  subcategory: string;
  partNo: string;
  datasheetUrl: string | null;
  vdss: string | null;
  vgs: string | null;
  vthMin: string | null;
  vthMax: string | null;
  idTa25: string | null;
  vthVMax: string | null;
  ron45v: string | null;
  ron10v: string | null;
}
