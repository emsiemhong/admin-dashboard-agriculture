import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  // dataSource = this.dashboardSrv.getData();

  // messages = this.dashboardSrv.getMessages();

  // charts = this.dashboardSrv.getCharts();
  // chart1: any;
  // chart2: any;

  // stats = this.dashboardSrv.getStats();

  // notifySubscription!: Subscription;
  users:any[] = [];
  products:any[] = [];
  categories:any[] = [];
  totalUser: number = 0;
  totalProduct: number = 0;
  totalCategories: number = 0;

  constructor(
    private dashboardSrv: DashboardService,
  ) {}

  ngOnInit() {

    this.getProducts();
    this.getUsers();
    this.getCategories();

    this.getTotalProducts();
    this.getTotalUsers();
    this.getTotalCategories();

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
        console.log('res:::', res);
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

}
