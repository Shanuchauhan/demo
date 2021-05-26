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

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  constructor(private http: HttpClientModule,private fb: FormBuilder, private modalService: NgbModal,private GetAirlineCodesService:GetAirlineCodesService,public location: Location, private locationStrategy: LocationStrategy,@Inject(DOCUMENT) private document: Document, private _ngSearchFilterService: NgSearchFilterService) {
    const origin = this.document.location.origin;
  }
  
  
  // private exportService: ExportService

  dtOptions:any={};

  editProfileForm1: FormGroup;
  editProfileForm2: FormGroup;

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
oldParameterValue1:any;
oldParameterValue2:any;
dropDownData:any[]=[];
counter:any;
innerCounter:any;
parameterCompareList:any[]=['names','value1','value2'];
parameterCompareNames:any[]=[];
parameterCompareValues1:any[]=[];
parameterCompareValues2:any[]=[];
column1:any;
column2:any;
test:any[]=[];
textFieldFilterData:any;
name:any;
filterField:any;
showme1:any;
showme2:any;

options = { 
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true, 
  showTitle: true,
  title: 'Revenue Airline Configuration Parameters',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};



 ngOnInit() {  

  this.showme1=false;
  this.showme2=false;


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



  this.editProfileForm1 = this.fb.group({
  AirlinesCode:[''],
  Module:[''],
  ParameterName:[''],
  Description:[''],
  ParameterValue:['']
  });

  this.editProfileForm2 = this.fb.group({
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

 openModal1(targetModal, user1) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 
  this.editProfileForm1.controls['AirlinesCode'].disable();
  this.editProfileForm1.controls['Module'].disable();
  this.editProfileForm1.controls['ParameterName'].disable();

 
  this.editProfileForm1.patchValue({
  AirlinesCode:this.dropDownData[0],
  ParameterName:user1.names,
  ParameterValue:user1.value1
  });

  

  this.oldParameterValue1=user1.value1;

 }

 openModal2(targetModal, user2) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
});

this.editProfileForm2.controls['AirlinesCode'].disable();
this.editProfileForm2.controls['Module'].disable();
this.editProfileForm2.controls['ParameterName'].disable();

this.editProfileForm2.patchValue({
  AirlinesCode:this.dropDownData[1],
  ParameterName:user2.names,
  ParameterValue:user2.value2
  });

  this.oldParameterValue2=user2.value2;


}


 onSubmitEditButton1() {
  this.modalService.dismissAll();
  this.sendResult=[this.editProfileForm1.controls.AirlinesCode.value,this.editProfileForm1.controls.ParameterName.value,this.editProfileForm1.controls.ParameterValue.value,this.oldParameterValue1]
  this.GetAirlineCodesService.sendAirlineParameters(this.sendResult).subscribe();
  window.location.reload();
 }

 onSubmitEditButton2() {
  this.modalService.dismissAll();
  this.sendResult=[this.editProfileForm2.controls.AirlinesCode.value,this.editProfileForm2.controls.ParameterName.value,this.editProfileForm2.controls.ParameterValue.value,this.oldParameterValue2]
  this.GetAirlineCodesService.sendAirlineParameters(this.sendResult).subscribe();
  window.location.reload();
 }

 dropDownForm= new FormGroup({
  airline1: new FormControl('',Validators.required),
  airline2: new FormControl('',Validators.required),
  module: new FormControl('',Validators.required)
});

get f(){
  return this.dropDownForm.controls;
}

filterByParameterName(placeId){
  this.textFieldFilterData=placeId;
  console.log("hello");
}


submit(){
  this.parameterCompareList.length=0;
  this.parameterCompareNames.length=0;
  this.parameterCompareValues1.length=0;
  this.parameterCompareValues2.length=0;


  this.dropDownData = [this.dropDownForm.controls.airline1.value, this.dropDownForm.controls.airline2.value];
  this.column1=this.dropDownData[0] +' :';
  this.column2=this.dropDownData[1] +' :';

  for(this.counter=0;this.counter<110;this.counter++)
  {
    this.test.push(0);
  }

  for(this.counter=0;this.counter<this.ParameterCodes.length;this.counter++)
  {
    if(this.dropDownData[0]==this.ParameterCodes[this.counter])
    {
      for(this.innerCounter=this.counter+1;this.innerCounter<this.ParameterCodes.length;this.innerCounter++)
      {
        if(this.dropDownData[1]==this.ParameterCodes[this.innerCounter])
        {
          if(this.ParameterNames[this.counter] == this.ParameterNames[this.innerCounter])
          {
            this.parameterCompareNames.push(this.ParameterNames[this.counter]);
            this.parameterCompareValues1.push(this.ParameterValues[this.counter]);
            this.parameterCompareValues2.push(this.ParameterValues[this.innerCounter]);
            this.test[this.innerCounter]=1;
          }
        }
      } 
    }    
  }

  for(this.counter=0;this.counter<this.ParameterNames.length;this.counter++)
  {
    if((this.dropDownData[0] == this.ParameterCodes[this.counter]))
    {
      if(this.test[this.counter] !=1)
      {
        this.parameterCompareNames.push(this.ParameterNames[this.counter]);
        this.parameterCompareValues1.push(this.ParameterValues[this.counter]);
        this.parameterCompareValues2.push(" ");
      }
    }

    if(this.dropDownData[1] == this.ParameterCodes[this.counter])
    {
      if(this.test[this.counter] !=1)
      {
        this.parameterCompareNames.push(this.ParameterNames[this.counter]);
        this.parameterCompareValues2.push(this.ParameterValues[this.counter]);
        this.parameterCompareValues1.push(" ");
      }
    }
  }
  

  


  this.parameterCompareList=this.parameterCompareNames.map((names,index)=>{
    return{
      names:names,
      value1:this.parameterCompareValues1[index],
      value2:this.parameterCompareValues2[index]
    }
  })

  this.showme1=true;
  this.showme2=true;


  console.log(this.parameterCompareList);

}

refreshList()
{
  // this.dropDownData='';
}

getBackgroundColor(user){
  if(user.value1 != user.value2)
  {
    if(user.value1 !=" " &&user.value2 !=" ")
    {
      return "red";      
    }
  }
}

@HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'r')
    {
      this.textFieldFilterData='';
      this.filterField='';
      this.name=null;
    }
  }



 exportElmToExcel(): void {
  const csvExporter = new ExportToCsv(this.options);
  csvExporter.generateCsv(this.parameterCompareList);
}


}


