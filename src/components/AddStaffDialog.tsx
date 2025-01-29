import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface AddStaffDialogProps {
  stations: string[];
  onAddStaff: (name: string, stations: string[]) => void;
}

export const AddStaffDialog = ({ stations, onAddStaff }: AddStaffDialogProps) => {
  const [name, setName] = useState("");
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name",
        variant: "destructive",
      });
      return;
    }
    if (selectedStations.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one station",
        variant: "destructive",
      });
      return;
    }
    onAddStaff(name, selectedStations);
    setName("");
    setSelectedStations([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStations(stations);
    } else {
      setSelectedStations([]);
    }
  };

  const areAllSelected = stations.length > 0 && selectedStations.length === stations.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter staff name"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label>Stations</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={areAllSelected}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="selectAll" className="text-sm text-muted-foreground">Select All</Label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stations.map((station) => (
                <div key={station} className="flex items-center space-x-2">
                  <Checkbox
                    id={station}
                    checked={selectedStations.includes(station)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStations([...selectedStations, station]);
                      } else {
                        setSelectedStations(selectedStations.filter((s) => s !== station));
                      }
                    }}
                  />
                  <Label htmlFor={station}>{station}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">Add Staff Member</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};