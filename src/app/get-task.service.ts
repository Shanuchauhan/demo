import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTaskService {

private SERVER_URL="http://NCERNDOBEDEV6632.etv.nce.amadeus.net:57509/1ASIREV/DIYGUI";

constructor(private httpClient : HttpClient) { }

public fetchData(aAirline,aApplication,aTaskType,aTaskSubType):Observable<any>{
  return this.httpClient.get(`${this.SERVER_URL}/task?Airline=${aAirline}&Application=${aApplication}&TaskType=${aTaskType}&TaskSubType=${aTaskSubType}`);
}
public fetchDataAll():Observable<any>{
  return this.httpClient.get(`${this.SERVER_URL}/task`);
}

public UpdateData(abody):Observable<any>{
  console.log(abody);
  return this.httpClient.post(`${this.SERVER_URL}/task`,abody);
}

public fetchAirline():Observable<any>{
  // return this.httpClient.get(`${this.SERVER_URL}/thm`);
  return this.httpClient.get(`${this.SERVER_URL}/codes`);
}

public fetchApplication(aAirline):Observable<any>{
  return this.httpClient.get(`${this.SERVER_URL}/application?Airline=${aAirline}`);
}

}
