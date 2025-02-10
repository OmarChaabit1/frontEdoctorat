import { Component, Input, OnInit } from '@angular/core';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { HttpService } from 'src/app/public/services/http.service';


@Component({
  selector: '[app-laboratoires]',
  templateUrl: './laboratoires.component.html',
  styleUrls: ['./laboratoires.component.css']
})

export class LaboratoiresComponent implements OnInit {

  public laboratoires:Array<Laboratoire> = [];

  getSliderClass(first,last,isEven,isOdd){
    return {
      active : first,
      lastactive : last,
      even : isEven,
      odd : isOdd
  }
  }
  
  @Input() public laboratoire!:Laboratoire;

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.getLaboratoires().subscribe(
      res=>{
        this.laboratoires = res;
      }
    )
  }

  



}
