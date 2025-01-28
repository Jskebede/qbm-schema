import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Trash2 } from "lucide-react";
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
      className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn relative group"
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <UserCircle className="w-8 h-8 text-muted-foreground" />
        <CardTitle className="text-lg font-medium">{staff.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {staff.stations.map((station) => (
            <Badge key={station} variant="secondary">
              {station}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};