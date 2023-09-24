import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-website',
  templateUrl: './main-website.component.html',
  styleUrls: ['./main-website.component.scss']
})
export class MainWebsiteComponent implements OnInit {
  movies_data: any[] = [];
  
  constructor () {}

  ngOnInit(): void {
      this.get_movies_data();
  }

  private get_movies_data(): void {
    // Klucz API do themoviedb.org
    // https://www.themoviedb.org/
    const KLUCZ_API = '';
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KLUCZ_API}`)
          .then(response => {
            return response.json();
          })
          .then(json_data => {
            this.movies_data = json_data.results;
          })
          .catch(err => {
            console.log(err);
          });
  }
}
