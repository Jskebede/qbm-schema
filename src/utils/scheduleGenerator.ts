
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
    unassignedStaff: Set<string>,
    currentAssignments: string[] = []
  ): string | null => {
    const qualified = Array.from(unassignedStaff).filter(staffName => {
      const staffMember = staff.find(s => s.name === staffName);
      return staffMember?.stations.includes(station) &&
             !schedule[hour][station].includes(staffName) &&
             (currentAssignments.length === 0 || !haveWorkedTogether(staffName, currentAssignments[0]));
    });

    if (qualified.length === 0) return null;

    // Sort by number of times they've worked this station (ascending)
    return qualified.sort((a, b) => 
      (staffAssignments[a][station] || 0) - (staffAssignments[b][station] || 0)
    )[0];
  };

  // Generate schedule for each hour
  hours.forEach(hour => {
    // Sort stations by required staff (descending) to handle larger stations first
    const sortedStations = [...stations].sort((a, b) => b.requiredStaff - a.requiredStaff);
    const unassignedStaff = new Set(staff.map(s => s.name)); // Track unassigned staff for this hour

    sortedStations.forEach(station => {
      const neededStaff = station.requiredStaff;
      const stationAssignments: string[] = [];

      for (let i = 0; i < neededStaff && unassignedStaff.size > 0; i++) {
        const bestStaff = findBestStaffMember(
          station.name,
          hour,
          unassignedStaff,
          stationAssignments
        );

        if (bestStaff) {
          stationAssignments.push(bestStaff);
          schedule[hour][station.name].push(bestStaff);
          unassignedStaff.delete(bestStaff); // Remove from unassigned pool
          staffAssignments[bestStaff][station.name]++;

          // If this is the second person assigned to this station,
          // record them as a pair
          if (stationAssignments.length === 2) {
            recordStaffPair(stationAssignments[0], stationAssignments[1]);
          }
        }
      }
    });

    // Handle any remaining unassigned staff
    if (unassignedStaff.size > 0) {
      // Find stations that can still accommodate more staff
      const availableStations = sortedStations.filter(station => 
        schedule[hour][station.name].length < station.requiredStaff
      );

      // Distribute remaining staff across available stations
      Array.from(unassignedStaff).forEach(staffName => {
        const staffMember = staff.find(s => s.name === staffName);
        if (!staffMember) return;

        // Find a station this staff member can work at
        const availableStation = availableStations.find(station => 
          staffMember.stations.includes(station.name) &&
          schedule[hour][station.name].length < station.requiredStaff
        );

        if (availableStation) {
          schedule[hour][availableStation.name].push(staffName);
          staffAssignments[staffName][availableStation.name]++;
          
          // If this makes a pair, record it
          if (schedule[hour][availableStation.name].length === 2) {
            recordStaffPair(
              schedule[hour][availableStation.name][0],
              schedule[hour][availableStation.name][1]
            );
          }
        }
      });
    }
  });

  return schedule;
};
