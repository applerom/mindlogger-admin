export type Actions = {
  scheduleSetupAction: (value: number) => void;
  userDataExportAction: (value: number) => void;
  viewDataAction: (value: number) => void;
  removeAccessAction: (value: number) => void;
};

export type ChosenAppletData = {
  appletId: string;
  appletName?: string;
  secretUserId?: string;
  hasIndividualSchedule?: boolean;
  userId?: string;
};
