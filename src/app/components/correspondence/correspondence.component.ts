import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { CorrespondeceModel } from 'src/app/models/correspondence.model';
import { GeneralService } from 'src/app/services/general.service';
import { CorrespondenceService } from 'src/app/services/correspondence.service';

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.scss'],
  providers: [CorrespondenceService, GeneralService, MessageService, ConfirmationService]
})
export class CorrespondenceComponent implements OnInit {

  public myForm: FormGroup  = new FormGroup({});
  @Input() correspondence:CorrespondeceModel = new CorrespondeceModel();
  
  constructor(
    private fb: FormBuilder,
    private service: CorrespondenceService,
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,
    private general: GeneralService) { 

    this.myForm = fb.group({
      Type: ['', [Validators.required]],
      SenderId: ['', [Validators.required]],
      AddresseeId: ['', [Validators.required]],
      Subject: ['', [Validators.required]],
      Body: ['', [Validators.required]]      
    });
    
  }

  ngOnInit(): void {
        
  }

  get f() {
    return this.myForm.controls;
  }

  update() {
    this.ngxService.start();
    const model = this.prepareSave();
    this.service.update(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){        
        this.general.showSuccess('Actualizado exitosamente');
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  private prepareSave(): CorrespondeceModel {
    return new CorrespondeceModel().deserialize(this.myForm.value);
  }



}
