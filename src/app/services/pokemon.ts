
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  // Busca os 20 primeiros Pokémon
  getPokemons(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}?limit=20`
    );
  }

  // Busca os detalhes de um Pokémon pelo ID ou nome
  getPokemonDetails(id: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(
      `${this.apiUrl}/${id}`
    );
  }
}
