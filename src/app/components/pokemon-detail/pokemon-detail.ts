
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PokemonService } from '../../services/pokemon';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail implements OnInit {

  pokemon: Pokemon | null = null;
  carregando = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe({
        next: (resposta) => {
          this.pokemon = resposta;
          this.carregando = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.erro = 'Não foi possível carregar os detalhes do Pokémon.';
          this.carregando = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.erro = 'Pokémon não encontrado.';
      this.carregando = false;
      this.cdr.markForCheck();
    }
  }
}
