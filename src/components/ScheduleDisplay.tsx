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

  return (
    <section className="col-span-full bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2 text-pink-700">Generated Schedule</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 bg-pink-50">Time</TableHead>
              {allStations.map((station) => (
                <TableHead 
                  key={station} 
                  className="bg-pink-50 text-pink-700 font-medium"
                >
                  {station}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hours.map((hour) => (
              <TableRow key={hour}>
                <TableCell className="font-medium bg-pink-50 text-pink-700">
                  {hour}
                </TableCell>
                {allStations.map((station) => (
                  <TableCell 
                    key={station}
                    className="p-2 text-sm border"
                  >
                    {schedule[hour][station]?.map((staff, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 m-0.5 bg-pink-100 text-pink-700 rounded-full text-xs"
                      >
                        {staff}
                      </span>
                    ))}
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