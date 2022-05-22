import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tvs:any[]=[];
  movies:any[]=[];
  persons:any[]=[];
  imgPre:string="https://image.tmdb.org/t/p/w500";
  pageExtension:string="&page="
  pageNumber:any=1;

  
  
  constructor(private _MoviesService:MoviesService,private spinner: NgxSpinnerService
    ,private _Router:Router) {
      this.spinner.show();
     }

  changeRoute(e:any,id:any){
    this._Router.navigate(["/moviedetails",id,e.target.alt]);
    
    

  }


getTrendingTv(mediaType:string="tv/week",socialType:string="trending",pageNum:string="&page=1"){
  
  this._MoviesService.getTrending(mediaType,socialType,pageNum).subscribe((res)=>{
    this.tvs=res.results.slice(0,10);
      
     
    
    
  })
}
getTrendingMovies(mediaType:string="movie/week",socialType:string="trending",pageNum:string="&page=1"){
  
  this._MoviesService.getTrending(mediaType,socialType,pageNum).subscribe((res)=>{
    this.movies=res.results.slice(0,10);
      
     
    
    
  })
}
getTrendingPeolpe(mediaType:string="person",socialType:string="popular",pageNum:string="&page=1"){
 
  this._MoviesService.getTrending(socialType,mediaType,pageNum).subscribe((res)=>{
    this.persons=res.results.slice(0,10);
      
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);
    
    
  })
}
  ngOnInit(): void {
    
     this.getTrendingTv();
     this.getTrendingMovies();
     this.getTrendingPeolpe();
     
    
  
  }

}
