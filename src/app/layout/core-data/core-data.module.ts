import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreDataRoutingModule } from './core-data-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { CoreDataComponent } from './core-data.component';
import { TableModule } from 'primeng/table';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import {KeyFilterModule} from 'primeng/keyfilter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreDataRoutingModule,
    HttpClientModule,
    CheckboxModule,
    TableModule,
    KeyFilterModule
  ],
  declarations: [CoreDataComponent, SpinnerComponent],
  providers: [SpinnerService]
})
export class CoreDataModule { }
