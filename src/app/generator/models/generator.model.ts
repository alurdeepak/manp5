export class Generators {
  // public make: string;
  // public sr_no: number;
  // public Slipring_Sr_Num: string;
  // public Cooling_Fan1_Sr_Num: string;
  // public Slipring_Cooling_Fan_Sr_Num: string;


  public id: number;
  public make: string;
  public sr_no: number;
  public generator_slipring_sr_number: string;
  public generator_cooling_fan1_sr_no: string;
  public generator_slipring_cooling_fan_sr_no: string;
  public status: string;
  public sname:string;

  constructor(id: number,make: string, sr_no: number, generator_slipring_sr_number: string, generator_cooling_fan1_sr_no: string,
              generator_slipring_cooling_fan_sr_no: string, status: string, sname: string) {

    this.make = make;
    this.sr_no = sr_no;
    this.generator_slipring_sr_number = generator_slipring_sr_number;
    this.generator_cooling_fan1_sr_no = generator_cooling_fan1_sr_no;
    this.generator_slipring_cooling_fan_sr_no = generator_slipring_cooling_fan_sr_no;
    this.status = status;
    this.sname=sname;
  }


}
