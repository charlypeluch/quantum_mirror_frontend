import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuantumDashboardService {

  FEED_API_KEY: string = 'c54127a4d5e7450583489c338449e975';

  constructor(private httpClient: HttpClient) { }

  getNews(queryParams:any={}): Promise<any> {
    let _key = {apiKey: this.FEED_API_KEY};
    let _params = {params: Object.assign(queryParams, _key)}

    return this.httpClient.get('https://newsapi.org/v2/top-headlines', _params).toPromise();
  }
}
