"use client";

import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Weekly sales data structure
const weeklyData = [
  {
    time: "09:00",
    mon: 250,
    tue: 100,
    wed: 200,
    thu: 300,
    fri: 150,
    sat: 1200,
    sun: 400,
  },
  {
    time: "10:00",
    mon: 800,
    tue: 200,
    wed: 300,
    thu: 200,
    fri: 400,
    sat: 300,
    sun: 200,
  },
  {
    time: "11:00",
    mon: 400,
    tue: 300,
    wed: 200,
    thu: 300,
    fri: 200,
    sat: 200,
    sun: 900,
  },
  {
    time: "12:00",
    mon: 300,
    tue: 700,
    wed: 400,
    thu: 1100,
    fri: 1300,
    sat: 800,
    sun: 1200,
  },
  {
    time: "13:00",
    mon: 200,
    tue: 1200,
    wed: 300,
    thu: 200,
    fri: 900,
    sat: 400,
    sun: 300,
  },
  {
    time: "14:00",
    mon: 400,
    tue: 300,
    wed: 1400,
    thu: 300,
    fri: 1100,
    sat: 200,
    sun: 200,
  },
  {
    time: "15:00",
    mon: 300,
    tue: 200,
    wed: 300,
    thu: 200,
    fri: 300,
    sat: 300,
    sun: 200,
  },
  {
    time: "16:00",
    mon: 500,
    tue: 400,
    wed: 300,
    thu: 200,
    fri: 200,
    sat: 900,
    sun: 300,
  },
];

const supplierData = [
  { name: "Apple", early: 74, onTime: 18, late: 8 },
  { name: "Samsung", early: 73, onTime: 13, late: 14 },
  { name: "Asus", early: 47, onTime: 18, late: 35 },
  { name: "Xiaomi", early: 67, onTime: 12, late: 21 },
  { name: "Logitech", early: 62, onTime: 28, late: 10 },
];

function getColorForValue(value: number): string {
  if (value <= 500) return "bg-[#E3F2FD]";
  if (value <= 1000) return "bg-[#29B6F6]";
  return "bg-[#0277BD]";
}

export default function Reports() {
  return (
    <div className="w-full space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">Reports</CardTitle>
          <Button className="bg-[#00A3FF] hover:bg-[#00A3FF]/90">
            <Printer className="mr-2 h-4 w-4" />
            Print Reports
          </Button>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Weekly Sales Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Weekly Sales</h3>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-[#00A3FF]">Aug 19-25</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-1">
                <div className="text-sm text-muted-foreground"></div>
                <div className="text-center text-sm text-muted-foreground">
                  Mon
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Tue
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Wed
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Thu
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Fri
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Sat
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Sun
                </div>
              </div>

              {weeklyData.map((row) => (
                <div
                  key={row.time}
                  className="grid grid-cols-[80px_repeat(7,1fr)] gap-1"
                >
                  <div className="text-sm text-muted-foreground">
                    {row.time}
                  </div>
                  <div
                    className={`h-12 rounded ${getColorForValue(row.mon)}`}
                  />
                  <div
                    className={`h-12 rounded ${getColorForValue(row.tue)}`}
                  />
                  <div
                    className={`h-12 rounded ${getColorForValue(row.wed)}`}
                  />
                  <div
                    className={`h-12 rounded ${getColorForValue(row.thu)}`}
                  />
                  <div
                    className={`h-12 rounded ${getColorForValue(row.fri)}`}
                  />
                  <div
                    className={`h-12 rounded ${getColorForValue(row.sat)}`}
                  />
                  <div
                    className={`h-12 rounded ${getColorForValue(row.sun)}`}
                  />
                </div>
              ))}

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-[#E3F2FD]" />
                  <span className="text-sm text-muted-foreground">0-500</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-[#29B6F6]" />
                  <span className="text-sm text-muted-foreground">
                    501-1,000
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-[#0277BD]" />
                  <span className="text-sm text-muted-foreground">
                    1,001-5,000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Performance Report Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                Supplier Performance Report
                <span className="ml-2 text-sm text-muted-foreground">
                  (Top 5 Suppliers)
                </span>
              </h3>
            </div>

            <div className="space-y-4">
              {supplierData.map((supplier) => (
                <div key={supplier.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{supplier.name}</span>
                  </div>
                  <div className="flex h-4 w-full overflow-hidden rounded">
                    <div
                      className="bg-[#00A3FF]"
                      style={{ width: `${supplier.early}%` }}
                    />
                    <div
                      className="bg-[#FFA726]"
                      style={{ width: `${supplier.onTime}%` }}
                    />
                    <div
                      className="bg-[#E91E63]"
                      style={{ width: `${supplier.late}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{supplier.early}% Early</span>
                    <span>{supplier.onTime}% On Time</span>
                    <span>{supplier.late}% Late</span>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-[#00A3FF]" />
                  <span className="text-sm text-muted-foreground">Early</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-[#FFA726]" />
                  <span className="text-sm text-muted-foreground">On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-[#E91E63]" />
                  <span className="text-sm text-muted-foreground">Late</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
