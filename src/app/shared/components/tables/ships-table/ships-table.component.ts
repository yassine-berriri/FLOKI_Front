import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared.module';


export interface Ship {
  pickUp: string;
  delivery: string;
  startDate: Date;
  EndDate: Date;
  price: number;
}
const ELEMENT_DATA: Ship[] = [
  {pickUp: "1", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 100},
  {pickUp: "2", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 150},
  {pickUp: "3", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 90},
  {pickUp: "4", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 30},
  {pickUp: "5", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 10},
  {pickUp: "5", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 180},
  {pickUp: "5", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 250},
  {pickUp: "5", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 22},
  {pickUp: "5", delivery: 'Hydrogen', startDate: new Date(), EndDate: new Date(), price: 15},
];

@Component({
  selector: 'app-ships-table',
  standalone: true,
  imports: [SharedModule,MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, MatSliderModule, MatFormFieldModule, MatDatepickerModule, 
    MatNativeDateModule,
    MatInputModule],
  templateUrl: './ships-table.component.html',
  styleUrl: './ships-table.component.scss'
})
export class ShipsTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['pickUp', 'delivery', 'startDate', 'EndDate', "price"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  priceMin = 0;
  priceMax = 1000;
  pickUpFilterValue = '';
  deliveryFilterValue = '';
  startDateFilterValue: Date | null = null;
  today: Date = new Date();

  formatLabel(value: number): string {
      return value + '$';

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource.filterPredicate = this.createFilter();
   }


  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple languages, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }


    applyFilter(column: string, event: Event) {
      const filterValue = (event.target as HTMLInputElement)?.value?.trim().toLowerCase() || '';
      this.dataSource.filter = JSON.stringify({ column, filterValue });
    }
    
    applyDateFilter(column: string, dateValue: Date) {
      this.dataSource.filter = JSON.stringify({ column, filterValue: dateValue });
    }
  
    applyPriceFilter(column: string) {
      this.dataSource.filter = JSON.stringify({
        column
        // Add other filters here if needed
      });
    }

    applyFilterTest() {
      this.dataSource.filter = JSON.stringify({
        pickUp: this.pickUpFilterValue,
        delivery: this.deliveryFilterValue,
        startDate: this.startDateFilterValue,
        price: this.priceMin
      });
    }
  
    createFilter(): (data: Ship, filter: string) => boolean {
      return (data: Ship, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);
  
        const matchesPickUp = searchTerms.pickUp ? data.pickUp.toLowerCase().includes(searchTerms.pickUp.toLowerCase()) : true;
        const matchesDelivery = searchTerms.delivery ? data.delivery.toLowerCase().includes(searchTerms.delivery.toLowerCase()) : true;
        const matchesStartDate = searchTerms.startDate ? new Date(data.startDate) >= new Date(searchTerms.startDate) : true;
        const matchesPrice = data.price >= (this.priceMin || 0) && data.price <= (this.priceMax || 250);
  
        return matchesPickUp && matchesDelivery && matchesStartDate && matchesPrice;
      };
    }


    onReset(){
      this.pickUpFilterValue = '';
      this.deliveryFilterValue = '';
      this.startDateFilterValue = null;
      this.priceMin = 0;
      this.priceMax = 1000;
      this.applyFilterTest()
    }

    
}
