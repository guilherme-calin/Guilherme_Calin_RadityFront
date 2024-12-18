import {Component, Input, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Router} from '@angular/router';
import {Country} from '../../entities/country.entity';
import {AddressType} from '../../entities/address-type.entity';
import {EmployeesService} from '../../providers/employees/employees.service';
import {CreateEmployeeRequestDTO} from '../../providers/employees/dtos/create-employee-request.dto';
import {ToastService} from '../../providers/toast/toast.service';
import {EmployeeOperations} from './enums/employee-operations.enum';
import {EmployeeDetailsResponseDTO} from '../../providers/employees/dtos/employee-details-response.dto';

@Component({
  selector: 'app-employee-view',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  standalone: true,
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss'
})
export class EmployeeViewComponent {
  private formBuilder: FormBuilder;
  private router: Router;
  private employeesService: EmployeesService;
  private toastService: ToastService;

  employeeFormGroup: FormGroup;
  responsiveClasses: string[];
  @Input() loading: boolean;
  @Input() countryList: Country[];
  @Input() addressTypeList: AddressType[];
  @Input() operation: EmployeeOperations;
  @Input() details: EmployeeDetailsResponseDTO | null;

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    employeesService: EmployeesService,
    toastService: ToastService
  ) {
    this.formBuilder = formBuilder;
    this.router = router;
    this.employeesService = employeesService;
    this.toastService = toastService;
    this.loading = false;
    this.details = null;
    this.operation = EmployeeOperations.Create;
    this.countryList = [];
    this.addressTypeList = [];

    this.employeeFormGroup = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      startDate: ['', Validators.required],
      jobTitle: ['', Validators.required],
      photo: [''], // Optional
      addresses: formBuilder.array([])
    });

    this.responsiveClasses = ['col-lg-8', 'col-md-10'];
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log(this.details);
    if (this.details) {
      console.log(this.details);
      this.employeeFormGroup.setValue(this.details)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    if (changes['countryList'].currentValue !== changes['countryList'].previousValue) {
      this.addressTypeList = changes['countryList'].currentValue;
    }

    if (changes['addressTypeList'].currentValue !== changes['addressTypeList'].previousValue) {
      this.addressTypeList = changes['addressTypeList'].currentValue;
    }

    if (changes['operation']?.currentValue !== changes['operation']?.previousValue) {
      this.operation = changes['operation'].currentValue;
    }

    if (changes['details']?.currentValue !== changes['details']?.previousValue && changes['details']?.currentValue) {
      const details: EmployeeDetailsResponseDTO = changes['details'].currentValue;
      this.details = details;

      const addresses = this.details.addresses.map((detailsAddress) => {
        return {
          addressLine1: detailsAddress.addressLine1,
          addressLine2: detailsAddress.addressLine2 ?? '',
          city: detailsAddress.city,
          state: detailsAddress.state,
          zipCode: detailsAddress.zipCode,
          countryIsoCode: detailsAddress.countryIsoCode.toString(),
          addressTypeId: detailsAddress.addressTypeId.toString()
        }});

      const finalValue = {
        firstName: this.details.firstName,
        lastName: this.details.lastName,
        birthDate: this.details.birthDate,
        startDate: this.details.startDate,
        jobTitle: this.details.jobTitle,
        photo: '', // Optional
        addresses: addresses
      };

      addresses.forEach(address => {
        this.addAddress();
      })

      this.employeeFormGroup.setValue(finalValue)
    }
  }

  get addresses() {
    return this.employeeFormGroup.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      countryIsoCode: ['', Validators.required],
      addressTypeId: ['', Validators.required]
    }));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  async goBack(): Promise<void> {
    this.router.navigate(['home']);
  }

  async save(): Promise<void> {
    if (this.employeeFormGroup.valid && this.addresses.controls.length > 0) {
      const formValue = this.employeeFormGroup.value;

      const requestPayload: CreateEmployeeRequestDTO = {
        ...formValue,
        addresses: formValue.addresses.map((formAddress: Record<string, any>) => {
          return {
            ...formAddress,
            addressTypeId: parseInt(formAddress['addressTypeId']),
          }
        })
      }

      try {
        const response = await this.employeesService.createEmployeeInAPI(requestPayload);
        this.toastService.showSuccess('Employee', 'Employee created successfully!');

        this.goBack();
      } catch (e) {
        console.log(e);
        this.toastService.showError('Employee', 'Error creating employee!');
      }

      return;
    }

    console.log(this.employeeFormGroup.value);
    this.toastService.showError('Form', 'There are empty or invalid fields on the form');
  }

  protected readonly EmployeeOperations = EmployeeOperations;
}
