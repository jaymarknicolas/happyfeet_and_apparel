"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductReturn } from "@/prisma/type";
import { useLayout } from "@/components/context/LayoutProvider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddProductReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (productReturn: Pick<ProductReturn, "reason">) => void;
  loadingAddProductReturn: boolean;
}

// Define validation schema using Zod
enum FormType {
  PRODUCT = 'product',
  ORDER = 'order',
}

enum ProductReturnReason {
  LOST = "Lost",
  RETURN = "Return",
  REFUND = "Refund",
  OTHER = "Other",
}

const productReturnSchema = z.object({
  user_id: z.number(),
  id: z.number().int().positive("Product/Order ID is required."),
  type: z.enum([FormType.PRODUCT, FormType.ORDER]),
  quantity: z.number().int().min(1, "Quantity must be greater than 0."),
  reason: z.enum([
    ProductReturnReason.LOST,
    ProductReturnReason.RETURN,
    ProductReturnReason.REFUND,
    ProductReturnReason.OTHER,
  ]),
  otherReason: z.string().max(500, "Description cannot exceed 500 characters").optional(),
}).refine((data) => {
  if (data.reason === ProductReturnReason.OTHER) {
    return data.otherReason !== undefined && data.otherReason !== "";
  }
  return true;
}, {
  message: "Please provide a reason when selecting 'Other'",
  path: ["otherReason"],
});

type ProductReturnFormValues = z.infer<typeof productReturnSchema>;

import ProductSearch from "./product-search";
import SalesOrderSearch from "./order-search";

export function AddProductReturnModal({
  isOpen,
  onClose,
  onAdd,
  loadingAddProductReturn,
}: AddProductReturnModalProps) {
  const { user } = useLayout();
  const [activeTab, setActiveTab] = useState(FormType.PRODUCT);
  const form = useForm<ProductReturnFormValues>({
    resolver: zodResolver(productReturnSchema),
    defaultValues: {
      user_id: Number(user?.user.id ?? 0),
      type: activeTab,
      reason: ProductReturnReason.OTHER,
      otherReason: "",
    },
  });

  const handleTabChange = (value: string) => {
    form.reset();
    console.log("Switched to tab:", value);
    form.setValue("type", value as FormType);
    setActiveTab(value as FormType);
  };

  const onSubmit = (data: ProductReturnFormValues) => {
    if (onAdd) {
      data.user_id = Number(user?.user.id ?? 0);
      const productReturnData: Pick<ProductReturn, "reason">  = {
        ...data,
      };
      onAdd(productReturnData);

    }
  };

  useEffect(() => {
    if (!loadingAddProductReturn) {
      form.reset();
      onClose();
    }
  }, [loadingAddProductReturn]);

  // useEffect(() => {
  // }, [form.watch()]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Product Return</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="product" onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="order">Order</TabsTrigger>
        </TabsList>
        <TabsContent value="product">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4 grid-cols-1">
              {/* Product */}
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      {/* <Input type="number" {...field} /> */}
                      <ProductSearch
                        value={field.value}
                        onChange={(productId) =>
                          field.onChange(productId)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter quantity" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Reason */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ProductReturnReason.LOST}>{ProductReturnReason.LOST}</SelectItem>
                        <SelectItem value={ProductReturnReason.RETURN}>{ProductReturnReason.RETURN}</SelectItem>
                        <SelectItem value={ProductReturnReason.REFUND}>{ProductReturnReason.REFUND}</SelectItem>
                        <SelectItem value={ProductReturnReason.OTHER}>{ProductReturnReason.OTHER}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {form.getValues("reason") === ProductReturnReason.OTHER && (
                 <FormField
                 control={form.control}
                 name="otherReason"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Other</FormLabel>
                     <FormControl>
                       <Textarea
                         placeholder="Enter other reason for product return"
                         {...field}
                         className="h-[200px]"
                       />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loadingAddProductReturn}
                className="min-w-full"
              >
                <span className={`${loadingAddProductReturn ? "hidden" : "block"}`}>
                  Add Product Return
                </span>
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass={`${loadingAddProductReturn ? "block" : "!hidden"}`}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </TabsContent>
        <TabsContent value="order">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4 grid-cols-1">
              {/* Order */}
              <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        {/* <Input type="number" {...field} /> */}
                        <SalesOrderSearch
                          value={field.value}
                          onChange={(salesOrderId) =>
                            field.onChange(salesOrderId)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              {/* Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter quantity" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Reason */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ProductReturnReason.LOST}>{ProductReturnReason.LOST}</SelectItem>
                        <SelectItem value={ProductReturnReason.RETURN}>{ProductReturnReason.RETURN}</SelectItem>
                        <SelectItem value={ProductReturnReason.REFUND}>{ProductReturnReason.REFUND}</SelectItem>
                        <SelectItem value={ProductReturnReason.OTHER}>{ProductReturnReason.OTHER}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {form.getValues("reason") === ProductReturnReason.OTHER && (
                 <FormField
                 control={form.control}
                 name="otherReason"
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>Other</FormLabel>
                     <FormControl>
                       <Textarea
                         placeholder="Enter other reason for order return"
                         {...field}
                         className="h-[200px]"
                       />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loadingAddProductReturn}
                className="min-w-full"
              >
                <span className={`${loadingAddProductReturn ? "hidden" : "block"}`}>
                  Add Product Return
                </span>
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass={`${loadingAddProductReturn ? "block" : "!hidden"}`}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </TabsContent>
        </Tabs>
        
      </DialogContent>
    </Dialog>
  );
}
