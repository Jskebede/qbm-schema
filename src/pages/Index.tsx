import { useState } from "react";
import { StaffCard } from "@/components/StaffCard";
import { StationCard } from "@/components/StationCard";
import { AddStaffDialog } from "@/components/AddStaffDialog";
import { AddStationDialog } from "@/components/AddStationDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

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

interface Schedule {
  [hour: string]: {
    [station: string]: string[];
  };
}

type ScheduleType = "thursday" | "friday";

const scheduleHours = {
  thursday: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00"],
  friday: ["19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00", "02:00", "03:00"],
};

const Index = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
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

    const hours = scheduleHours[scheduleType];
    const newSchedule: Schedule = {};

    // Initialize empty schedule
    hours.forEach((hour) => {
      newSchedule[hour] = {};
      stations.forEach((station) => {
        newSchedule[hour][station.name] = [];
      });
    });

    // For each hour and station, assign staff members
    hours.forEach((hour) => {
      stations.forEach((station) => {
        const availableStaff = staff.filter((member) =>
          member.stations.includes(station.name)
        );

        if (availableStaff.length < station.requiredStaff) {
          toast({
            title: "Warning",
            description: `Not enough qualified staff for ${station.name}`,
            variant: "destructive",
          });
          return;
        }

        // Simple round-robin assignment
        for (let i = 0; i < station.requiredStaff; i++) {
          const staffIndex = i % availableStaff.length;
          newSchedule[hour][station.name].push(availableStaff[staffIndex].name);
        }
      });
    });

    setSchedule(newSchedule);
    toast({
      title: "Success",
      description: "Schedule generated successfully",
    });

    console.log("Generated Schedule:", newSchedule);
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Bar Schedule Manager</h1>
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
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Staff Members</h2>
              <AddStaffDialog
                stations={stations.map((s) => s.name)}
                onAddStaff={handleAddStaff}
              />
            </div>
            <div className="grid gap-4">
              {staff.map((member) => (
                <StaffCard
                  key={member.id}
                  name={member.name}
                  stations={member.stations}
                />
              ))}
              {staff.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No staff members added yet
                </p>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Stations</h2>
              <AddStationDialog onAddStation={handleAddStation} />
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

          {schedule && (
            <section className="col-span-full">
              <h2 className="text-2xl font-semibold mb-4">Generated Schedule</h2>
              <div className="grid gap-6">
                {Object.entries(schedule).map(([hour, stationAssignments]) => (
                  <Card key={hour} className="p-6 bg-gradient-to-r from-purple-50 to-white">
                    <h3 className="text-lg font-medium text-purple-900 mb-4 border-b pb-2">
                      {hour}
                    </h3>
                    <div className="grid gap-4">
                      {Object.entries(stationAssignments).map(([station, staffMembers], index) => (
                        <div 
                          key={station} 
                          className={`flex flex-wrap items-center gap-4 p-3 rounded-lg ${
                            index % 2 === 0 ? 'bg-white' : 'bg-purple-50'
                          }`}
                        >
                          <span className="font-medium text-purple-900 min-w-[120px]">
                            {station}:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {staffMembers.map((member, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-900 rounded-full text-sm"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
