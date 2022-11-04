import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  public user={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
  }
  ngOnInit(): void {}
  submit(signup:NgForm){
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        alert("User registered");
        this.router.navigate(['login']);
      },
      (error)=>{
        alert('Username already exists');
      }
    )
  }

}
