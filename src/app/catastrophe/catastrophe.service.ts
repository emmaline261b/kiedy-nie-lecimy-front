import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../map/map.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatastropheService {

    private endpoint = 'http://127.0.0.1:5000/predict';

    constructor(private http: HttpClient) {}

    checkCatastrophe(date: Date, country: string): Observable<any> {
        const dateString = this.formatDateToYYYYMMDD(date);
        return this.http.post<any>(this.endpoint, { date: dateString, country: country });
    }


    private formatDateToYYYYMMDD(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

