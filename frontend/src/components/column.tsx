import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { OpenButton } from "@/Redux/reducers/EditToggle";
import axios from "axios";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  location: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const dispatch = useDispatch<AppDispatch>();

      async function RemoveData(id: any) {
        await axios.delete(`http://localhost:3000/company/${id}`).then(() => {
          toast.success("Data Deleted");
          window.location.reload();
        });
      }

      return (
        <div className="flex items-center gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  dispatch(OpenButton(payment));
                }}
              >
                <Pen size={16} color="#00ff40" />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="center" side="bottom">
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => RemoveData(payment.id)}
              >
                <Trash2 size={16} color="#ff0000" />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="center" side="bottom">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
