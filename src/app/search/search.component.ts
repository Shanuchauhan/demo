import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
// import { ExportService } from '../export.service';
import {GetAirlineCodesService} from '../get-airline-codes.service';
import { Location, LocationStrategy } from '@angular/common';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { NgSearchFilterService } from 'ng-search-filter';
import { HostListener } from '@angular/core';

import { ExportToCsv } from 'export-to-csv';

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  constructor(private http: HttpClientModule,private fb: FormBuilder, private modalService: NgbModal,private GetAirlineCodesService:GetAirlineCodesService,public location: Location, private locationStrategy: LocationStrategy,@Inject(DOCUMENT) private document: Document, private _ngSearchFilterService: NgSearchFilterService) {
    const origin = this.document.location.origin;
  }
  
  
  // private exportService: ExportService

  dtOptions:any={};

  editProfileForm: FormGroup;

  @ViewChild('userTable') userTable: ElementRef;

  posts;

  config:any;
moduleList:any=['Module 1','Module 2','Module 3','Module 4','Module 5'];

AirlinesCodesList:any;
ParameterNames:any[]=[];
ParameterCodes:any[]=[];
ParameterValues:any[]=[];
commonList:any[]=[];
userList:any[]=[];
parameterList:any[]=[];
sendResult:any[]=[];
oldParameterValue:any;
dropDownData:any;
options = { 
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true, 
  showTitle: true,
  title: 'Rev Airline Configuration Parameters',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};



 ngOnInit() {  

  this._ngSearchFilterService.setDefaultLang('en');

  this.GetAirlineCodesService.fetchAirlineCodes().subscribe((data: any)=>{
    this.AirlinesCodesList=Object.values(data);
  })

  this.GetAirlineCodesService.fetchAirlineParameterNames().subscribe((data: any)=>{
    this.ParameterNames=Object.values(data);
    this.userList=this.ParameterNames;
  })  

  this.GetAirlineCodesService.fetchAirlineParameterCodes().subscribe((data: any)=>{
    this.ParameterCodes=Object.values(data);
    this.userList=this.ParameterNames.map((id,index)=>{
      return{
        names:id,
        codes:this.ParameterCodes[index]
      }
    })
  })  

  this.GetAirlineCodesService.fetchAirlineParameterValues().subscribe((data: any)=>{
    this.ParameterValues=Object.values(data);
    this.parameterList=this.ParameterCodes.map((codes,index)=>{
      return{
        codes:codes,
        names:this.ParameterNames[index],
        values:this.ParameterValues[index]
      }
    })
  })


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


  this.editProfileForm.patchValue({
  AirlinesCode:user.codes,
  ParameterName:user.names,
  ParameterValue:user.values
  });

  this.oldParameterValue=user.values;

 }

 onSubmit() {
  this.modalService.dismissAll();
  this.sendResult=[this.editProfileForm.controls.AirlinesCode.value,this.editProfileForm.controls.ParameterName.value,this.editProfileForm.controls.ParameterValue.value,this.oldParameterValue]
  this.GetAirlineCodesService.sendAirlineParameters(this.sendResult).subscribe();
  window.location.reload();

 }


 form= new FormGroup({
  airline: new FormControl('',Validators.required),
  module: new FormControl('',Validators.required)
});

get f(){
  return this.form.controls;
}

submit(){
  this.dropDownData = this.form.controls.airline.value;
}

refreshList()
{
  this.dropDownData='';
}

@HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'r')
    {
      this.dropDownData='';
    }
  }



 exportElmToExcel(): void {
  // this.exportService.exportTableElmToExcel(this.userTable, 'user_data');
  const csvExporter = new ExportToCsv(this.options);

  csvExporter.generateCsv(this.parameterList);
}





}

