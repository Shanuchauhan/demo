import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAirlineCodesService {

  private SERVER_URL = "http://NCERNDOBEDEV6632.etv.nce.amadeus.net:57509/1ASIREV/DIYGUI"
  

  constructor(private httpClient : HttpClient) { }
  
  public fetchAirlineCodes():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/codes`);
  }

  public fetchAirlineParameterNames():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/params`);
  }

  public fetchAirlineParameterCodes():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/parameterairline`);
  }

  public fetchAirlineParameterValues():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/values`);
  }
    
  public sendAirlineParameters(data):Observable<any>{
    return this.httpClient.post(`${this.SERVER_URL}/update`,data);
  }

}
