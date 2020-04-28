import { Injectable } from '@angular/core';
import { PersonInfo } from '../model/person.info';
import * as data from '../data/sample_data.json';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  constructor() { }

  getPersonInfoItems(): PersonInfo[] {
    return (data as any).default;
  }
}
