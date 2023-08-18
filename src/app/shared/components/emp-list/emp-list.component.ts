import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
import { AppComponent } from 'src/app/app.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
@Injectable({
  providedIn: 'root'}
)
export class EmpListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'designation', 'salary', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _empService: EmployeeService, private _confirmService: NgConfirmService){}

  ngOnInit(): void {
    this.getEmployeeList()
  }



  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._confirmService.showConfirm("Are you sure want to delete ?", () => {
      this._empService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert("Employee deleted successfully!")
          this.getEmployeeList();
        },
        error: console.log
      })
    },
    () => {
      
    })
  }

  edit(data: any) {
    let name = data.name;
    let designation = data.designation;
    let salary = data.salary
     console.log(name,salary,designation)
  }
    
  
  
}
