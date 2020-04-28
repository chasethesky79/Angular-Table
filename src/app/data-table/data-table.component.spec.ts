import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let changePageSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Page Navigation', () => {
    beforeEach(() => {
      component.changePage = () => {};
      changePageSpy = spyOn(component, 'changePage');
    });

    it('onSelect -> should set the records per page to selected value and navigate to first page', () => {
      component.onSelect(5);
      expect(component.recordsPerPage).toEqual(5);
      expect(component.currentPage).toEqual(1);
      expect(changePageSpy).toHaveBeenCalledWith(1);
    });

    it('prevPage -> should decrement the currentPage by 1 and call changePage', () => {
      component.currentPage = 2;
      component.prevPage();
      expect(component.currentPage).toEqual(1);
      expect(changePageSpy).toHaveBeenCalledWith(1);
    });

    it('navigateToFirstPage -> should set the currentPage to 1 and call changePage', () => {
      component.currentPage = 4;
      component.navigateToFirstPage();
      expect(component.currentPage).toEqual(1);
      expect(changePageSpy).toHaveBeenCalledWith(1);
    });

    it('nextPage -> should increment currentPage by 1 and call changePage', () => {
      component.currentPage = 4;
      component.numPages = () => 5;
      component.nextPage();
      expect(component.currentPage).toEqual(5);
      expect(changePageSpy).toHaveBeenCalledWith(5);
    });
  });
});
