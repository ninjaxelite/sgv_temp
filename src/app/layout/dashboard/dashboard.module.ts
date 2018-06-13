import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { RulesComponent } from './components/rules/rules.component';
import { TableComponent } from './components/table/table.component';

import { HttpClientModule } from '@angular/common/http';

import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    HttpClientModule,
    MultiSelectModule,
    TooltipModule,
    FormsModule
  ],
  declarations: [DashboardComponent, RulesComponent, TableComponent]
})
export class DashboardModule { }
