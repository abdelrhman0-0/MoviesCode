import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";





@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss']
})
export class MoviedetailsComponent implements OnInit {
id:any;
alt:string="";
imgPre:string="https://image.tmdb.org/t/p/w500"
trailerDetails:any={};
base:string=""
extension:string="?autoplay=1&controls=0"
movieDetails:any={};
urlSafe: SafeResourceUrl="";
isPerson:boolean=false;
  constructor(private _ActivatedRoute:ActivatedRoute,
     private _MoviesService:MoviesService,
     private spinner: NgxSpinnerService,
    public sanitizer: DomSanitizer) {this.spinner.show(); }
    getTvOrMovie(type:string,video:string=""){
      this._MoviesService.getTrending(this.id,type,"").subscribe((res)=>{
        this.movieDetails=res;
        
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 500);
      })
       this._MoviesService.getTrending(`${this.id}${video}`,type).subscribe((res)=>{
        this.trailerDetails=res.results[0];
        this.base=`https://www.youtube.com/embed/${this.trailerDetails.key}?autoplay=1&controls=0`
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.base);
  
  
      })
    }
   
  ngOnInit(): void {
    
    this.id = this._ActivatedRoute.snapshot.params.id
    this.alt = this._ActivatedRoute.snapshot.params.alt
    if(this.alt === "tv-poster"){
      this.getTvOrMovie("tv","/videos");

    }else if(this.alt === "person-poster"){
      this.isPerson=true;
      this.getTvOrMovie("person");

    }else{
      this.getTvOrMovie("movie","/videos");
    }

    

  }

}
