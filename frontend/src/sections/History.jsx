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
import useFolderStore from "@/store/folderStore";

const History = () => {
  const pathHistory = useFolderStore((state) => state.pathHistory);
  const removeAfterFolderId = useFolderStore(
    (state) => state.removeAfterFolderId
  );
  console.log("history path",pathHistory)
  return (
    <div className="w-full flex items-center justify-between border-b p-2">
      <Breadcrumb>
        <BreadcrumbList>
          {pathHistory.length > 0 ? (
            pathHistory.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem
                  onClick={() => removeAfterFolderId(item.id)}
                  className="hover:text-gray-950 cursor-pointer"
                >
                  <BreadcrumbLink>{item.name}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < pathHistory.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))
          ) : (
            <BreadcrumbItem
              key={1}
              className="hover:text-gray-950 cursor-pointer"
            >
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
