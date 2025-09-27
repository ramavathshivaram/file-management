import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Folder } from "lucide-react";

const CardComponentSkeleton = () => {
  return (
    <div className="w-full flex animate-pulse">
      <Card className="w-full aspect-square gap-0 hover:shadow-lg transition-shadow group/card">
        <CardContent className="flex flex-col items-center justify-center">
          <Folder className="w-4/5 h-4/5 text-gray-600" strokeWidth={1} />
        </CardContent>

        <CardFooter className="text-center">
          <CardTitle className="truncate">Folder</CardTitle>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardComponentSkeleton;
