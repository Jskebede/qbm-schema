import { StaffCard } from "./StaffCard";
import { AddStaffDialog } from "./AddStaffDialog";

interface Staff {
  id: number;
  name: string;
  stations: string[];
}

interface StaffSectionProps {
  staff: Staff[];
  onAddStaff: (name: string, stations: string[]) => void;
}

export const StaffSection = ({ staff, onAddStaff }: StaffSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-pink-700">Staff Members</h2>
        <AddStaffDialog
          stations={staff.flatMap((s) => s.stations).filter((v, i, a) => a.indexOf(v) === i)}
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