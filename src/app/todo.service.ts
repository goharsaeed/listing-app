// src/app/todo.service.ts
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAllTodos() {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
