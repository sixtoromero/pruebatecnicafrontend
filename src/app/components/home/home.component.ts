import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { CorrespondenceService } from 'src/app/services/correspondence.service';
import { UserService } from 'src/app/services/user.service';
import { CorrespondeceModel } from 'src/app/models/correspondence.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [CorrespondenceService, UserService, GeneralService, MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit {

  msgs: Message[] = [];
  results: CorrespondeceModel[] = [];
  Senders: UserModel[] = [];
  Addressees: UserModel[] = [];

  selcorrespondece: CorrespondeceModel;  
  displayModal: boolean = false;
  isNew: boolean = true;
  
  public myForm: FormGroup  = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private correspondeceService: CorrespondenceService,
    private userService: UserService,
    private general: GeneralService,    
    private confirmationService: ConfirmationService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) { 

    this.myForm = fb.group({
      Type: ['', [Validators.required]],
      SenderId: ['', [Validators.required]],
      AddresseeId: ['', [Validators.required]],
      Subject: ['', [Validators.required]],
      Body: ['', [Validators.required]]      
    });

  }

  ngOnInit(): void {    
    this.getCorrespondenceByUserId();
    this.getUsersAll();
  }

  get f() {
    return this.myForm.controls;
  }

  insertOrupdate(){
    if (this.isNew){
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    this.ngxService.start();
    const model = this.prepareSave();
    model.UserId = 1;
    model.Id = this.selcorrespondece.Id;
    this.correspondeceService.insert(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){        
        this.displayModal = false; 
        this.getCorrespondenceByUserId();
        this.general.showSuccess('registrado exitosamente');        
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  update() {
    this.ngxService.start();
    const model = this.prepareSave();
    model.UserId = 1;
    model.Id = this.selcorrespondece.Id;
    this.correspondeceService.update(model)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      if (response["IsSuccess"]){        
        this.displayModal = false;         
        this.getCorrespondenceByUserId();
        this.general.showSuccess('Actualizado exitosamente');        
      } else {
        this.general.showError(`Ha ocurrido un error inesperado: ${response["Message"]}`);
      }
    }, error => {
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  getCorrespondenceByUserId() {
    this.ngxService.start();
    this.correspondeceService.getCorrespondenceByUserId(1)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {
      console.log('Respuesta', response);
      if (response["IsSuccess"]) {        
        this.results = response["Data"] as CorrespondeceModel[];        
      }
    }, error => {
      this.ngxService.stop()
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  getUsersAll() {
    this.ngxService.start();
    this.userService.getUserAll()
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {      
      if (response["IsSuccess"]) {
        this.Senders = response["Data"] as UserModel[];
        this.Addressees = response["Data"] as UserModel[];
      }
    }, error => {
      this.ngxService.stop()
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  deleteCorrespondence(Id: number){
    this.ngxService.start();
    this.correspondeceService.delete(Id)
    .pipe(finalize(() => this.ngxService.stop()))
    .subscribe(response => {      
      if (response["IsSuccess"]) {        
        this.general.showSuccess("Se ha eliminado el registro correctamente.");
        this.getCorrespondenceByUserId();
      }
    }, error => {
      this.ngxService.stop()
      this.general.showError('Ha ocurrido un error inesperado.');
    });
  }

  confirmDelete(Id: number) {
    this.confirmationService.confirm({
        message: 'Está seguro de eliminar el registro seleccionado?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteCorrespondence(Id);
        }
    });
  }

  editModal(item: CorrespondeceModel) {        

    this.f.Type.setValue(item.Type);
    this.f.SenderId.setValue(item.SenderId);
    this.f.AddresseeId.setValue(item.AddresseeId);
    this.f.Subject.setValue(item.Subject);
    this.f.Body.setValue(item.Body);

    this.selcorrespondece = item;
    this.displayModal = true;
    this.isNew = false;

  }

  private prepareSave(): CorrespondeceModel {
    return new CorrespondeceModel().deserialize(this.myForm.value);
  }



}
