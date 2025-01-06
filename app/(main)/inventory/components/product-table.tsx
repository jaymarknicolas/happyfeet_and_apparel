"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader, //I'll do it tomorrow
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Product } from "@/prisma/type";

// components
// import { UpdateProductDialog } from "./update-product-dialog";
import { ViewProductDialog } from "./view-product-dialog";
import DeleteProductDialog from "./delete-product-dialog";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [page, setPage] = React.useState(1);
  const [paginatedProducts, setPaginatedProducts] = React.useState<Product[]>(
    []
  );
  const itemsPerPage = 10; // Update to 10 items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  React.useEffect(() => {
    const productArray = Object.values(products);
    const paginatedProducts = productArray.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    setPaginatedProducts(paginatedProducts);
  }, [products, page]);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead> {/* Added column for actions */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product) => (
            <TableRow key={product.product_id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Image
                  src={`https://picsum.photos/seed/${Math.random()
                    .toString(36)
                    .substring(2, 8)}/2428/2447`}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </TableCell>

              <TableCell>{product.name}</TableCell>
              <TableCell>{product.barcode}</TableCell>
              <TableCell>{product.category_id}</TableCell>
              <TableCell className="text-right">
                ₱{product.unit_price.toLocaleString()}
              </TableCell>
              <TableCell>{product.quantity_in_stock}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <ViewProductDialog product={product} />
                  {/* <UpdateProductDialog product={product} /> */}
                  <DeleteProductDialog product={product} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === page ? "default" : "outline"}
            size="sm"
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
