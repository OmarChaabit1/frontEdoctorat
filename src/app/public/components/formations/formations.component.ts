import { Component, Input, OnInit } from '@angular/core';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { HttpService } from '../../services/http.service';


@Component({
  selector: '[app-formations]',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})


export class FormationsComponent implements OnInit {

  public formations:Array<FormationDoctorale> [] = [];

  constructor(public httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getFormationsDoctorales().then(res=>{
      console.log(res);
    })
  }


}
