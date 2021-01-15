import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import {tap} from 'rxjs/operators'

export interface Todo {
    id: number
    title: string
    completed: boolean
    date?: Date
}

@Injectable({providedIn: 'root'})
export class TodosService {
    public todos: Todo[] = []

    constructor(private http: HttpClient) {}

    fetchTodos(): Observable<Todo[]> {
       return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=15')
       .pipe(tap(todos=> this.todos = todos))
    }
    
    onToggle(id: number) {
        const i = this.todos.findIndex(todo => todo.id === id)
        this.todos[i].completed = !this.todos[i].completed
    }

    removeTodo(id: number) {
        this.todos = this.todos.filter(item => item.id !== id)
    }

    addTodo(todo: Todo) {
        this.todos.push(todo)
    }
}