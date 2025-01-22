import { useState } from "react";
import { StaffCard } from "@/components/StaffCard";
import { StationCard } from "@/components/StationCard";
import { AddStaffDialog } from "@/components/AddStaffDialog";
import { AddStationDialog } from "@/components/AddStationDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

interface Staff {
  id: number;
  name: string;
  stations: string[];
}

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

const Index = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const { toast } = useToast();

  const handleAddStaff = (name: string, selectedStations: string[]) => {
    setStaff([...staff, { id: Date.now(), name, stations: selectedStations }]);
    toast({
      title: "Success",
      description: "Staff member added successfully",
    });
  };

  const handleAddStation = (name: string, requiredStaff: number) => {
    setStations([...stations, { id: Date.now(), name, requiredStaff }]);
    toast({
      title: "Success",
      description: "Station added successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Bar Schedule Manager</h1>
          <Button className="gap-2" variant="outline">
            <Calendar className="w-4 h-4" />
            Generate Schedule
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Staff Members</h2>
              <AddStaffDialog
                stations={stations.map((s) => s.name)}
                onAddStaff={handleAddStaff}
              />
            </div>
            <div className="grid gap-4">
              {staff.map((member) => (
                <StaffCard
                  key={member.id}
                  name={member.name}
                  stations={member.stations}
                />
              ))}
              {staff.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No staff members added yet
                </p>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Stations</h2>
              <AddStationDialog onAddStation={handleAddStation} />
            </div>
            <div className="grid gap-4">
              {stations.map((station) => (
                <StationCard
                  key={station.id}
                  name={station.name}
                  requiredStaff={station.requiredStaff}
                />
              ))}
              {stations.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No stations added yet
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;