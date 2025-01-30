import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ScheduleDisplayProps {
  schedule: {
    [hour: string]: {
      [station: string]: string[];
    };
  };
}

export const ScheduleDisplay = ({ schedule }: ScheduleDisplayProps) => {
  // Get unique stations across all hours
  const allStations = Array.from(
    new Set(
      Object.values(schedule).flatMap(hourSchedule => 
        Object.keys(hourSchedule)
      )
    )
  ).sort();

  const hours = Object.keys(schedule);

  // Get all unique staff members
  const allStaff = Array.from(
    new Set(
      Object.values(schedule).flatMap(hourSchedule =>
        Object.values(hourSchedule).flat()
      )
    )
  );

  // Create a color mapping for each staff member
  const staffColors = {
    borderColors: {
      0: "border-[#8B5CF6]", // Vivid Purple
      1: "border-[#D946EF]", // Magenta Pink
      2: "border-[#F97316]", // Bright Orange
      3: "border-[#0EA5E9]", // Ocean Blue
      4: "border-[#10B981]", // Emerald
      5: "border-[#EF4444]", // Red
      6: "border-[#F59E0B]", // Amber
      7: "border-[#6366F1]"  // Indigo
    }
  };

  const getStaffColor = (staffName: string) => {
    const index = allStaff.indexOf(staffName) % Object.keys(staffColors.borderColors).length;
    return staffColors.borderColors[index as keyof typeof staffColors.borderColors];
  };

  return (
    <section className="col-span-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-pink-700">Generated Schedule</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 bg-pink-50 font-semibold text-pink-900">Time</TableHead>
              {allStations.map((station) => (
                <TableHead 
                  key={station} 
                  className="bg-pink-50 text-pink-900 font-semibold text-center"
                >
                  {station}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hours.map((hour) => (
              <TableRow key={hour} className="hover:bg-pink-50/50">
                <TableCell className="font-medium bg-pink-50/80 text-pink-900">
                  {hour}
                </TableCell>
                {allStations.map((station) => (
                  <TableCell 
                    key={station}
                    className="p-2 text-sm border"
                  >
                    <div className="flex flex-wrap gap-1 justify-center">
                      {schedule[hour][station]?.map((staff, idx) => (
                        <span
                          key={idx}
                          className={`
                            inline-block px-3 py-1 
                            bg-white text-black
                            border-2 ${getStaffColor(staff)}
                            rounded-full text-xs font-medium
                            shadow-sm
                            transition-all
                            hover:shadow-md
                          `}
                        >
                          {staff}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};