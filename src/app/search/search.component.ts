import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
// import { ExportService } from '../export.service';
import {GetAirlineCodesService} from '../get-airline-codes.service';
import { Location, LocationStrategy } from '@angular/common';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  constructor(private http: HttpClient,private fb: FormBuilder, private modalService: NgbModal,private GetAirlineCodesService:GetAirlineCodesService,public location: Location, private locationStrategy: LocationStrategy,@Inject(DOCUMENT) private document: Document) {
    const origin = this.document.location.origin;
  }
  
  
  // private exportService: ExportService

  dtOptions: DataTables.Settings={};

  editProfileForm: FormGroup;

  @ViewChild('userTable') userTable: ElementRef;

  posts;

  config:any;

  airlineList: any=['6X','8X','BA','JL','MH','NT','CX'];
  moduleList: any=['Module 1','Module 2','Module 3','Module 4','Module 5'];

  form= new FormGroup({
    airline: new FormControl('',Validators.required),
    module: new FormControl('',Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
  }


 userList = [
 {
  AirlinesCode:"6X",
  Module:"",
  ParameterName:"1A_HOSTED_AIRLINE",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"8X",
  Module:"",
  ParameterName:"1A_HOSTED_AIRLINE",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"BA",
  Module:"",
  ParameterName:"ACC_ALLOW_STR_LEDGER_ACCOUNT",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"JL",
  Module:"",
  ParameterName:"ACC_ALLOW_STR_LEDGER_ACCOUNT",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"MH",
  Module:"",
  ParameterName:"ACC_BY_PASS_REASON_CODE_ACCEPT",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"NT",
  Module:"",
  ParameterName:"ACC_ACTIVATE_PTR20715531",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"CX",
  Module:"",
  ParameterName:"ACC_ALLOW_STR_LEDGER_ACCOUNT",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"JL",
  Module:"",
  ParameterName:"ACC_ALLOW_STR_LEDGER_ACCOUNT",
  Description:"",
  ParameterValue:"Y"
 },
 {
  AirlinesCode:"MH",
  Module:"",
  ParameterName:"ACC_ALLOW_STR_LEDGER_ACCOUNT",
  Description:"",
  ParameterValue:"Y"
 }
];

AirlinesCodesList=[];
answer:any;
heli:any;
 ngOnInit() {

  
  this.GetAirlineCodesService.fetchData().subscribe((data: any[])=>{
    console.log("hello")
    console.log(data);
    this.AirlinesCodesList=data;
  })

  this.GetAirlineCodesService.fetchAirlineData().subscribe((data: any[])=>{
    console.log(data);
    this.heli=data;
  })

  this.GetAirlineCodesService.fetchCurrencyData().subscribe((data: any[])=>{
    console.log(data);
    this.answer=data;
  })

  this.GetAirlineCodesService.X().subscribe((data: any[])=>{
    console.log(data);
    this.answer=data;
  })

  this.dtOptions={
    pagingType:'full_numbers',
    pageLength:5,
    processing:true
  }

  // this.http.get('http://jsonplaceholder.typicode.com/posts')
  //     .subscribe(posts => {
  //       this.posts = posts;
  //   });

    this.config={
      itemsPerPage:5,
      currentPage:1
    };



  this.editProfileForm = this.fb.group({
  AirlinesCode:[''],
  Module:[''],
  ParameterName:[''],
  Description:[''],
  ParameterValue:['']
  });
 }

 pageChanged(event){
   this.config.currentPage=event;
 }


 openModal(targetModal, user) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 
  this.editProfileForm.controls['AirlinesCode'].disable();
  this.editProfileForm.controls['Module'].disable();
  this.editProfileForm.controls['ParameterName'].disable();
  // this.editProfileForm.controls['Description'].disable();

  this.editProfileForm.patchValue({
  AirlinesCode:user.AirlinesCode,
  ParameterName:user.ParameterName,
  ParameterValue:user.ParameterValue
  });
 }
 onSubmit() {
  this.modalService.dismissAll();
  console.log("res:", this.editProfileForm.getRawValue());
  console.log("dsa");
  console.log(origin);
  console.log(this.location.path.name);
  console.log('ds');
  console.log(this.location.path());
  console.log(this.location.prepareExternalUrl('/'));
  console.log(this.locationStrategy.getBaseHref());
  console.log(this.AirlinesCodesList);
  console.log(this.answer);
  console.log(this.heli);
 }

//  exportElmToExcel(): void {
//   this.exportService.exportTableElmToExcel(this.userTable, 'user_data');
// }

foo(): void {
  console.log(this.location.path());
  console.log(this.location.prepareExternalUrl('/'));
  console.log(this.locationStrategy.getBaseHref());
}

hello(){
  console.log("dsa");
  console.log(origin);
  console.log(this.location.path.name);
  console.log('ds');
}



}

