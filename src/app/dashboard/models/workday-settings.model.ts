
export interface WorkdaySettingsModel {
  freeSaturdays: boolean;
  freeSundays: boolean;
  workingTimeStart: string;
  workingTimeEnd: string;
  freeDayList: [
    {
      date: string;
      description: string;
    },
  ];
}
