import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AccordionModule} from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FileUploadModule} from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { VirtualScrollerModule } from 'primeng/virtualscroller'
import {TableModule} from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxCurrencyModule } from "ngx-currency";

import { InterceptorService } from './interceptors/interceptor.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component'
import { HomeComponent  } from './components/home/home.component';
import { APP_ROUTING } from './app.routes'

import { AgGridModule } from 'ag-grid-angular';
import { CorrespondenceComponent } from './components/correspondence/correspondence.component';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent, 
    NavbarComponent, CorrespondenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,    
    APP_ROUTING,
    HttpClientModule,
    DialogModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    RadioButtonModule,
    AccordionModule,
    InputSwitchModule,
    AutoCompleteModule,
    FileUploadModule,
    InputTextareaModule,
    CardModule,
    MessageModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    EditorModule,
    VirtualScrollerModule,
    NgxUiLoaderModule,
    InfiniteScrollModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    NgxSpinnerModule,
    NgxCurrencyModule,
    AgGridModule.withComponents([])
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
