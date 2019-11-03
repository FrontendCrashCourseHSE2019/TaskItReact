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
    nextId: number;

}

export class App extends React.Component<{}, AppState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            items: [],
            nextId: 0
        };
    }

    onNewTodoHandle(title: string, date: Date) {
        const id: number = this.state.nextId;
        let newTodoItem = new ToDoItem(id, title, date);
        this.setState({
            items: [...this.state.items, newTodoItem],
            nextId: id + 1
        });
    }

    onItemRemove(id: number) {
        const undeletedItems: ToDoItem [] = this.state.items.filter((item) => item.id !== id);
        this.setState({
            items: undeletedItems
        });
    }

    render(): ReactNode {
        return (
            <div className="App">

                <header className="navbar sticky-top navbar-expand navbar-dark flex-column flex-md-row bd-navbar">

                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav flex-row">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">TaskIT</a>
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
                                    <div className="card" key={todoItem.id}>
                                        <div className="d-flex p-2 bd-highlight justify-content-between">
                                            <h5 className="mb-1">{todoItem.title}</h5>
                                            <div className="task-date">{todoItem.date.toLocaleString()}</div>
                                            <button className="btn btn-outline-secondary btn-delete-card" type="button"
                                                    onClick={() => {
                                                        this.onItemRemove(todoItem.id)
                                                    }}
                                            >Delete
                                            </button>
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

};

export default App;
