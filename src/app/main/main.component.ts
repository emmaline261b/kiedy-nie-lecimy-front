import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from '../map/map.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {CatastropheService} from '../catastrophe/catastrophe.service';

export interface Catastrophe {
    name: string;
    probability: number
}

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [ CommonModule, FormsModule, MapComponent, MatDatepickerModule, MatFormFieldModule,
      MatSelectModule, MatInputModule, MatNativeDateModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
    selectedCountry: string | undefined;
    selectedDate: Date | undefined;
    minDate: Date = new Date();
    responseMessage: string | undefined;

    countries: string[] = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
        'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
        'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
        'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia',
        'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
        'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
        'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
        'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
        'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
        'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
        'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
        'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
        'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
        'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
        'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
        'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand',
        'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
        'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
        'Zambia', 'Zimbabwe'
    ];

    public catastrophes: Catastrophe[] = [];

    constructor(private catastropheService: CatastropheService) {}

    checkCatastrophe(): void {
        if (this.selectedDate && this.selectedCountry) {
            this.catastropheService.checkCatastrophe(this.selectedDate, this.selectedCountry).subscribe(
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
                    this.responseMessage = 'Błąd! Coś poszło nie tak! ';
                }
            );
        } else {
            this.responseMessage = 'Musisz wybrać datę i kraj.';
        }
    }

}
