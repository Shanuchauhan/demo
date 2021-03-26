import { Component, OnInit, ViewChild,ElementRef,HostListener, OnDestroy,ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
// import {LocalizationService} from '@otter/common';
// import {EditService, ModelsService, ProfileService, ProfileSharedService, QueriesService, RequestService} from '@rev/services';
import {Observable,Subscription} from 'rxjs';
// import {ExportService} from './export.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('userTable') userTable: ElementRef;
}
