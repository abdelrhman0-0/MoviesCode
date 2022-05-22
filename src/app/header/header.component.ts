import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from '../movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  headerTrendingMovies:any=[];
  imgPre:string="https://image.tmdb.org/t/p/w500"
  constructor(private _MoviesService:MoviesService,private _Router:Router) { }
  isDragging:boolean=true;
  data:object={};

  
  
  customOptions: OwlOptions = {

    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      568: {
        items: 4
      },
      768: {
        items: 4
      },
      992: {
        items: 8
      }
    },
    nav: true
  }

  // changeRoute(e:any,id:any){
  //   this._Router.navigate(["/moviedetails",id,e.target.alt]);
    
  // }
// 	off(el:any) {
//     var rect = el.getBoundingClientRect(),
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }
  ngOnInit(): void {
    
    this._MoviesService.getTrending("movie/week","trending","").subscribe((res)=>{
      this.headerTrendingMovies=res.results

      
    });
    
  }

}
