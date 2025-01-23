import { StationCard } from "./StationCard";
import { AddStationDialog } from "./AddStationDialog";

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

interface StationsSectionProps {
  stations: Station[];
  onAddStation: (name: string, requiredStaff: number) => void;
}

export const StationsSection = ({ stations, onAddStation }: StationsSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-pink-700">Stations</h2>
        <AddStationDialog onAddStation={onAddStation} />
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
  );
};