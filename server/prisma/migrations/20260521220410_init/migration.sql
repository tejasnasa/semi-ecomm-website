-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "partNo" TEXT NOT NULL,
    "datasheetUrl" TEXT,
    "vdss" TEXT,
    "vgs" TEXT,
    "vthMin" TEXT,
    "vthMax" TEXT,
    "idTa25" TEXT,
    "vthVMax" TEXT,
    "ron45v" TEXT,
    "ron10v" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_partNo_key" ON "Product"("partNo");
