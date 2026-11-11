
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList implements OnInit {

  pokemons: any[] = [];
  carregando = true;
  erro = '';

  constructor(
  private pokemonService: PokemonService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (resposta) => {
        this.pokemons = resposta.results.map((pokemon, index) => {
          const id = Number(pokemon.url.split('/').filter(Boolean).pop());

          return {
            id: id,
            nome: pokemon.name,
            imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });

        this.carregando = false;
        this.cdr.markForCheck();
      },
      error: () => {
  this.erro = 'Não foi possível carregar os Pokémon.';
  this.carregando = false;
  this.cdr.markForCheck();
}
    });
  }
}
