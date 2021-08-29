import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { Input1 } from 'src/app/models/input1.model';
import { Input2 } from 'src/app/models/input2.model';
import { User } from 'src/app/models/user.model';
import { CountryService } from 'src/app/services/country.service';
import { UserTableService } from 'src/app/services/user-table.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-create-two',
  templateUrl: './user-create-two.component.html',
  styleUrls: ['./user-create-two.component.css']
})
export class UserCreateTwoComponent implements OnInit {
  step: number = 1;
  title1: string = "1/3";
  subtitle1: string = "Please fill with your details";
  countryList: Country[] = [];
  personalDetails!: FormGroup;
  accountDetails!: FormGroup;
  validationDetails!: FormGroup;
  progress: number = 0;
  progressString: string = this.progress.toString() + "%";
  progressString2: string = this.progress.toString();
  user: User = new User();
  constructor(private cs: CountryService, private us: UserTableService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.GetAllCountry();
    this.personalDetails = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      country: [null, Validators.required],
      accept: [false, Validators.required]
    });
    this.accountDetails = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required]
    });
  }
  get personal() { return this.personalDetails.controls; }
  get account() { return this.accountDetails.controls; }
  GetAllCountry() {
    this.cs.GetAllCountry().subscribe(
      (data: Country[]) => {
        this.countryList = data;
      }
    )
  }
  CreateOneUser(x: User) {
    this.us.CreateUser(x).subscribe(
      res => {
        Swal.fire('Success', 'User Created Succcessfully', 'success');
      }
    )
  }
  initializeStep1() {
    this.step = 1;
    this.title1 = "1/3";
    this.subtitle1 = "Please fill with your details";
    this.progress = 0;
    this.progressString = this.progress.toString() + "%";
  }
  initializeStep2() {
    this.step = 2;
    this.title1 = "2/3";
    this.subtitle1 = "Please provide your account details";
    this.progress = 50;
    this.progressString = this.progress.toString() + "%";
  }
  initializeStep3() {
    this.step = 3;
    this.title1 = "3/3";
    this.subtitle1 = "Summary";
    this.progress = 100;
    this.progressString = this.progress.toString() + "%";

    this.user.userId = 0;
    this.user.firstName = this.personalDetails.value.firstname;
    this.user.lastName = this.personalDetails.value.lastname;
    this.user.email = this.personalDetails.value.email;
    this.user.countryId = this.personalDetails.value.country;
    this.user.userName = this.accountDetails.value.username;
    this.user.userPassword = this.accountDetails.value.password;
  }
  step1NextButtonClick() {
    let x: Input2 = new Input2();
    x.email = this.personalDetails.value.email;
    this.us.IsEmailExists(x).subscribe(
      res => {
        this.initializeStep1();
        Swal.fire('Oops...', 'Email already exists', 'error');
        return;
      },
      err => {

      }
    );
    this.initializeStep2();
  }
  step2PrevButtonClick() {
    this.initializeStep1();
  }
  step2NextButtonClick() {
    let x: Input1 = new Input1();
    x.userName = this.accountDetails.value.username;
    console.log("here is : "+x.userName);

    this.us.IsUserNameExists(x).subscribe(
      res => {
        this.initializeStep2();
        Swal.fire('Oops...', 'User name already exists', 'error');
        return;
      },
      err => {

      }
    );
    if (this.accountDetails.value.password != this.accountDetails.value.confirmpassword) {
      this.initializeStep2();
      Swal.fire('Oops...', 'Password didn\'t match!', 'error');
      return;
    }
    this.initializeStep3();
  }
  step3PrevButtonClick() {
    this.initializeStep2();
  }
  step3SubmitButtonClick() {
    this.CreateOneUser(this.user);
  }
  getCountryName(): string{
    let g = this.countryList.find(x => x.countryId === this.user.countryId);
    if (!g) {
      return '';
    }
    return g.countryName;
  }
  SubmitToServer() {
    this.CreateOneUser(this.user);
  }
}
