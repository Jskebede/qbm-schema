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
  const consecutiveAssignments: { [staffName: string]: { station: string; count: number } } = {};

  // Initialize staff assignments counter and schedule
  staff.forEach(member => {
    staffAssignments[member.name] = {};
    member.stations.forEach(station => {
      staffAssignments[member.name][station] = 0;
    });
    consecutiveAssignments[member.name] = { station: '', count: 0 };
  });

  // Initialize schedule
  hours.forEach(hour => {
    schedule[hour] = {};
    stations.forEach(station => {
      schedule[hour][station.name] = [];
    });
  });

  // Helper function to check if staff member has been assigned to same station too many times consecutively
  const hasMaxConsecutiveAssignments = (staffName: string, station: string): boolean => {
    return consecutiveAssignments[staffName].station === station && 
           consecutiveAssignments[staffName].count >= 2;
  };

  // Helper function to find the best staff member for a station
  const findBestStaffMember = (
    station: string,
    hour: string,
    availableStaff: Staff[],
    isLastResort: boolean = false
  ): Staff | null => {
    const qualified = availableStaff.filter(member => 
      member.stations.includes(station) &&
      !schedule[hour][station].includes(member.name) &&
      (!hasMaxConsecutiveAssignments(member.name, station) || isLastResort)
    );

    if (qualified.length === 0) return null;

    // Sort by:
    // 1. Number of times they've worked this station (ascending)
    // 2. Total assignments across all stations (ascending)
    return qualified.sort((a, b) => {
      const aStationCount = staffAssignments[a.name][station] || 0;
      const bStationCount = staffAssignments[b.name][station] || 0;
      
      if (aStationCount !== bStationCount) {
        return aStationCount - bStationCount;
      }

      const aTotalCount = Object.values(staffAssignments[a.name]).reduce((sum, count) => sum + count, 0);
      const bTotalCount = Object.values(staffAssignments[b.name]).reduce((sum, count) => sum + count, 0);
      
      return aTotalCount - bTotalCount;
    })[0];
  };

  // Generate schedule for each hour
  hours.forEach(hour => {
    const hourlyAssignments = new Set<string>(); // Track assignments for this hour

    stations.forEach(station => {
      const neededStaff = station.requiredStaff;
      const availableStaff = staff.filter(member => !hourlyAssignments.has(member.name));

      for (let i = 0; i < neededStaff; i++) {
        // Try to find best staff member without breaking consecutive assignment rule
        let bestStaff = findBestStaffMember(station.name, hour, availableStaff);

        // If no staff found, try again but allow breaking consecutive assignment rule
        if (!bestStaff && station.name === availableStaff[0]?.stations[0]) {
          bestStaff = findBestStaffMember(station.name, hour, availableStaff, true);
        }
        
        if (bestStaff) {
          schedule[hour][station.name].push(bestStaff.name);
          hourlyAssignments.add(bestStaff.name);
          staffAssignments[bestStaff.name][station.name]++;

          // Update consecutive assignments
          if (consecutiveAssignments[bestStaff.name].station === station.name) {
            consecutiveAssignments[bestStaff.name].count++;
          } else {
            consecutiveAssignments[bestStaff.name] = { station: station.name, count: 1 };
          }
        }
      }
    });
  });

  return schedule;
};