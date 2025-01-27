import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StaffSection } from "@/components/StaffSection";
import { StationsSection } from "@/components/StationsSection";
import { ScheduleDisplay } from "@/components/ScheduleDisplay";
import { generateFairSchedule } from "@/utils/scheduleGenerator";
import { HowToUseDialog } from "@/components/HowToUseDialog";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <img 
          src="/lovable-uploads/63dc340b-e8d4-40cc-862f-5fd6c3773e01.png" 
          alt="QBM Logo" 
          className="w-48 h-48 animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn relative">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center">
          <div className="w-1/4">
            <HowToUseDialog />
          </div>
          <div className="w-2/4 text-center">
            <h1 className="text-4xl font-bold text-pink-700">Bar Schedule Manager</h1>
          </div>
          <div className="w-1/4 flex justify-end gap-4">
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
          <StaffSection staff={staff} stations={stations} onAddStaff={handleAddStaff} />
          <StationsSection stations={stations} onAddStation={handleAddStation} />
          {schedule && <ScheduleDisplay schedule={schedule} />}
        </div>
      </div>

      {/* Fixed QBM Logo in bottom right corner */}
      <div className="fixed bottom-4 right-4 z-50">
        <img 
          src="/lovable-uploads/63dc340b-e8d4-40cc-862f-5fd6c3773e01.png" 
          alt="QBM Logo" 
          className="w-24 h-24"
        />
      </div>
    </div>
  );
};

export default Index;