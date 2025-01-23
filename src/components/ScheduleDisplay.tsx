import { Card } from "@/components/ui/card";

interface ScheduleDisplayProps {
  schedule: {
    [hour: string]: {
      [station: string]: string[];
    };
  };
}

export const ScheduleDisplay = ({ schedule }: ScheduleDisplayProps) => {
  return (
    <section className="col-span-full">
      <h2 className="text-2xl font-semibold mb-4 text-pink-700">Generated Schedule</h2>
      <div className="grid gap-6">
        {Object.entries(schedule).map(([hour, stationAssignments]) => (
          <Card key={hour} className="p-6 bg-gradient-to-r from-pink-50 to-white">
            <h3 className="text-lg font-medium text-pink-700 mb-4 border-b pb-2">
              {hour}
            </h3>
            <div className="grid gap-4">
              {Object.entries(stationAssignments).map(([station, staffMembers], index) => (
                <div 
                  key={station} 
                  className={`flex flex-wrap items-center gap-4 p-3 rounded-lg ${
                    index % 2 === 0 ? 'bg-white' : 'bg-pink-50'
                  }`}
                >
                  <span className="font-medium text-pink-700 min-w-[120px]">
                    {station}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {staffMembers.map((member, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
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
  );
};