import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movie_id = params['id'];
      this.get_movie_details(movie_id);
    });
  }

  get_movie_details(id: string): void {
    // Klucz API do themoviedb.org
    // https://www.themoviedb.org/
    const KLUCZ_API = '';
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
}
