import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {CommonStore} from '../../stores/user/common-store.service';
import {lastValueFrom} from 'rxjs';
import {EmployeeResponseDTO} from './dtos/employee-response.dto';
import {PaginatedResponseDTO} from '../../dtos/paginated-response.dto';
import {PaginatedInput} from '../../dtos/get-paginated-query.dto';
import {Employee} from '../../entities/employee.entity';
import {AUTHORIZED_REQUEST_CONTEXT} from '../../interceptors/authorized-request.interceptor';
import {CreateEmployeeRequestDTO} from './dtos/create-employee-request.dto';
import {EmployeeDetailsResponseDTO} from './dtos/employee-details-response.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private readonly httpClient: HttpClient;
  private readonly commonStore: CommonStore;

  constructor(
    httpClient: HttpClient,
    commonStore: CommonStore
  ) {
    this.httpClient = httpClient;
    this.commonStore = commonStore;
  }

  async getEmployeesFromAPI(paginationInput: PaginatedInput): Promise<PaginatedResponseDTO<Employee>> {
    const response = await lastValueFrom(this.httpClient.get('/employees', { params: paginationInput, context: new HttpContext().set(AUTHORIZED_REQUEST_CONTEXT, true) }));
    const responsePayload= response as PaginatedResponseDTO<EmployeeResponseDTO>;

    return {
      ...responsePayload,
      dataList: responsePayload.dataList.map((dto) => {
        return {
          ...dto,
          photoURL: null
        }
      })
    };
  }

  async createEmployeeInAPI(payload: CreateEmployeeRequestDTO): Promise<EmployeeDetailsResponseDTO> {
    const response = await lastValueFrom(this.httpClient.post('/employees', payload, { context: new HttpContext().set(AUTHORIZED_REQUEST_CONTEXT, true) }));

    return response as EmployeeDetailsResponseDTO;
  }

  async getEmployeeDetailsInAPI(id: number): Promise<EmployeeDetailsResponseDTO> {
    const response = await lastValueFrom(this.httpClient.get(`/employees/${id}`, { context: new HttpContext().set(AUTHORIZED_REQUEST_CONTEXT, true) }));

    return response as EmployeeDetailsResponseDTO;
  }
}
