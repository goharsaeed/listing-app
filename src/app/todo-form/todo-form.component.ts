// src/app/todo-form/todo-form.component.ts
import { Component } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  newTodo: Todo = {
    id: 0,
    description: '',
    dueDate: new Date(),
    priority: 1
  };

  constructor(private todoService: TodoService) { }

  saveTodo() {
    // Assuming validation is done before saving the todo
    this.todoService.addTodo(this.newTodo).subscribe(
      () => {
        console.log('Todo added successfully');
        this.newTodo = {
          id: 0,
          description: '',
          dueDate: new Date(),
          priority: 1
        };
      },
      error => {
        console.error('Error saving todo:', error);
      }
    );
  }
}
