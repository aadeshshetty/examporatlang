import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={
    username:'',
    password:'',
  };
  constructor(private loginser:LoginService,private router:Router) { }

  ngOnInit(): void {
    if(this.loginser.isLoggedIn()){
      if(this.loginser.getUserRole()=='Admin'){
        //window.location.href='/admin';
        this.router.navigate(['admin']);
        this.loginser.loginStatusSubject.next(true);
      }else if(this.loginser.getUserRole()=='Normal'){
        //window.location.href='/user-dashboard';
        this.router.navigate(['user-dashboard']);
        this.loginser.loginStatusSubject.next(true);
      }
    }
  }
  loginSubmit(){
      if(this.loginData.username.trim()==''||this.loginData.username==null || this.loginData.password.trim()==''||this.loginData.password==null){
        alert("Username and Password is required");
        return;
      }
      this.loginser.generateToken(this.loginData).subscribe((data:any)=>{
        // console.log("Success");
        // console.log(data);

        this.loginser.loginUser(data.token);
        this.loginser.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginser.setUser(user);
            // console.log(user);
            if(this.loginser.getUserRole()=='Admin'){
              //window.location.href='/admin';
              this.router.navigate(['admin']);
              this.loginser.loginStatusSubject.next(true);
            }else if(this.loginser.getUserRole()=='Normal'){
              //window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.loginser.loginStatusSubject.next(true);
            }
            
          }
        )

      },(error:any)=>{
        // console.log("Error");
        alert("Invalid Credentials");
        console.log(error);
      });
  } 
}
