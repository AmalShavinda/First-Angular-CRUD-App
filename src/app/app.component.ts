import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { EmpListComponent } from './shared/components/emp-list/emp-list.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  
  title = 'crud-app';

  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private _empService: EmployeeService, private emp: EmpListComponent ) {
    this.empForm = this._fb.group({
      name: '',
      designation: '',
      salary: '',
    })
  }

  onSubmit(val1: any, val2: any, val3: any) {
    if(this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert("Employee added sucessfully!")
          this.emp.getEmployeeList()
          val1.value=""
          val2.value=""
          val3.value=""
        },
        error: (err: any) => {
          console.error(err)
        }
      })
      
    } 
  }

  onClick(val1: any, val2: any, val3: any) {

    val1.value=""
    val2.value=""
    val3.value=""
  }

  setData(data: any){
    
  }
  
}

