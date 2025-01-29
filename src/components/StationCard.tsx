import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

interface StationCardProps {
  station: Station;
  onDelete: (id: number) => void;
}

export const StationCard = ({ station, onDelete }: StationCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(station.id);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn relative group bg-white/5"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Store className="w-6 h-6 text-white" />
          <CardTitle className="text-lg font-medium text-white">{station.name}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-black/20 transition-all duration-200"
          onClick={handleDelete}
        >
          <Trash2 className="h-6 w-6 text-white hover:text-[#ea384c] transition-colors" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-white" />
          <Badge variant="secondary" className="text-sm bg-white/10 text-white">
            {station.requiredStaff} staff required
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};