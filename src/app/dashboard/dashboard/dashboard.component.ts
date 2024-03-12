import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {
  MbscCalendarColor,
  MbscCalendarEvent,
  MbscCellClickEvent,
  MbscEventcalendarView,
  MbscPageChangeEvent, setOptions
} from "@mobiscroll/angular";
import {UserLookupModel} from "../models/user-lookup.model";
import {WorkdaySettingsModel} from "../models/workday-settings.model";

setOptions({
  theme: 'material',
  themeVariant: 'light',
});

const defUsers = [
  {
    id: '1',
    userName: 'a'
  },
  {
    id: '2',
    userName: 'b'
  },
  {
    id: '3',
    userName: 'c'
  },
  {
    id: '4',
    userName: 'd'
  }
];
const defWorkdaySettings: WorkdaySettingsModel = {
  freeSaturdays: true,
  freeSundays: true,
  workingTimeStart:
    "08:00:00",
  workingTimeEnd: "16:00:00",
  freeDayList: [
    {
      date: "2023-12-26",
      description: "Boxing Day"
    }
  ]
}
const defMyEvents = [
  {
    id: '1',
    name: 'test 1',
    reservationType: 1,
    reservationStatus: 1,
    resource: '1',
    start: new Date(new Date().setHours(8, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0)),
  },
  {
    id: '2',
    name: 'test 2',
    reservationType: 1,
    reservationStatus: 1,
    resource: '1',
    start: new Date(new Date().setHours(8, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0)),
  },
  {
    id: '3',
    name: 'test 3',
    reservationType: 1,
    reservationStatus: 1,
    resource: '2',
    start: new Date(new Date().setHours(8, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0)),
  },
  {
    id: '4',
    name: 'test 4',
    reservationType: 1,
    reservationStatus: 1,
    resource: '2',
    start: new Date(new Date().setHours(8, 0, 0)),
    end: new Date(new Date().setHours(16, 0, 0)),
  }
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @HostBinding('class') class = 'display-flex-component';

  resources: UserLookupModel[] = [];

  myInvalids: any[] = [];
  colors: MbscCalendarColor[] = [];

  startDate!: Date;
  endDate!: Date;

  myEvents: MbscCalendarEvent[] = [];
  view = 'workweek';
  calView: MbscEventcalendarView = {
    timeline: {
      type: 'week',
      startDay: 1,
      endDay: 5,
      // maxEventStack: 2,
      timeCellStep: 60,
      timeLabelStep: 60,
    },
  };

  resourcesLoaded = false;

  private workDaySettings!: WorkdaySettingsModel;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setInitStartEndDate();
    this.initLoaders();
  }

  changeView(): void {
    // setTimeout(() => {
      switch (this.view) {
        case 'day':
          this.calView = {
            timeline: {
              type: 'day',
              // maxEventStack: 2,
              timeCellStep: 30,
            },
          };
          break;
        case '3days':
          this.calView = {
            timeline: {
              type: 'day',
              size: 3,
              // maxEventStack: 2,
              timeCellStep: 60,
              timeLabelStep: 60,
            },
          };
          break;
        case 'workweek':
          this.calView = {
            timeline: {
              type: 'week',
              startDay: 1,
              endDay: 5,
              // maxEventStack: 2,
              timeCellStep: 60,
              timeLabelStep: 60,
            },
          };
          break;
        case 'month':
          this.calView = {
            timeline: {
              type: 'month',
              // maxEventStack: 2,
              timeCellStep: 4 * 60,
              timeLabelStep: 4 * 60,
            },
          };
          break;
      }
      this.changeDetector.markForCheck();
    // });
  }

  cellDoubleClicked(event: MbscCellClickEvent) {
    if (event.source === 'timeline') {
      const endDate = new Date(event.date);
      endDate.setHours(endDate.getHours() + 8);

      //show create edit dialog
    }
  }

  eventUpdateFail(): void {}

  pageChanged(event: MbscPageChangeEvent) {
    this.startDate = event.firstDay;
    this.endDate = event.lastDay;
    this.loadReservationsForNewDates();
  }

  private loadReservationsForNewDates() {
    setTimeout(() => {
      this.myEvents = defMyEvents;
    }, 1000);
  }

  private initLoaders() {
    setTimeout(() => {
      this.resources = defUsers;
      this.resourcesLoaded = true;

      this.workDaySettings = defWorkdaySettings;
      this.setWorkDays();

      this.changeDetector.markForCheck();
    }, 1000);
  }

  private setInitStartEndDate() {
    const today = new Date();

    switch (this.view) {
      case 'day':
        break;
      case '3days':
        break;
      case 'workweek':
        const day = today.getDay() || 7;
        if (day !== 1) today.setHours(-24 * (day - 1));
        this.startDate = today;
        const endDate = new Date(today);
        endDate.setHours(24 * 5);
        this.endDate = endDate;
        break;
    }

    this.loadReservationsForNewDates();
  }

  private setWorkDays() {
    if (this.workDaySettings.freeSaturdays) {
      this.myInvalids.push({
        recurring: {
          repeat: 'weekly',
          weekDays: 'SA',
        },
        cssClass: 'invalid-day',
      });
    }

    if (this.workDaySettings.freeSundays) {
      this.myInvalids.push({
        recurring: {
          repeat: 'weekly',
          weekDays: 'SU',
        },
        cssClass: 'invalid-day',
      });
    }

    if (this.workDaySettings.freeDayList) {
      this.myInvalids = [
        ...this.myInvalids,
        ...this.workDaySettings.freeDayList.map(freeDay => {
          return {
            allDay: true,
            start: new Date(freeDay.date),
            end: new Date(freeDay.date),
            title: freeDay.description,
          };
        }),
      ];
    }

    if (this.workDaySettings.workingTimeStart) {
      this.colors.push({
        start: '00:00',
        end: this.workDaySettings.workingTimeStart,
        recurring: {
          repeat: 'weekly',
          weekDays: 'MO,TU,WE,TH,FR',
        },
        background: '#f5f5f5',
      });
    }

    if (this.workDaySettings.workingTimeEnd) {
      this.colors.push({
        start: this.workDaySettings.workingTimeEnd,
        end: '23:59',
        recurring: {
          repeat: 'weekly',
          weekDays: 'MO,TU,WE,TH,FR',
        },
        background: '#f5f5f5',
      });
    }

    this.changeDetector.markForCheck();
  }

}

