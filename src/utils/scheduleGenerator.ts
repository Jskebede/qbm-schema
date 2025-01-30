interface Staff {
  name: string;
  stations: string[];
}

interface Station {
  name: string;
  requiredStaff: number;
}

export const generateFairSchedule = (
  staff: Staff[],
  stations: Station[],
  hours: string[]
) => {
  const schedule: { [hour: string]: { [station: string]: string[] } } = {};
  const staffAssignments: { [staffName: string]: { [station: string]: number } } = {};

  // Initialize staff assignments counter
  staff.forEach(member => {
    staffAssignments[member.name] = {};
    member.stations.forEach(station => {
      staffAssignments[member.name][station] = 0;
    });
  });

  // Initialize schedule
  hours.forEach(hour => {
    schedule[hour] = {};
    stations.forEach(station => {
      schedule[hour][station.name] = [];
    });
  });

  // Helper function to find the best staff member for a station
  const findBestStaffMember = (
    station: string,
    hour: string,
    availableStaff: Staff[]
  ): Staff | null => {
    const qualified = availableStaff.filter(member => 
      member.stations.includes(station) &&
      !schedule[hour][station].includes(member.name)
    );

    if (qualified.length === 0) return null;

    // Sort by number of times they've worked this station (ascending)
    return qualified.sort((a, b) => 
      (staffAssignments[a.name][station] || 0) - (staffAssignments[b.name][station] || 0)
    )[0];
  };

  // Generate schedule for each hour
  hours.forEach(hour => {
    const hourlyAssignments = new Set<string>(); // Track assignments for this hour

    stations.forEach(station => {
      const neededStaff = station.requiredStaff;
      const availableStaff = staff.filter(member => !hourlyAssignments.has(member.name));

      for (let i = 0; i < neededStaff; i++) {
        const bestStaff = findBestStaffMember(station.name, hour, availableStaff);
        
        if (bestStaff) {
          schedule[hour][station.name].push(bestStaff.name);
          hourlyAssignments.add(bestStaff.name);
          staffAssignments[bestStaff.name][station.name]++;
        }
      }
    });
  });

  return schedule;
};