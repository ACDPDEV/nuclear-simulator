import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { Button } from "./ui/button";

function Info() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Información</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-4 h-4 bg-green-400 rounded-full" />
            <span>Célula sana (0-50 rem)</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-4 h-4 bg-orange-400 rounded-full" />
            <span>Célula dañada (51-200 rem)</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-4 h-4 bg-violet-500 rounded-full" />
            <span>Célula mutada (201-500 rem)</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-4 h-4 bg-stone-800 rounded-full" />
            <span>Célula muerta (501+ rem)</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { Info };
