import { switchMap } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  userId: string;
  constructor(private authService: AuthService, private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(
      switchMap( u => {
        return orderService.getOrdersByUser(u.uid).valueChanges();
      })
    );
   }

  ngOnInit() {
  }

}
