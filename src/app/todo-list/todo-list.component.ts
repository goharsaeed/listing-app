import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  descriptionFilter = '';
  priorityFilter: any;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getAllTodos().subscribe(
      todos => {
        this.todos = todos;
        this.applyFilters();
      },
      error => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  applyFilters() {
    this.filteredTodos = this.todos.filter(todo => {
      const descriptionMatch = todo.description.toLowerCase().includes(this.descriptionFilter.toLowerCase());
      const priorityMatch = this.priorityFilter === '' || todo.priority.toString() === this.priorityFilter;
      return descriptionMatch && priorityMatch;
    });
  }

  onDescriptionFilterChange() {
    this.applyFilters();
  }

  onPriorityFilterChange() {
    this.applyFilters();
  }
}