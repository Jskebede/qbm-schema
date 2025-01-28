import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export const HowToUseDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          Hur fuck gör jag??
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hur använder man QBM Pub-Schema</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-pink-700 mb-2">Steg 1: Skapa Stationer</h3>
            <p className="text-sm text-muted-foreground">
              Börja alltid med att skapa dina stationer. Använd "Lägg till Station" knappen för att lägga till varje arbetsstation
              och ange hur många Grisar som behövs för varje.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-pink-700 mb-2">Steg 2: Lägg till Grisar</h3>
            <p className="text-sm text-muted-foreground">
              Lägg till Grisar enligt dina totala stationskrav. Till exempel:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Om du har 3 barplatser, 2 entréplatser och 1 plockplats</li>
              <li>Behöver du lägga till 6 Grisar totalt (3 + 2 + 1)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-pink-700 mb-2">Steg 3: Generera Schema</h3>
            <p className="text-sm text-muted-foreground">
              När du har lagt till alla stationer och Grisar, klicka på "Generera Schema" knappen
              för att skapa ditt schema. Systemet kommer automatiskt att tilldela Grisar till stationer baserat på
              deras förmågor.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};