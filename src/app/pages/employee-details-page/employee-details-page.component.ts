import { Component } from '@angular/core';
import { EmployeeViewComponent } from '../../components/employee-view/employee-view.component';
import { CountriesService } from '../../providers/countries/countries.service';
import { AddressesService } from '../../providers/addresses/addresses.service';
import { Country } from '../../entities/country.entity';
import { AddressType } from '../../entities/address-type.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeesService} from '../../providers/employees/employees.service';
import {EmployeeDetailsResponseDTO} from '../../providers/employees/dtos/employee-details-response.dto';
import {EmployeeOperations} from '../../components/employee-view/enums/employee-operations.enum';

@Component({
  selector: 'app-employee-details-page',
  imports: [EmployeeViewComponent],
  standalone: true,
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.scss'
})
export class EmployeeDetailsPageComponent {
  private readonly countriesService: CountriesService;
  private readonly addressesService: AddressesService;
  private readonly employeesService: EmployeesService;
  private readonly router: Router;
  private readonly activatedRoute: ActivatedRoute;
  loading: boolean;
  countryList: Country[];
  addressTypeList: AddressType[];
  employeeDetails: EmployeeDetailsResponseDTO | null;

  constructor(
    countriesService: CountriesService,
    addressesService: AddressesService,
    router: Router,
    activatedRoute: ActivatedRoute,
    employeesService: EmployeesService,
  ) {
    this.countriesService = countriesService;
    this.addressesService = addressesService;
    this.employeesService = employeesService;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.loading = true;
    this.countryList = [];
    this.addressTypeList = [];
    this.employeeDetails = null;
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;

    const employeeId = this.activatedRoute.snapshot.params['id'];

    if (!employeeId) {
      this.router.navigateByUrl('/home');
      return;
    }

    const parsedEmployeeId: number = parseInt(employeeId);

    const [countryList, addressTypesList, employeeDetails] = await Promise.all([
      this.countriesService.getAll(),
      this.addressesService.getAllTypes(),
      this.employeesService.getEmployeeDetailsInAPI(parsedEmployeeId)
    ]);

    this.countryList = countryList;
    this.addressTypeList = addressTypesList;
    this.employeeDetails = employeeDetails;

    console.log('employeeDetails');
    console.log(employeeDetails);

    this.loading = false;
  }

  protected readonly EmployeeOperations = EmployeeOperations;
}
