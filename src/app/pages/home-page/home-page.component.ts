import { Component } from '@angular/core';
import { EmployeesService } from '../../providers/employees/employees.service';
import { Employee } from '../../entities/employee.entity';
import { NgClass } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonStore } from '../../stores/user/common-store.service';
import { UserRoles } from '../../enums/user-roles.enum';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../providers/modal-service/modal-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgbPagination,
  ],
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly employeesService: EmployeesService;
  private readonly commonStore: CommonStore;
  private readonly modalService: ModalService;
  private readonly router: Router;
  tableLoading: boolean;
  currentPage: number;
  pageSize: number;
  pagesAmount: number;
  totalDataCount: number;
  employeeList: Employee[];
  responsiveClasses: string[];
  showAdminOptions: boolean;
  myUserName: string | null;
  myEmployeeId: number | null;

  constructor(
    commonStore: CommonStore,
    employeesService: EmployeesService,
    modalService: ModalService,
    router: Router,
  ) {
    this.employeesService = employeesService;
    this.commonStore = commonStore;
    this.modalService = modalService;
    this.router = router;
    this.myUserName = null;
    this.myEmployeeId = null;
    this.showAdminOptions = false;
    this.employeeList = [];
    this.tableLoading = true;
    this.currentPage = 1;
    this.pageSize = 10;
    this.pagesAmount = 0;
    this.totalDataCount = 0;
    this.responsiveClasses = ['col-lg-8', 'col-md-10'];
  }

  ngOnInit() {
    this.loadInitialData();
  }

  async loadInitialData(): Promise<void> {
    const loggedUser = this.commonStore.getUser();

    if (loggedUser) {
      this.showAdminOptions = loggedUser.role === UserRoles.Admin;
      this.myUserName = loggedUser.name;
      this.myEmployeeId = loggedUser.employeeId;
    }

    await this.loadEmployeesFromAPI();
  }

  async loadEmployeesFromAPI(): Promise<void> {
    this.tableLoading = true;

    const response = await this.employeesService.getEmployeesFromAPI({
      currentPage: this.currentPage,
      pageSize: this.pageSize
    });

    this.employeeList = response.dataList;
    this.pagesAmount = response.pagesAmount;
    this.totalDataCount = response.totalDataCount;
    this.tableLoading = false;
  }

  async onAddEmployeeHandler(): Promise<void> {
    await this.router.navigateByUrl('add-employee');
  }

  onDetailsHandler(id: number): void {
    this.router.navigateByUrl(`/details/${id}`);
  }
}
