import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAirlineCodesService {

  private SERVER_URL = "http://NCERNDOBEDEV6519.etv.nce.amadeus.net:57509/1ASIREV/DIYGUI"
  

  constructor(private httpClient : HttpClient) { }
  
  public fetchData():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/retrieveairlinecodes`);

  }

  public fetchAirlineData():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/airline`);
  }

  public fetchCurrencyData():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/currency`);
  }

  public X():Observable<any>{
    return this.httpClient.get(`${this.SERVER_URL}/retrieveAirlineCodes`);
  }
}
