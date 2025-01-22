import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface AddStationDialogProps {
  onAddStation: (name: string, requiredStaff: number) => void;
}

export const AddStationDialog = ({ onAddStation }: AddStationDialogProps) => {
  const [name, setName] = useState("");
  const [requiredStaff, setRequiredStaff] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a station name",
        variant: "destructive",
      });
      return;
    }
    const staffNumber = parseInt(requiredStaff);
    if (isNaN(staffNumber) || staffNumber < 1) {
      toast({
        title: "Error",
        description: "Please enter a valid number of required staff",
        variant: "destructive",
      });
      return;
    }
    onAddStation(name, staffNumber);
    setName("");
    setRequiredStaff("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Station
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Station</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Station Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter station name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requiredStaff">Required Staff</Label>
            <Input
              id="requiredStaff"
              type="number"
              min="1"
              value={requiredStaff}
              onChange={(e) => setRequiredStaff(e.target.value)}
              placeholder="Enter required staff number"
            />
          </div>
          <Button type="submit" className="w-full">Add Station</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};