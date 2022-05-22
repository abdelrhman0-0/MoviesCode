import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies:any=[];
  imgPre:string="https://image.tmdb.org/t/p/w500";
  pageExtension:string="&page="
  pageNumber:any=1;
  inputValue:string="";
  isSearching:boolean=false;

  constructor(private _MoviesService:MoviesService,private spinner: NgxSpinnerService,
    private _Router:Router) {
      this.spinner.show();
     }
    
  changeRoute(e:any,id:any){
    this._Router.navigate(["/moviedetails",id,e.target.alt]);
    
    

  }
  next(){
    this.spinner.show();
    this.pageNumber++;
    this.getPageTrendingTv("tv/week","trending",this.pageExtension+this.pageNumber);
  }


  previous(){
    this.spinner.show();
    this.pageNumber--;
    this.getPageTrendingTv("tv/week","trending",this.pageExtension+this.pageNumber);
  }

  search(){
    if(this.inputValue==""){
      this.getTrendingTv("movie/week","trending","&page=1");
      this.isSearching=false;
      
    }else{
      this.getTrendingTv("movie","search",`&page=1&query=${this.inputValue}`);
      this.isSearching=true;

    }
  }
  getPageTrendingTv(mediaType:string="movie/week",socialType:string="trending",pageNum:any="&page=1",e:any=""){
    
    document.documentElement.scrollTop=700;
    this.getTrendingTv(mediaType,socialType,pageNum);
    this.pageNumber=e.target.innerHTML;
    
    
  }
getTrendingTv(mediaType:string="movie/week",socialType:string="trending",pageNum:string="&page=1"){
  
  this._MoviesService.getTrending(mediaType,socialType,pageNum).subscribe((res)=>{
    this.movies=res.results;
      
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);
    
    
  })
}
  ngOnInit(): void {
    
    this.getTrendingTv("movie/week","trending","&page=1");
  }

}
