import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Inject } from '@angular/core';
import { GetTaskService } from '../get-task.service';



@Component({
  selector: 'app-thm',
  templateUrl: './thm.component.html',
  styleUrls: ['./thm.component.scss']
})
export class ThmComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder,private GetTaskService: GetTaskService){ }

  //initializing p to one
  p: number = 1;

  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };
  
  public labels: any = {
    previousLabel: '',
    nextLabel: ''
  };

  onPageChange(event){
    console.log(event);
    this.config.currentPage = event;
  }

  

  editProfileForm: FormGroup;
  easyQueryBuilder: FormGroup;
  user: any;
  taskData: any;
  airlineData:any;
  applicationData:any;
  flags1 = [];
  flags2 = [];
  flags3 = [];
  dis_app = [];
  dis_type = [];
  dis_subtype = []; 
  resultArray = [];
  temp: string;
  l:number; 
  i:number;

  ShowData(){
    let aCmbAirlineValue = (<HTMLSelectElement>document.getElementById('cmbAirlineFilter')).value;
    let aCmbApplicationValue = (<HTMLSelectElement>document.getElementById('cmbApplicationFilter')).value;
    let aCmbTaskTypeValue = (<HTMLSelectElement>document.getElementById('cmbTaskTypeFilter')).value;
    let aCmbSubTaskTypeValue = (<HTMLSelectElement>document.getElementById('cmbTaskSubTypeFilter')).value;
    console.log(aCmbAirlineValue);
    console.log(aCmbApplicationValue);
    console.log(aCmbTaskTypeValue);
    console.log(aCmbSubTaskTypeValue);
      this.GetTaskService.fetchData(aCmbAirlineValue,aCmbApplicationValue,aCmbTaskTypeValue,aCmbSubTaskTypeValue).subscribe((data: [])=>{
      this.taskData = data['TaskTypeList'];
      
      console.log(this.taskData);
    })
  }

  On_reset(){
    this.taskData=[];
    this.GetTaskService.fetchDataAll().subscribe((data: any[])=>{
      this.taskData = data['TaskTypeList'];
    });

    (<HTMLSelectElement>document.getElementById('cmbAirlineFilter')).selectedIndex=0;
    (<HTMLSelectElement>document.getElementById('cmbApplicationFilter')).selectedIndex=0;
    (<HTMLSelectElement>document.getElementById('cmbTaskTypeFilter')).selectedIndex=0;
    (<HTMLSelectElement>document.getElementById('cmbTaskSubTypeFilter')).selectedIndex=0;
    // s.value = 'No Application Filter';
  }

  ngOnInit(): void {
    
    this.GetTaskService.fetchDataAll().subscribe((data: any[])=>{
      // console.log(data);
      this.taskData = data['TaskTypeList'];
      console.log(this.taskData);
    })

    this.GetTaskService.fetchAirline().subscribe((data: any[])=>{
      this.airlineData = Object.values(data);
      console.log(this.airlineData);
    })
    

  this.editProfileForm = this.fb.group({
    Airline:[''],
    Application:[''],
    TaskType:[''],
    TaskSubType:[''],
    // EnabledByClient:[''],
    ActiveFlag:[''],
    // EnabledBy1A:[''],
    SupportedFlag:[''],
    Severity:[''],
    AssignedTeam:[''],
    AssignedTeamType:[''],
    AssignedUsername:[''],
    AssignedUserOffice:[''],
    AssignedUserOrg:[''],
    ProviderServiceName:[''],
    BusinessDataIndexKeyNames:[''],
    BusinessDataNonIndexKeyNames:[''],
    // TemplateEnabled:[''],
    Description:[''],
    NumberValidityOfDay:[''],
    NumberDueOfDay:[''],
    ProviderApplication:[''],
    SecurityID:[''],
    EMAILRecipients:[''],
    EMAILFrom:[''],
    DynamicChoice:[''],
    Validation1Trigger:[''],
    Validation2Trigger:[''],
    IUFlag:[''],
    });

    this.easyQueryBuilder = this.fb.group({});

  }

  show_apps(){
    let aCmbAirlineValue = (<HTMLSelectElement>document.getElementById('cmbAirlineFilter')).value;
    this.GetTaskService.fetchApplication(aCmbAirlineValue).subscribe((data: [])=>{
      this.applicationData=data;
    })
   }

  edit_flag:boolean = false;
  radio_flag:boolean = false; 
  add_flag:boolean = false;
  arg1:any;
  arg2:any;
  Temp_E:string;
  edit_func()
  {
    this.edit_flag=true;
    if (this.radio_flag === true ) {
      this.openModal(this.arg1,this.arg2);
      this.radio_flag=false;
    }
  }

  clone_func(){
    
    this.edit_flag=true;
    if (this.radio_flag === true ) {
    this.openModal(this.arg1,this.arg2);
    this.radio_flag=false;
    $('#editProfileLabel').html("Clone Task Template");
    this.editProfileForm.controls['Airline'].enable();
    this.editProfileForm.controls['Application'].enable();
    this.editProfileForm.controls['TaskType'].enable();
    this.editProfileForm.controls['TaskSubType'].enable();
    this.editProfileForm.controls['Severity'].enable();
    this.editProfileForm.controls['AssignedTeam'].enable();
    this.editProfileForm.controls['AssignedTeamType'].enable();
    this.editProfileForm.controls['AssignedUsername'].enable();
    this.editProfileForm.controls['AssignedUserOffice'].enable();
    this.editProfileForm.controls['AssignedUserOrg'].enable();
    this.editProfileForm.controls['ProviderServiceName'].enable();
    this.editProfileForm.controls['BusinessDataIndexKeyNames'].enable();
    this.editProfileForm.controls['BusinessDataNonIndexKeyNames'].enable();
    this.editProfileForm.patchValue({
      IUFlag:"I",
    });

    }
  }

  new_template_func(editProfileModal){
    
    this.arg1=editProfileModal;
    this.openModal_2(this.arg1);
    $('#editProfileLabel').html("New Task Template");
    this.editProfileForm.controls['Airline'].enable();
    this.editProfileForm.controls['Application'].enable();
    this.editProfileForm.controls['TaskType'].enable();
    this.editProfileForm.controls['TaskSubType'].enable();
    this.editProfileForm.controls['Severity'].enable();
    this.editProfileForm.controls['AssignedTeam'].enable();
    this.editProfileForm.controls['AssignedTeamType'].enable();
    this.editProfileForm.controls['AssignedUsername'].enable();
    this.editProfileForm.controls['AssignedUserOffice'].enable();
    this.editProfileForm.controls['AssignedUserOrg'].enable();
    this.editProfileForm.controls['ProviderServiceName'].enable();
    this.editProfileForm.controls['BusinessDataIndexKeyNames'].enable();
    this.editProfileForm.controls['BusinessDataNonIndexKeyNames'].enable();
    this.editProfileForm.patchValue({
    Application:"",
    TaskType:"",
    TaskSubType:"",
    ActiveFlag:"Y",
    SupportedFlag:"Y",
    Severity:"",
    AssignedTeam:"",
    AssignedTeamType:"",
    AssignedUsername:"",
    AssignedUserOffice:"",
    AssignedUserOrg:"",
    ProviderServiceName:"",
    Description:"",
    NumberValidityOfDay:"",
    NumberDueOfDay:"",
    ProviderApplication:"",
    SecurityID:"",
    EMAILFrom:"",
    DynamicChoice:"",
    Validation1Trigger:"",
    Validation2Trigger:"",
    IUFlag:"I",
    });
  }
  
  check_it(editProfileModal,task) {
    const ele= document.getElementById('cbx') as HTMLInputElement;
    this.radio_flag=true;
    this.arg1=editProfileModal;
    this.arg2=task;
    this.Temp_E = (task.ActiveFlag==='Y' && task.SupportedFlag==='Y')? 'Y' : 'N';
   };

  EQF1:any;
  EQF2:any;
  query_func(){
    console.log('Query Builder Closed');
    this.EQF1 = (<HTMLSelectElement>document.getElementById('EQF1')).value;
    this.EQF2 = (<HTMLSelectElement>document.getElementById('EQF2')).value;
    console.log(this.EQF1);
    console.log(this.EQF2);
  }
  
  openModal(targetModal, task) {
    this.modalService.open(targetModal, {
     centered: true,
     size:'xl',
     backdrop: 'static',
    });
    
    this.editProfileForm.controls['Airline'].disable();
    this.editProfileForm.controls['Application'].disable();
    this.editProfileForm.controls['TaskType'].disable();
    this.editProfileForm.controls['TaskSubType'].disable();
    this.editProfileForm.controls['Severity'].disable();
    this.editProfileForm.controls['AssignedTeam'].disable();
    this.editProfileForm.controls['AssignedTeamType'].disable();
    this.editProfileForm.controls['AssignedUsername'].disable();
    this.editProfileForm.controls['AssignedUserOffice'].disable();
    this.editProfileForm.controls['AssignedUserOrg'].disable();
    this.editProfileForm.controls['ProviderServiceName'].disable();
    this.editProfileForm.controls['BusinessDataIndexKeyNames'].disable();
    this.editProfileForm.controls['BusinessDataNonIndexKeyNames'].disable();
    // this.editProfileForm.controls['TemplateEnabled'].disable();
  
    this.editProfileForm.patchValue({
    Airline:task.Airline,
    Application:task.Application,
    TaskType:task.TaskType,
    TaskSubType:task.TaskSubType,
    ActiveFlag:task.ActiveFlag,
    SupportedFlag:task.SupportedFlag,
    Severity:task.Severity,
    AssignedTeam:task.AssignedTeam,
    AssignedTeamType:task.AssignedTeamType,
    AssignedUsername:task.AssignedUsername,
    AssignedUserOffice:task.AssignedUserOffice,
    AssignedUserOrg:task.AssignedUserOrg,
    ProviderServiceName:task.ProviderServiceName,
    // BusinessDataIndexKeyNames:task.BusinessDataIndexKeyNames,
    // BusinessDataNonIndexKeyNames:task.BusinessDataNonIndexKeyNames,
    // TemplateEnabled: (task.ActiveFlag==='Y' && task.SupportedFlag==='Y')? 'Y' : 'N',
    Description:task.Description,
    NumberValidityOfDay:task.NumberValidityOfDay,
    NumberDueOfDay:task.NumberDueOfDay,
    ProviderApplication:task.ProviderApplication,
    SecurityID:task.SecurityID,
    // EMAILRecipients:task.EMAILRecipients,
    EMAILFrom:task.EMAILFrom,
    DynamicChoice:task.DynamicChoice,
    Validation1Trigger:task.ValidationL1trigger,
    Validation2Trigger:task.ValidationL2trigger,
    IUFlag:"U",
    });
   }

   openModal_1(targetModal, task) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: true,
     scrollable: true,
     size:'lg',
    });
  };

  openModal_2(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     size:'xl',
     backdrop: 'static',
    });
   }

  

   onSubmit(){
    console.log(origin);
    console.log(this.editProfileForm.getRawValue());
    // console.log(this.editProfileForm.value());
    this.GetTaskService.UpdateData(this.editProfileForm.getRawValue()).subscribe((data: any[])=>{
      // console.log(data);
      console.log(data);
      //Put a message in UI to notify the user, like alert or something
    });
    console.log('Hello');
    // var o = {};
    // var a = $('#editProfileForm1').serializeArray();
    // console.log(a);
    // $.each(a, function() {
    //     if (o[this.name] !== undefined) {
    //         if (!o[this.name].push) {
    //             o[this.name] = [o[this.name]];
    //         }
    //         o[this.name].push(this.value || '');
    //     } else {
    //         o[this.name] = this.value || '';
    //     }
    // });
    // console.log(JSON.stringify(o));
   }



}
