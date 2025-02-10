import { Component, OnInit } from '@angular/core';
import { CalendrierType } from 'src/app/enums/CalendrierType';
import { Calendrier } from 'src/app/models/Calendrier';
import Result from 'src/app/models/Result';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: '[app-calendrier]',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})

export class CalendrierComponent implements OnInit {

  public CalendarProf:Calendrier [];
  public CalendarDoctorant:Calendrier[];
  public isFetchingInfo = true;
  public calendar:Array<Calendrier> ;
  public errorText:string;

  constructor(private _calendarService:CalendarService) { }

  ngOnInit(): void {

    this.CalendarProf = [];
    this.CalendarDoctorant = [];
    this.calendar = [];

    this.getData();
  
  }

  getData(){
    this._calendarService.getCalenders().then(data=>{

      this.isFetchingInfo = false;

      data.forEach(x=>{
      
        this.calendar.push(x);
      })

      this.calendar.forEach(k=>{

        if(k.pour.toLocaleLowerCase() === CalendrierType.Calendar_Prof.toLocaleLowerCase()){
          this.CalendarProf.push(k);
         
        }

        if(k.pour.toLocaleLowerCase() === CalendrierType.Calendar_Prof_Candidat.toLocaleLowerCase()) {
          this.CalendarDoctorant.push(k);
          }
        
       })  
    })
  }
}

