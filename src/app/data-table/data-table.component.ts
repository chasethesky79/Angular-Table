import { Component, OnInit } from '@angular/core';
import { DataTableService } from '../service/data-table.service';
import { PersonInfo } from '../model/person.info';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  personItems: PersonInfo[];
  current_page = 1;
  records_per_page_options = [5, 7, 10, 15, 20];
  records_per_page = 5;

  constructor(private dataTableService: DataTableService) { }

  ngOnInit() {
    this.personItems = this.dataTableService.getPersonInfoItems();
    this.changePage(1);
  }

  onSelect(value: number) {
    this.records_per_page = value;
    this.current_page = 1;
    this.changePage(1);
  }

  prevPage() {
    if (this.current_page > 1) {
        this.current_page--;
        this.changePage(this.current_page);
    }
 }

 nextPage() {
    if (this.current_page < this.numPages()) {
        this.current_page++;
        this.changePage(this.current_page);
    }
}

changePage(page: number) {
    const btn_next = document.getElementById("btn_next");
    const btn_prev = document.getElementById("btn_prev");

    // Validate page
    if (page < 1) page = 1;
    if (page > this.numPages()) page = this.numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == this.numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
    this.buildDataTable(page);
}

numPages() { 
    return Math.ceil(this.dataTableService.getPersonInfoItems().length / this.records_per_page);
 }

private buildDataTable(page: number) {
  let cols: string[] = Object.keys(this.personItems[0]);
  const table = document.createElement("table");
  let tr = table.insertRow(-1);               
  cols.forEach((col: string) => {
    const th = document.createElement("th");
    th.innerHTML = col.toUpperCase();
    tr.appendChild(th)
  });

  for (let i = (page-1) * this.records_per_page; i < (page * this.records_per_page); i++) {
      tr = table.insertRow(-1);
      const personItem = this.personItems[i];
      cols.forEach((col: string) => {
        const tableCell = tr.insertCell(-1);
        tableCell.innerHTML = personItem[col];
      });
  }
  const divShowData = document.getElementById('dataTable');
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
 }
}
