import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StationCardProps {
  name: string;
  requiredStaff: number;
  onClick?: () => void;
  onDelete?: () => void;
}

export const StationCard = ({ name, requiredStaff, onClick, onDelete }: StationCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn relative group"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <Store className="w-8 h-8 text-muted-foreground" />
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className="text-sm">
          {requiredStaff} staff required
        </Badge>
      </CardContent>
    </Card>
  );
};