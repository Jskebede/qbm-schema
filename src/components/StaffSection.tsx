import { StaffCard } from "./StaffCard";
import { AddStaffDialog } from "./AddStaffDialog";
import { useToast } from "@/hooks/use-toast";

interface Staff {
  id: number;
  name: string;
  stations: string[];
}

interface StaffSectionProps {
  staff: Staff[];
  stations: Station[];
  onAddStaff: (name: string, stations: string[]) => void;
  onDeleteStaff: (id: number) => void;
}

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

export const StaffSection = ({ staff, stations, onAddStaff, onDeleteStaff }: StaffSectionProps) => {
  const { toast } = useToast();

  const handleDelete = (staffMember: Staff) => {
    onDeleteStaff(staffMember.id);
    toast({
      title: "Klart",
      description: `Grisen "${staffMember.name}" har tagits bort`,
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-pink-700">Grisar</h2>
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
            onDelete={() => handleDelete(member)}
          />
        ))}
        {staff.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            Inga Grisar tillagda än
          </p>
        )}
      </div>
    </section>
  );
};