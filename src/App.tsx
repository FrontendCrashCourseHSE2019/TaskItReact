import React, {ReactNode} from 'react';
import './App.css';
import {InputComponent} from "./InputComponent";

class ToDoItem {

    id: number;
    title: string;
    date: Date;


    constructor(id: number, title: string, date: Date) {
        this.id = id;
        this.title = title;
        this.date = date;
    }

}

interface AppState {

    items: ToDoItem[];
    newid: number;

}

export class App extends React.Component<{}, AppState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            items: [],
            newid: 0
        };
    }

    onNewTodoHandle(title: string, date: Date) {
        const id = this.state.newid;
        let newTodoItem = new ToDoItem(id, title, date);
        this.setState({
            items: [...this.state.items, newTodoItem],
            newid: id+1
        });
    }

    onRemoveTodo(id: number) {
        let notRemovedTodos: ToDoItem [] = this.state.items.filter((item) => item.id !== id);

        this.setState({
            items: notRemovedTodos
        });
    }

    render(): ReactNode {
        return (
            <div className="App">

                <header className="navbar navbar-expand flex-column flex-md-row bd-navbar sticky-top">

                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav nav-pills bd-navbar-nav flex-row">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Мои дела</a>
                            </li>
                        </ul>
                    </div>

                </header>

                <main className="py-md-3 pl-md-5">

                    <div className="container">

                        <InputComponent onNewTodoCreated={(title, date) => this.onNewTodoHandle(title, date)}/>

                        <div id="items-container">
                            {this.state.items.map(todoItem => {
                                return (
                                    <div className="card mb-2" key={todoItem.id}>
                                        <div className="d-flex justify-content-between">
                                            <div className="card-subtitle p-2">{todoItem.date.toLocaleString()}</div>
                                            <button className="btn btn-outline-warning btn-delete-card m-1" type="button"
                                                    onClick={() => {
                                                        this.onRemoveTodo(todoItem.id)
                                                    }}>Удалить
                                            </button>
                                        </div>

                                        <div className="d-flex bd-highlight justify-content-between">
                                            <div className="card-body text-wrap">{todoItem.title}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </main>

            </div>
        );
    }

}

export default App;
