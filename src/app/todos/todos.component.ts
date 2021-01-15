import { Component, OnInit } from '@angular/core';
import {TodosService} from '../shared/todo.service'
import {delay} from 'rxjs/operators'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {

  isLoading: boolean = true;
  searchQuery: string = '';
  
  constructor(public todosService: TodosService) { }

  toggleCompleted(id: number) {
    this.todosService.onToggle(id)
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
  }

  ngOnInit(): void {
    this.todosService.fetchTodos()
    .pipe(delay(1000))
    .subscribe( () => {
      this.isLoading = false
    })
  }

}
