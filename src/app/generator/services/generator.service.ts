import {Injectable} from '@angular/core';
import { Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Generators } from '../models/generator.model';
import {Status} from '../models/status.model';
import {post} from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})
export class GeneratorService {
  private generator_data: Generators[] = [];
  private gen_data = [];
  private status: Status[] = [];
  private statusUpdated = new Subject<Status[]>();
  private generatorUpdated = new Subject<Generators[]>();
  private generatorById = new Subject<Generators[]>();

  constructor(private http: HttpClient) {}


  getStatus() {
    this.http.get<{status: string, message: string, data: Status[] }>('http://10.1.5.148:9999/api/status')
      .subscribe((statusData) => {
        this.status = statusData.data;

        this.statusUpdated.next([...this.status]);
      });
  }

   getStatusUpdateListener() {
    return this.statusUpdated.asObservable();
  }

  saveDetails(make: string, sr_no: number, generator_slipring_sr_number: string, generator_cooling_fan1_sr_no: string,
              generator_slipring_cooling_fan_sr_no: string, status: string ) {

   const generatorDetails: Generators = {id:1, make: make, sr_no: sr_no, generator_slipring_sr_number: generator_slipring_sr_number, generator_cooling_fan1_sr_no: generator_cooling_fan1_sr_no,
     generator_slipring_cooling_fan_sr_no: generator_slipring_cooling_fan_sr_no, status: status, sname: 'Active'  };

    this.http.post<{message: string}>('http://10.1.5.148:9999/api/saveGeneratorDetails', generatorDetails)
      .subscribe((responseData) => {
        console.log(responseData);

        this.generator_data.push(generatorDetails);
        this.statusUpdated.next([...this.status]);
      });
  }

  updateGenerator(id: number,make: string, sr_no: number, generator_slipring_sr_number: string, generator_cooling_fan1_sr_no: string,
                  generator_slipring_cooling_fan_sr_no: string, status: string, callback ) {


    const generatorDetails = {id: id, make: make, sr_no: sr_no, generator_slipring_sr_number: generator_slipring_sr_number, generator_cooling_fan1_sr_no: generator_cooling_fan1_sr_no,
      generator_slipring_cooling_fan_sr_no: generator_slipring_cooling_fan_sr_no, status: status, sname: 'Active'};
console.log('incoming data is '+JSON.stringify(generatorDetails))
    this.http.post<{message: string}>('http://10.1.5.148:9999/api/updateGenerator', generatorDetails)
      .subscribe((responseData) => {
        //console.log('resp data is '+ responseData.status);

        // if(responseData.status === "SUCCESS"){
        //   console.log('inside if');
        //   this.generator_data.push(generatorDetails);
        //   this.statusUpdated.next([...this.status]);
        //   callback= 'SUCCESS';
        // } else{
        //   callback = 'FAILED';
        // }


      });

  }

  getGeneratorData() {
    this.http.get<{status: string, message: string, data: Generators[] }>('http://10.1.5.148:9999/api/generatorDetails')
      .subscribe((generatorData) => {
        this.generator_data = generatorData.data;
        this.generatorUpdated.next([...this.generator_data]);
      });
  }

  getGeneratorUpdateListener() {
    return this.generatorUpdated.asObservable();
  }

  getGeneratorById(id: number) {
    console.log(id);
    this.http.get<{status: string, message: string, data }>(`http://10.1.5.148:9999/api/getGeneratorById/${id}`)
      .subscribe((gen_data) => {
        console.log(gen_data);
        this.gen_data = gen_data.data;
        this.generatorById.next([...this.gen_data]);
      });
  }

  getGeneratorByIdListener() {
    return this.generatorById.asObservable();
  }

}
