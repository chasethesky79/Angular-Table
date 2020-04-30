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
  currentPage = 1;
  recordsPerPageOptions = [5, 7, 10, 15, 20];
  recordsPerPage = 5;

  constructor(private dataTableService: DataTableService) { }

  ngOnInit() {
    this.personItems = this.dataTableService.getPersonInfoItems();
    this.changePage(1);
  }

    onSelect(value: number) {
      this.recordsPerPage = value;
      this.currentPage = 1;
      this.changePage(1);
    }

    prevPage() {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.changePage(this.currentPage);
      }
    }

   navigateToFirstPage() {
       this.currentPage = 1;
       this.changePage(this.currentPage);
   }

   navigateToLastPage() {
      this.currentPage = this.numPages();
      this.changePage(this.currentPage);
   }

   nextPage() {
      if (this.currentPage < this.numPages()) {
          this.currentPage++;
          this.changePage(this.currentPage);
      }
   }

  private changePage(page: number) {
    const btnNext = document.getElementById('btn_next');
    const btnPrev = document.getElementById('btn_prev');

    // Validate page
    if (page < 1) {
        page = 1;
    }
    if (page > this.numPages()) {
      page = this.numPages();
    }

    if (page === 1) {
        btnPrev.style.visibility = 'hidden';
    } else {
        btnPrev.style.visibility = 'visible';
    }

    if (page === this.numPages()) {
        btnNext.style.visibility = 'hidden';
    } else {
        btnNext.style.visibility = 'visible';
    }
    this.buildDataTable(page);
}

    numPages() {
        return Math.ceil(this.dataTableService.getPersonInfoItems().length / this.recordsPerPage);
     }

    private buildDataTable(page: number) {
      const cols: string[] = Object.keys(this.personItems[0]);
      const table = document.createElement('table');
      let tr = table.insertRow(-1);
      cols.forEach((col: string) => {
        const th = document.createElement('th');
        th.innerHTML = col.toUpperCase();
        tr.appendChild(th);
      });

      for (let i = (page - 1) * this.recordsPerPage; i < (page * this.recordsPerPage); i++) {
          tr = table.insertRow(-1);
          const personItem = this.personItems[i];
          cols.forEach((col: string) => {
            const tableCell = tr.insertCell(-1);
            tableCell.innerHTML = personItem[col];
          });
      }
      const divShowData = document.getElementById('dataTable');
      divShowData.innerHTML = '';
      divShowData.appendChild(table);
     }
    }
