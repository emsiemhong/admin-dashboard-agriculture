import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'product_name', 'sale_quantity', 'sale_amount'];
  dataSource:any = [];

  users:any[] = [];
  products:any[] = [];
  categories:any[] = [];
  totalUser: number = 0;
  totalProduct: number = 0;
  totalCategories: number = 0;

  chart1: any;
  chart2: any;
  constructor(
    private ngZone: NgZone,
    private dashboardSrv: DashboardService,
  ) {}

  ngOnInit() {

    this.getProducts();
    this.getUsers();
    this.getCategories();

    this.getTotalProducts();
    this.getTotalUsers();
    this.getTotalCategories();
    this.getTopProductSales();
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initChart());
  }

  getTotalProducts() {
    this.dashboardSrv.getTotalProducts().subscribe({
      next: (res) => {
        this.totalProduct = res?.totalProducts;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTotalUsers() {
    this.dashboardSrv.getTotalUsers().subscribe({
      next: (res) => {
        this.totalUser = res?.totalUsers;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTotalCategories() {
    this.dashboardSrv.getTotalCategories().subscribe({
      next: (res) => {
        this.totalCategories = res?.totalCategories
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getProducts(){
    this.dashboardSrv.getProducts().subscribe({
      next: (res) => {
        this.products = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getUsers() {
    this.dashboardSrv.getUsers().subscribe({
      next: (res) => {
        this.users = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCategories() {
    this.dashboardSrv.getCategories().subscribe({
      next: (res) => {
        this.categories = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTopProductSales() {
    this.dashboardSrv.getTopProductSales().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  initChart() {

    this.dashboardSrv.getSalesByCategory().subscribe({
      next: (res) => {

        let chartOption = {
          series: res?.map((d: { total_sales_amount: number; }) => Number(d?.total_sales_amount)),
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: res?.map(((d: { category_name: string; }) => d?.category_name)),
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        };

        this.chart1 = new ApexCharts(document.querySelector('#chart1'), chartOption);
        this.chart1?.render();
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.dashboardSrv.getSalesByMonth().subscribe({
      next: (res) => {

        let chartOption = {
          series: [{
            name: "Desktops",
            data: res?.map((d: { total_sales_amount: any; }) => d?.total_sales_amount)
          }],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: res?.map((d: { sales_month: any; }) => d.sales_month),
          }
        };

        this.chart2 = new ApexCharts(document.querySelector('#chart2'), chartOption);
        this.chart2?.render();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
