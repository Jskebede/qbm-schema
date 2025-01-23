import { StaffCard } from "./StaffCard";
import { AddStaffDialog } from "./AddStaffDialog";

interface Staff {
  id: number;
  name: string;
  stations: string[];
}

interface StaffSectionProps {
  staff: Staff[];
  stations: Station[];
  onAddStaff: (name: string, stations: string[]) => void;
}

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

export const StaffSection = ({ staff, stations, onAddStaff }: StaffSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-pink-700">Staff Members</h2>
        <AddStaffDialog
          stations={stations.map(station => station.name)}
          onAddStaff={onAddStaff}
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
  );
};