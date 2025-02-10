import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidat } from 'src/app/models/Candidat';
import { Commission } from 'src/app/models/Commission';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import swal from 'sweetalert';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-preselection',
  templateUrl: './preselection.component.html',
  styleUrls: ['./preselection.component.css']
})

export class PreselectionComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public alert2: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined;
  public commissions: Commission[] = [];
  public sujets: Sujet[] = [];
  public candidatsSujet: {
    examiner_id: number,
    candidat: Candidat,
    valider: boolean
  }[]
  closeResult = '';
  candidats: Candidat[] = [];
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  constructor(private modalService: NgbModal, private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    Promise.all([this.getCommissions()]).then(() => {
      this.alert = {
        type: 'success',
        message: 'success',
      };
    }).catch((error) => {
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

  onClickSujet(content: any, s: Sujet) {
    this.candidatsSujet = []
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.getCandidatsSujet(s.id).then(() => {
      this.alert = {
        type: 'success',
        message: 'success',
      };
      this.open(content)
    }).catch((error) => {
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open2(content: any, c:Commission) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'l' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.envoyerNotification(c.id)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getCandidatsSujet(id: number) {
    return new Promise((resolve, reject) => {
      this.operationsService.getCandidatsSujet(id).then(data => {
        this.candidatsSujet = data['data'] as {
          examiner_id: number,
          candidat: Candidat,
          valider: boolean
        }[]
        console.log(this.candidatsSujet)
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getCommissions = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getCommissions().then(data => {
        this.loading = false
        console.log(data)
        this.result = data as Result<Commission>;
        this.commissions = this.result.results;
        // console.log(this.commissions)
        this.itemsCount = data.count;
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }

  onIndexChange(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getCommissions(offset)
      .then((d) => {
        this.commissions = d.results;
      })
      .finally(() => (this.loading = false));
  }

  onCandidatSelect(item: any) {
    this.loading = true
    this.alert2 = {
      type: 'loading',
      message: 'loading',
    };
    const valider = {
      valider: !item.valider
    }
    this.operationsService.validerCandidat(item.examiner_id, valider).then((data) => {
      item.valider = !item.valider
      console.log(data)
      this.alert2 = {
        type: 'success',
        message: 'success',
      };
    }).catch((error) => {
      this.alert2 = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert2 = undefined), 300);
    });
  }


  envoyerNotification(id:number){
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService.envoyerNotification(id).then((data) => {
      console.log(data)
      this.alert = {
        type: 'success',
        message: 'success',
      };
    }).catch((error) => {
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 300);
    });
  }

  
}
