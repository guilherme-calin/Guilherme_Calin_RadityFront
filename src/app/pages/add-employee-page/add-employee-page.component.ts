import { Component } from '@angular/core';
import { EmployeeViewComponent } from '../../components/employee-view/employee-view.component';
import { CountriesService } from '../../providers/countries/countries.service';
import { AddressesService } from '../../providers/addresses/addresses.service';
import { Country } from '../../entities/country.entity';
import { AddressType } from '../../entities/address-type.entity';
import {EmployeeOperations} from '../../components/employee-view/enums/employee-operations.enum';

@Component({
  selector: 'app-add-employee-page',
  imports: [EmployeeViewComponent],
  standalone: true,
  templateUrl: './add-employee-page.component.html',
  styleUrl: './add-employee-page.component.scss'
})
export class AddEmployeePageComponent {
  private readonly countriesService: CountriesService;
  private readonly addressesService: AddressesService;
  loading: boolean;
  countryList: Country[];
  addressTypeList: AddressType[];

  constructor(
    countriesService: CountriesService,
    addressesService: AddressesService
  ) {
    this.countriesService = countriesService;
    this.addressesService = addressesService;
    this.loading = true;
    this.countryList = [];
    this.addressTypeList = [];
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;

    const [countryList, addressTypesList] = await Promise.all([
      this.countriesService.getAll(),
      this.addressesService.getAllTypes()
    ]);

    this.countryList = countryList;
    this.addressTypeList = addressTypesList;
    this.loading = false;
  }

  protected readonly EmployeeOperations = EmployeeOperations;
}
