
interface Staff {
  name: string;
  stations: string[];
}

interface Station {
  name: string;
  requiredStaff: number;
}

interface StaffPair {
  staff1: string;
  staff2: string;
  count: number;
}

export const generateFairSchedule = (
  staff: Staff[],
  stations: Station[],
  hours: string[]
) => {
  const schedule: { [hour: string]: { [station: string]: string[] } } = {};
  const staffAssignments: { [staffName: string]: { [station: string]: number } } = {};
  const staffPairs: StaffPair[] = [];

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

  // Helper function to check if staff have worked together before
  const haveWorkedTogether = (staff1: string, staff2: string): boolean => {
    const pair = staffPairs.find(
      p => (p.staff1 === staff1 && p.staff2 === staff2) || 
           (p.staff1 === staff2 && p.staff2 === staff1)
    );
    return pair ? pair.count >= 1 : false;
  };

  // Helper function to record staff working together
  const recordStaffPair = (staff1: string, staff2: string) => {
    const existingPair = staffPairs.find(
      p => (p.staff1 === staff1 && p.staff2 === staff2) || 
           (p.staff1 === staff2 && p.staff2 === staff1)
    );
    
    if (existingPair) {
      existingPair.count++;
    } else {
      staffPairs.push({ staff1, staff2, count: 1 });
    }
  };

  // Helper function to find the best staff member for a station
  const findBestStaffMember = (
    station: string,
    hour: string,
    availableStaff: Staff[],
    currentAssignments: string[] = []
  ): Staff | null => {
    const qualified = availableStaff.filter(member => 
      member.stations.includes(station) &&
      !schedule[hour][station].includes(member.name) &&
      (currentAssignments.length === 0 || !haveWorkedTogether(member.name, currentAssignments[0]))
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
      const stationAssignments: string[] = [];

      for (let i = 0; i < neededStaff; i++) {
        const availableStaff = staff.filter(member => !hourlyAssignments.has(member.name));
        const bestStaff = findBestStaffMember(station.name, hour, availableStaff, stationAssignments);
        
        if (bestStaff) {
          stationAssignments.push(bestStaff.name);
          schedule[hour][station.name].push(bestStaff.name);
          hourlyAssignments.add(bestStaff.name);
          staffAssignments[bestStaff.name][station.name]++;

          // If this is the second person assigned to this station,
          // record them as a pair
          if (stationAssignments.length === 2) {
            recordStaffPair(stationAssignments[0], stationAssignments[1]);
          }
        }
      }
    });
  });

  return schedule;
};
