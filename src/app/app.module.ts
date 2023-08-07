import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoFormComponent],
  imports: [BrowserModule, HttpClientModule], // Add HttpClientModule here
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
