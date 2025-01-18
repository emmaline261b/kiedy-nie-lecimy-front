import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CatastropheService } from '../catastrophe/catastrophe.service';
import { Country, COUNTRIES } from '../shared/country-data';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

export interface Catastrophe {
    name: string;
    probability: number;
}

@Component({
    standalone: true,
    selector: 'app-main',
    imports: [
        CommonModule,
        FormsModule,
        MapComponent,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatNativeDateModule,
        MatAutocompleteModule
    ],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    countries: Country[] = [];
    filteredCountries: Country[] = [];
    searchText: string = '';
    selectedCountry: Country | undefined;

    minDate: Date = new Date(1999, 12);
    selectedDate: Date | undefined;

    responseMessage: string | undefined; // Wiadomość odpowiedzi
    public catastrophes: Catastrophe[] = []; // Lista katastrof



    constructor(private catastropheService: CatastropheService) {}

    ngOnInit(): void {
        this.countries = COUNTRIES;
        this.filteredCountries = [...this.countries];
    }

    filterCountries(): void {
        const search = this.searchText.toLowerCase();
        this.filteredCountries = this.countries.filter(
            (country) =>
                country.name_pl.toLowerCase().includes(search) ||
                country.name.toLowerCase().includes(search)
        );
    }

    onCountrySelect(country: Country): void {
        this.selectedCountry = country;
        this.catastrophes = [{ name: country.name_pl, probability: 1 }];
    }

    displayCountry(country: Country | null): string {
        return country ? country.name_pl : '';
    }

    checkCatastrophe(): void {
        if (this.selectedDate && this.selectedCountry) {
            this.catastropheService.checkCatastrophe(this.selectedDate, this.selectedCountry.name).subscribe(
                (response) => {
                    if (response && response.response) {
                        this.catastrophes = response.response.map((item: any) => ({
                            name: item.disaster,
                            probability: parseFloat(item.probability),
                        }));
                    } else {
                        this.responseMessage = 'Brak wyników.';
                    }
                },
                (error) => {
                    this.responseMessage = 'Błąd! Coś poszło nie tak!';
                }
            );
        } else {
            this.responseMessage = 'Musisz wybrać datę i kraj.';
        }
    }

}
