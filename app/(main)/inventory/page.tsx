"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

// components
import { AddProductDialog } from "./components/add-product-dialog";
import { ProductTable } from "./components/product-table";

// right sidebar
import QuickActions from "../dashboard/components/QuickActions";
import RecentActivity from "@/components/global/RecentActivity";

// types
import { Product } from "@/prisma/type";

const InventoryPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/products"); // Adjust API path if necessary
        setProducts(data.data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-16 px-8 space-y-8 grid grid-cols-1 xl:grid-cols-3">
      <div className="p-6 space-y-6 col-span-1 xl:col-span-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <div className="flex gap-4 flex-wrap flex-col w-full sm:flex-row">
            <div className="flex items-center gap-4 flex-1 max-w-xl flex-nowrap flex-grow">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search" className="pl-8" />
              </div>
            </div>
            <Button
              className="bg-[#00A3FF] hover:bg-[#00A3FF]/90"
              onClick={() => setOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          {products && !loading && <ProductTable products={products} />}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <div className="col-span-1 p-4 mx:p-8 flex xl:block items-start gap-8 flex-col-reverse sm:flex-row">
        <QuickActions />
        <RecentActivity />
      </div>
      <AddProductDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default InventoryPage;
