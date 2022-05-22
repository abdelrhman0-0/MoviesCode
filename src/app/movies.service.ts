import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  constructor(private _HttpClient:HttpClient) { }

  getTrending(cd:string = "now_playing", type:string = "movie", q:string = ""):Observable<any>{
    
    return this._HttpClient.get(`https://api.themoviedb.org/3/${type}/${cd}?api_key=c1036a1af34f090f11514a258b4724cf${q}`)
  }

}
