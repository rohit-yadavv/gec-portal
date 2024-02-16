import xlsx, { IJsonSheet } from "json-as-xlsx";
export function downloadToExcel(data:any) {
  
  const columns: IJsonSheet[] = [
    {
      sheet: "users",
      columns: [ 
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Roll No", value: "rollNo" },
        { label: "Course", value: "course" },
        { label: "Department", value: "department" },
      ],
      content: data,
    },
  ];
  const settings = {
    fileName: "people Excel",
  };
  xlsx(columns, settings);
}

 