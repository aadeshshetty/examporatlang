import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:''
  };
  constructor(private _category:CategoryService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      alert("title is null");
      return;
    }
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        alert("Category Added");
        this.router.navigate(['admin/categories']);
      },
      (error)=>{
        alert("Error");
        console.log(error);
        
      }
    )
    
  }

}
