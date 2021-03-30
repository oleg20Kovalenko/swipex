import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRequestOptions } from 'src/app/models/user.request.options';
import { UsersPage } from 'src/app/models/users.page';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  usersPage: UsersPage;
  pageOptions: UserRequestOptions;
  pagination: number[];
  totalPage: number;

  constructor(private userService: UserService) {
    this.pageOptions = new UserRequestOptions();
  }

  ngOnInit() {
    this.pageOptions.params.page = '1';
    this.pageOptions.params.per_page = '6';
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUsers() {
    this.subscription.add(
      this.userService
        .getUsers(this.pageOptions)
        .subscribe((page: UsersPage) => {
          this.usersPage = page;
          this.pagination = this.updatePagination();
        })
    );
  }

  changePage(number: number) {
    this.pageOptions.params.page = String(number);
    this.loadUsers();
  }

  updatePagination(): number[] {
    const offset = 1;
    const pagination: number[] = [];
    const startPage =
      this.usersPage.page - offset > 1 ? this.usersPage.page - offset : 1;
    const endPage =
      this.usersPage.page + offset <= this.usersPage.total_pages
        ? this.usersPage.page + offset
        : this.usersPage.total_pages;

    for (let i: number = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    return pagination;
  }
}
