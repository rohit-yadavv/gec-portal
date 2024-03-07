"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { createUserByAdmin } from "@/lib/actions/user.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; 

const RegisterUserForm = () => {
  const [data, setData] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e: any) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      for (const row of data) {
        const oneTimePassword = Math.random().toString(36).slice(-8);

        await createUserByAdmin({
          name: row.Name,
          email: row.Email,
          rollNo: row.RollNo,
          course: row.Course,
          department: row.Department,
          sem: row.Sem,
          teacher: row.Teacher,
          password: oneTimePassword,
        });

      }
      toast("Registered Successfully");
    } catch (error: any) {
      toast(`Registration Unsuccessfully ${error.message}`);
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-6">
      <Label htmlFor="fileInput">
        Upload file of students to register with columns (name, rohit, roll no,
        dept, course)
      </Label>
      <Input
        required
        id="fileInput"
        className="cursor-pointer"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      <div className="flex w-full justify-end">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="primary-gradient w-fit !text-light-900"
        >
          {isSubmitting ? "Registering..." : "Register Now"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterUserForm;
