import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/models/Sujet';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';


@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.css']
})

export class PostulerComponent implements OnInit {

  public sujets:Sujet[] = [];

  constructor(public candidatPostuler : CandidatPostulerService) { }

  ngOnInit(): void {
    this.getPublishedSujets();
  }

  getPublishedSujets(){
     this.candidatPostuler.getPublishedSubjects().then(res=>{
       this.sujets = res.results;
     })
  }

}
