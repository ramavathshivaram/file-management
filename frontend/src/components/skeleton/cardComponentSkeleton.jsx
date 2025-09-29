import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Folder } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const CardComponentSkeleton = () => {
  return (
    <div className="w-full flex ">
      <Card className="w-full aspect-square gap-0 hover:shadow-lg transition-shadow group/card">
        <CardContent className="flex flex-col items-center justify-center">
          <Skeleton className="w-full h-35" />
        </CardContent>

        <CardFooter className="text-center">
          <Skeleton className="h-[20px] w-1/2 mt-2 rounded-full" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardComponentSkeleton;
