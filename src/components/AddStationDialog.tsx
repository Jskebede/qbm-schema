import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddStationDialogProps {
  onAddStation: (name: string, requiredStaff: number) => void;
}

interface StationConfig {
  name: string;
  requiredStaff: number;
}

export const AddStationDialog = ({ onAddStation }: AddStationDialogProps) => {
  const [locationType, setLocationType] = useState<"inne" | "ute" | "">("");
  const [currentStep, setCurrentStep] = useState<"selection" | "staffing">("selection");
  const [stations, setStations] = useState<StationConfig[]>([]);
  const { toast } = useToast();

  const handleLocationSelect = (value: "inne" | "ute") => {
    setLocationType(value);
    const stationsList = value === "inne" 
      ? ["Bar", "Entre/Alkgräns", "Disk", "Plock"]
      : ["Bar", "Entre", "Alk-Gräns", "Disk", "Plock"];
    
    setStations(stationsList.map(name => ({ name, requiredStaff: 1 })));
    setCurrentStep("staffing");
  };

  const handleStaffNumberChange = (index: number, value: string) => {
    const newStations = [...stations];
    newStations[index].requiredStaff = parseInt(value) || 1;
    setStations(newStations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    stations.forEach(station => {
      if (station.requiredStaff < 1) {
        toast({
          title: "Error",
          description: `Please enter a valid number of required staff for ${station.name}`,
          variant: "destructive",
        });
        hasError = true;
      }
    });

    if (hasError) return;

    stations.forEach(station => {
      onAddStation(station.name, station.requiredStaff);
    });

    // Reset the form
    setLocationType("");
    setCurrentStep("selection");
    setStations([]);

    toast({
      title: "Success",
      description: "Stations added successfully",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Lägg till Station
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lägg till Stationer</DialogTitle>
        </DialogHeader>
        
        {currentStep === "selection" ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Välj Plats</Label>
              <RadioGroup
                value={locationType}
                onValueChange={(value: "inne" | "ute") => handleLocationSelect(value)}
                className="flex flex-col space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inne" id="inne" />
                  <Label htmlFor="inne">Entre inne</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ute" id="ute" />
                  <Label htmlFor="ute">Entre ute</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {stations.map((station, index) => (
              <div key={station.name} className="space-y-2">
                <Label htmlFor={`staff-${index}`}>{station.name}</Label>
                <Input
                  id={`staff-${index}`}
                  type="number"
                  min="1"
                  value={station.requiredStaff}
                  onChange={(e) => handleStaffNumberChange(index, e.target.value)}
                  placeholder="Enter required staff number"
                />
              </div>
            ))}
            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setCurrentStep("selection")}
                className="w-full"
              >
                Back
              </Button>
              <Button type="submit" className="w-full">Add Stations</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};