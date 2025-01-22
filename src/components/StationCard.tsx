import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store } from "lucide-react";

interface StationCardProps {
  name: string;
  requiredStaff: number;
  onClick?: () => void;
}

export const StationCard = ({ name, requiredStaff, onClick }: StationCardProps) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Store className="w-8 h-8 text-muted-foreground" />
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="text-sm">
          {requiredStaff} staff required
        </Badge>
      </CardContent>
    </Card>
  );
};