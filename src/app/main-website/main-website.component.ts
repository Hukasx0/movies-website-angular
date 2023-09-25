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
    const stored_api_key = localStorage.getItem('TMDB_KEY');

    if (stored_api_key) {
      this.get_movies_data(stored_api_key);
    } else {
      this.prompt_api_key();
    }
  }

  private get_movies_data(KLUCZ_API: string): void {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KLUCZ_API}`)
          .then(response => {
            return response.json();
          })
          .then(json_data => {
            this.movies_data = json_data.results.map((movie: any) => {
              movie.vote_average = (movie.vote_average / 2).toFixed(1);
              return movie;
            });
          })
          .catch(err => {
            console.log(err);
          });
  }

  private prompt_api_key(): void {
    const prompted_api_key = prompt('Podaj klucz API TMDB, aby strona mogła działać:');
  
    if (prompted_api_key) {
      localStorage.setItem('TMDB_KEY', prompted_api_key);
      this.get_movies_data(prompted_api_key);
    } else {
      alert('Strona nie zadziała bez klucza API');
    }
  }
}
