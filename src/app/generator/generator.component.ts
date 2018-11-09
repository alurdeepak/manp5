import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Generators} from './models/generator.model';
import {GeneratorService} from './services/generator.service';
import {Status} from './models/status.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  status: Status[] = [];

   genById ;
  gen_data: Generators[] = [];
  gen_data_complete_list: Generators[] = [];
  private statusSub: Subscription;
  private generatorSub: Subscription;
  private generatorById: Subscription;
   flag = false;
  constructor(public generatorService: GeneratorService) { }

  // g_id: number;
  // g_make: string;
  // g_sr_no: number;
  // g_slipring_Sr_Num: string;
  // g_cooling_Fan1_Sr_Num: string;
  // g_slipring_Cooling_Fan_Sr_Num: string;
  // g_status : number;let

   generator_val: Generators[] = [] ;

  ngOnInit() {
    this.generator_val[0]=JSON.parse("[{\"id\":0,\"make\":\"\",\"sr_no\":\"\",\"status_id_fk\":1,\"generator_slipring_sr_number\":\"\",\"generator_cooling_fan1_sr_no\":\"\",\"generator_slipring_cooling_fan_sr_no\":\"\"}]");


    this.generatorService.getStatus();
    this.statusSub = this.generatorService.getStatusUpdateListener()
      .subscribe((status: Status[]) => {
        this.status = status;
        console.log('status list is ' + JSON.stringify(status));
      });  // status

    this.generatorService.getGeneratorData();
    this.generatorSub = this.generatorService.getGeneratorUpdateListener()
      .subscribe((gen_data) => {
        this.gen_data = gen_data;
        this.gen_data_complete_list = gen_data;
         console.log(gen_data);
      }); // all data


    this.generatorById = this.generatorService.getGeneratorByIdListener()
      .subscribe((genById) => {
        console.log("ret gen details "+ JSON.stringify(genById));
        this.generator_val = genById;

           console.log('gen make is'+ JSON.stringify(this.generator_val));


      });  // data by id

  }

  onAddPost(form: NgForm) {
    this.generatorService.saveDetails(form.value.make, form.value.sr_no, form.value.generator_slipring_sr_number, form.value.generator_cooling_fan1_sr_no,
      form.value.generator_slipring_cooling_fan_sr_no, form.value.status);
    console.log(form);
  }

  getGeneratorById(id) {
     this.generatorService.getGeneratorById(id);
     console.log(id);
     this.flag = true;
  }
  updateGenerator(form: NgForm) {

    this.generatorService.updateGenerator(form.value.id, form.value.make, form.value.sr_no, form.value.generator_slipring_sr_number, form.value.generator_cooling_fan1_sr_no,
      form.value.generator_slipring_cooling_fan_sr_no, form.value.status, (callback) =>{
        console.log('form data' + callback);

    if ('SUCCESS' === callback) {
      this.generatorService.getGeneratorData();

    } else {
      console.log('Update failed');
    }

      });


  }
}
