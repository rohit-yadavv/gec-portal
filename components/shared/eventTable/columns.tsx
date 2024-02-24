// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
 
import Action from "./Action"; 
// import { acceptEnrollment } from "@/lib/actions/enrollment.action";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ApplicantData = {
  sno?: number;
  name: string;
  rollNo: string;
  email: string;
  course: string;
  department: string;
};

// const [selected, setSelected] = useState();
export const columns: ColumnDef<ApplicantData>[] = [ 
  {
    accessorKey: "sno",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sno
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: (res) => {
      const userId = res.row.original._id;
      const enrollmentId = res.table.options.enrollmentId 
      return (
        <Action userId={userId} enrollmentId={enrollmentId}/>
      );
    },
  },
];
