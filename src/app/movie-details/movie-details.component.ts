import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const stored_api_key = localStorage.getItem('TMDB_KEY');
    this.route.params.subscribe(params => {
      const movie_id = params['id'];
      if (stored_api_key) {
        this.get_movie_details(movie_id, stored_api_key);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  private get_movie_details(id: string, KLUCZ_API: string): void {
    // Klucz API do themoviedb.org
    // https://www.themoviedb.org/
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KLUCZ_API}`)
      .then(response => {
        return response.json();
      })
      .then(movieData => {
        this.movie = movieData;
        // Przelicz skalę od 1-10 na od 1 do 5 gwiazdek
        this.movie.vote_average = (movieData.vote_average / 2).toFixed(1);
      })
      .catch(err => {
        console.log(err);
      });
  }

  go_home() {
    this.router.navigate(['/']);
  }
}
