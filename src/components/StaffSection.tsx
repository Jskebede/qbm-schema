import { Button } from "@/components/ui/button";
import { AddStaffDialog } from "./AddStaffDialog";
import { StaffCard } from "./StaffCard";

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

interface StaffSectionProps {
  staff: Staff[];
  stations: Station[];
  onAddStaff: (name: string, selectedStations: string[]) => void;
  onDeleteStaff: (id: number) => void;
}

export const StaffSection = ({ staff, stations, onAddStaff, onDeleteStaff }: StaffSectionProps) => {
  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Grisar</h2>
        <AddStaffDialog 
          onAddStaff={onAddStaff} 
          stations={stations.map(station => station.name)} 
        />
      </div>
      <div className="space-y-4">
        {staff.map((member) => (
          <StaffCard key={member.id} staff={member} onDelete={onDeleteStaff} />
        ))}
      </div>
    </div>
  );
};