import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StaffSection } from "@/components/StaffSection";
import { StationsSection } from "@/components/StationsSection";
import { ScheduleDisplay } from "@/components/ScheduleDisplay";
import { generateFairSchedule } from "@/utils/scheduleGenerator";

interface Staff {
  id: number;
  name: string;
  stations: string[];
}

interface Station {
  id: number;
  name: string;
  requiredStaff: number;
}

type ScheduleType = "thursday" | "friday";

const scheduleHours = {
  thursday: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00"],
  friday: ["19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00"],
};

const Index = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [schedule, setSchedule] = useState<{ [hour: string]: { [station: string]: string[] } } | null>(null);
  const [scheduleType, setScheduleType] = useState<ScheduleType>("thursday");
  const { toast } = useToast();

  const handleAddStaff = (name: string, selectedStations: string[]) => {
    setStaff([...staff, { id: Date.now(), name, stations: selectedStations }]);
    toast({
      title: "Success",
      description: "Staff member added successfully",
    });
  };

  const handleAddStation = (name: string, requiredStaff: number) => {
    setStations([...stations, { id: Date.now(), name, requiredStaff }]);
    toast({
      title: "Success",
      description: "Station added successfully",
    });
  };

  const generateSchedule = () => {
    if (staff.length === 0 || stations.length === 0) {
      toast({
        title: "Error",
        description: "Please add both staff members and stations before generating a schedule",
        variant: "destructive",
      });
      return;
    }

    const newSchedule = generateFairSchedule(staff, stations, scheduleHours[scheduleType]);
    setSchedule(newSchedule);
    
    toast({
      title: "Success",
      description: "Schedule generated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-pink-700">Bar Schedule Manager</h1>
          <div className="flex items-center gap-4">
            <Select
              value={scheduleType}
              onValueChange={(value: ScheduleType) => setScheduleType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select schedule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thursday">Thursday Pub (17-01)</SelectItem>
                <SelectItem value="friday">Friday/Tenta Pub (19-03)</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="gap-2" 
              variant="outline"
              onClick={generateSchedule}
            >
              <Calendar className="w-4 h-4" />
              Generate Schedule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaffSection staff={staff} onAddStaff={handleAddStaff} />
          <StationsSection stations={stations} onAddStation={handleAddStation} />
          {schedule && <ScheduleDisplay schedule={schedule} />}
        </div>
      </div>
    </div>
  );
};

export default Index;