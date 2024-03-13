import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable } from 'rxjs';
import { PokemonDetail } from '../../models/pokemon.detail';
import { PokemonList } from '../../models/pokemon.list';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass'],
})
export class PokemonListComponent implements OnInit {
  search: FormControl = new FormControl('');
  pokemons: PokemonDetail[] = [];
  classicMode: boolean = true;
  private offset: number;
  isLoading: boolean = false;
  isLastPage = false;
  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;

  searchTerm: string = '';

  constructor(
    private pokemonService: PokemonService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar
  ) {
    this.offset = 0;
  }

  ngOnInit(): void {
    this.getPage(this.offset);
  }

  getPage(offset: number) {
    if (!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService
        .getPokemonList(offset)
        .subscribe((list: PokemonList[]) => {
          if (list.length === 0) {
            this.isLastPage = true;
          }

          if (!this.isLastPage) {
            this.getPokemon(list);
          }
        });
    }
  }

  filterPokemonList() {
    if (this.searchTerm.trim() !== '') {
      this.isSearching = true;
      this.pokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.isSearching = false;
    } else {
      // Si el término de búsqueda está vacío, recargamos la lista de Pokémon
      this.resetPokemonList();
    }
  }
  
  resetPokemonList() {
    this.offset = 0;
    this.pokemons = [];
    this.isLastPage = false;
    this.getPage(this.offset);
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(this.pokemonService.getPokemonDetail(value.name));
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      this.pokemons.push(...pokemons);
      this.offset += 20;
      this.isLoading = false;
    });
  }

  getPrincipalType(list: any[]) {
    return list.filter((x) => x.slot === 1)[0]?.type.name;
  }

  onDetail(pokemon: PokemonDetail): void {
    this.bottomSheet.open(PokemonDetailComponent, {
      data: { pokemon, classicMode: this.classicMode },
    });
  }
}
