import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";

interface StaffCardProps {
  name: string;
  stations: string[];
  onClick?: () => void;
}

export const StaffCard = ({ name, stations, onClick }: StaffCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <UserCircle className="w-8 h-8 text-muted-foreground" />
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {stations.map((station) => (
            <Badge key={station} variant="secondary">
              {station}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};