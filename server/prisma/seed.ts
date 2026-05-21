import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { prisma } from "../src/lib/prisma";

async function main() {
  const file = fs.readFileSync(path.join(__dirname, "../Assignment.csv"));

  const rows = parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  for (const row of rows as Record<string, string>[]) {
    await prisma.product.upsert({
      where: { partNo: row["Part No."] },
      update: {},
      create: {
        category: row["Category"],
        subcategory: row["Sub-category"],
        partNo: row["Part No."],
        datasheetUrl: row["Datasheet Link (PDF)"] || null,
        vdss: row["VDSS V"] || null,
        vgs: row["VGS V"] || null,
        vthMin: row["VTH Min V"] || null,
        vthMax: row["VTH Max V"] || null,
        idTa25: row["ID(A) / TA=25"] || null,
        vthVMax: row["VTH(V) Max."] || null,
        ron45v: row["Ron 4.5v(mMax."] || null,
        ron10v: row["Ron10v(m?)Max."] || null,
      },
    });
  }

  console.log("Seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
