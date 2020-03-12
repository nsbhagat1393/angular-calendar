import { Component, ViewChild, ElementRef } from "@angular/core";
import { extend, isNullOrUndefined } from "@syncfusion/ej2-base";
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
  DragEventArgs,
  ResizeEventArgs,
  ActionEventArgs,
  Schedule,
  EJ2Instance
} from "@syncfusion/ej2-angular-schedule";
import { scheduleData } from "./data";
import {
  DialogComponent,
  AnimationSettingsModel
} from "@syncfusion/ej2-angular-popups";
import { EmitType } from "@syncfusion/ej2-base";
import { ButtonComponent, ButtonModel } from "@syncfusion/ej2-angular-buttons";
import { DialogUtility } from "@syncfusion/ej2-popups";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService
  ]
})
export class AppComponent {
  public selectedDate: Date = new Date();
  public data: object[] = [
    {
      Id: 1,
      Subject: "Meeting",
      StartTime: new Date(2018, 1, 15, 10, 0),
      EndTime: new Date(2018, 1, 15, 12, 30)
    }
  ];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };

  onDragStart(args: DragEventArgs) {
    args.navigation.enable = true;
  }
  onResizeStart(args: ResizeEventArgs) {}

  onActionBegin(args: ActionEventArgs) {
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      let eventData: any = !isNullOrUndefined(args.data[0])
        ? args.data[0]
        : args.data;
      console.log(eventData);
      let scheduleElement: Element = document.querySelector(".e-schedule");
      let scheduleObj: Schedule = (scheduleElement as EJ2Instance)
        .ej2_instances[0] as Schedule;

      if (
        !scheduleObj.isSlotAvailable(eventData.StartTime, eventData.EndTime)
      ) {
        
        // DialogUtility.confirm({
        //   title: " Event Overlaps",
        //   content: `This event with title as ${
        //     eventData.Subject
        //   } overlaps with an existing one!, Do you want it to overlap`,
        //   okButton: { text: "OK" },
        //   cancelButton: { text: "Cancel" },
        //   position:{},
        //   showCloseIcon: true,
        //   closeOnEscape: true,
        //   animationSettings: { effect: "Zoom" }
        // });

        const answer = confirm("Do you want the events to overlap?");

        if(answer){
          args.cancel=false
        }else {
        args.cancel = true;
      }
      } 
    }
  }
}
