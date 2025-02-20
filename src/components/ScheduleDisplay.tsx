
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DndContext, 
  DragEndEvent, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors,
  DraggableAttributes,
  DragOverlay,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";
import { useToast } from "@/hooks/use-toast";

interface ScheduleDisplayProps {
  schedule: {
    [hour: string]: {
      [station: string]: string[];
    };
  };
}

interface DraggableStaffProps {
  name: string;
  color: string;
  id: string;
}

const DraggableStaff = ({ name, color, id }: DraggableStaffProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        inline-block px-3 py-1 
        bg-white text-black
        border-2 ${color}
        rounded-full text-xs font-medium
        shadow-sm cursor-move
        transition-all
        hover:shadow-md
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      {name}
    </div>
  );
};

const DroppableCell = ({ children, id }: { children: React.ReactNode; id: string }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className="w-full h-full">
      {children}
    </div>
  );
};

export const ScheduleDisplay = ({ schedule }: ScheduleDisplayProps) => {
  const [localSchedule, setLocalSchedule] = useState(schedule);
  const { toast } = useToast();

  // Configure sensors for both mouse and touch interactions
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  // Get unique stations across all hours
  const allStations = Array.from(
    new Set(
      Object.values(localSchedule).flatMap(hourSchedule => 
        Object.keys(hourSchedule)
      )
    )
  ).sort();

  const hours = Object.keys(localSchedule);

  // Get all unique staff members
  const allStaff = Array.from(
    new Set(
      Object.values(localSchedule).flatMap(hourSchedule =>
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!active || !over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Parse the IDs to get the source and target positions
    const [sourceHour, sourceStation, sourceIndex] = activeId.split('|');
    const [targetHour, targetStation, targetIndex] = overId.split('|');

    // Create a deep copy of the schedule
    const newSchedule = JSON.parse(JSON.stringify(localSchedule));

    // Swap the staff members
    const sourceStaff = newSchedule[sourceHour][sourceStation][parseInt(sourceIndex)];
    const targetStaff = newSchedule[targetHour][targetStation][parseInt(targetIndex)];

    newSchedule[sourceHour][sourceStation][parseInt(sourceIndex)] = targetStaff;
    newSchedule[targetHour][targetStation][parseInt(targetIndex)] = sourceStaff;

    setLocalSchedule(newSchedule);
    toast({
      title: "Schedule Updated",
      description: `Switched ${sourceStaff} with ${targetStaff}`,
    });
  };

  return (
    <section className="col-span-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-pink-700">Generated Schedule</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <DndContext 
          sensors={sensors} 
          onDragEnd={handleDragEnd}
        >
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
                        {localSchedule[hour][station]?.map((staff, idx) => (
                          <DroppableCell key={`${hour}|${station}|${idx}`} id={`${hour}|${station}|${idx}`}>
                            <DraggableStaff
                              id={`${hour}|${station}|${idx}`}
                              name={staff}
                              color={getStaffColor(staff)}
                            />
                          </DroppableCell>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </section>
  );
};
