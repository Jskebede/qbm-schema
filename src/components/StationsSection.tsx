import { Button } from "@/components/ui/button";
import { AddStationDialog } from "./AddStationDialog";
import { StationCard } from "./StationCard";

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

interface StationsSectionProps {
  stations: Station[];
  onAddStation: (name: string, requiredStaff: number) => void;
  onDeleteStation: (id: number) => void;
}

export const StationsSection = ({ stations, onAddStation, onDeleteStation }: StationsSectionProps) => {
  return (
    <div className="p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Stationer</h2>
        <AddStationDialog onAddStation={onAddStation} />
      </div>
      <div className="space-y-4">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} onDelete={onDeleteStation} />
        ))}
      </div>
    </div>
  );
};