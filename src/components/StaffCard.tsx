import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Staff {
  id: number;
  name: string;
  stations: string[];
}

interface StaffCardProps {
  staff: Staff;
  onDelete: (id: number) => void;
}

export const StaffCard = ({ staff, onDelete }: StaffCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(staff.id);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn relative group bg-white/5"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-white" />
          <CardTitle className="text-lg font-medium text-white">{staff.name}</CardTitle>
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
        <div className="flex flex-wrap gap-2">
          {staff.stations.map((station, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-sm bg-white/10 text-white"
            >
              {station}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};