// Importing libraries and components
import { Payment, columns } from "@/components/column";
import { DataTable } from "@/components/data-table";
import { TooltipProvider } from "./components/ui/tooltip";
import { Button } from "./components/ui/button";
import React from "react";
import { Info, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-Provider";
import Edit from "./components/Edit-Overlay";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";
import AddData from "./components/AddData";

export default function DemoPage() {
  const { setTheme } = useTheme();
  // setting state for open and close
  const [Open, setOpen] = React.useState<boolean>(false);
  // setting state for data
  const [Data, setData] = React.useState<Payment[]>([]);

  // fetching data from api and setting it to data using useEffect and axios
  React.useEffect(() => {
    async function GetData() {
      const response = await axios.get("http://localhost:3000/company");
      setData(response.data);
    }
    GetData();
  }, []);

  return (
    <TooltipProvider>
      <div className="w-6/12 mx-auto py-10">
        <div className="w-full h-full py-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Button onClick={() => setOpen(!Open)} className="flex gap-3">
              <Info /> Add Info
            </Button>
            {/* Theme Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className={`${
              Open
                ? "border-t-2 border-slate-400 h-52 block"
                : "border-t-2 border-slate-400 h-2 hidden"
            } py-2`}
          >
            {/* Implementing AddData to add data */}
            <AddData />
          </div>
        </div>
        <DataTable columns={columns} data={Data} />
      </div>
      {/* Edit to edit data */}
      <Edit />
      {/* To Provide information to the user about the process */}
      <Toaster />
    </TooltipProvider>
  );
}

// Here data table is used to show data in the page
// Most of the data componets are in componets folder
// to get more info visit to https://ui.shadcn.com/docs/components/data-table
