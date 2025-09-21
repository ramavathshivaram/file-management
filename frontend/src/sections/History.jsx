import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const History = ({ historydata }) => {
  return (
    <div>
      <Breadcrumb className="p-3 border-b w-full">
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
            <BreadcrumbItem>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default History;
