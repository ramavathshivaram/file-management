import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/UploadButton";

const historydata = [
  { id: 1, name: "Home" },
  { id: 2, name: "Documents" },
  { id: 3, name: "Downloads" },
  { id: 4, name: "Pictures" },
];
const History = ( ) => {
  return (
    <div className="w-full flex items-center justify-between border-b p-2">
      <Breadcrumb>
        <BreadcrumbList>
          {historydata ? (
            historydata.map((item, index) => (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink>{item.name}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < historydata.length - 1 && <BreadcrumbSeparator />}
              </>
            ))
          ) : (
            <BreadcrumbItem key={1}>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <UploadButton />
    </div>
  );
};

export default History;
