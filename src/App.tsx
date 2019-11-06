import React, {ReactNode} from 'react';
import './App.css';
import {InputComponent} from "./InputComponent";

class ToDoItem {

    title: string;
    id : number;
    date: Date;

    constructor(title: string, index : number) {
        this.title = title;
        this.id = index;
        this.date = new Date();
    }
}

interface AppState {

    items: ToDoItem[];

}

export class App extends React.Component<{}, AppState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            items: []
        };
    }

    onNewTodoHandle(title: string) {
        let newTodoItem = new ToDoItem(title, this.state.items.length);
        this.setState({
            items: [...this.state.items, newTodoItem]
        });
    }

    onItemDelete(i : any){
        const items_list: ToDoItem [] = this.state.items.slice();
        items_list.splice(i, 1);
        for (var j = i; i < items_list.length; i++) {
            items_list[i].id = items_list[i].id - 1;
        }
        this.setState({
            items: items_list
        });
    }


    render(): ReactNode {
        return (
            <div className="App">
                <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">

                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav flex-row">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Добавить заметки</a>
                            </li>
                        </ul>
                    </div>

                </header>
                <main className="py-md-3 pl-md-5">

                    <div className="container">

                        <InputComponent onNewTodoCreated={title => this.onNewTodoHandle(title)}/>

                        <div id="items-container">
                            {this.state.items.map(todoItem => {
                                return (
                                    <div>
                                        <div className="date-cell">
                                            <div>{todoItem.title}</div>
                                            <div className="nav-item">
                                                <div>{todoItem.date.toLocaleString()}</div>
                                                <button className="btn btn-danger delete-button w-50" type="button"
                                                        onClick={() => {
                                                            this.onItemDelete(todoItem.id)
                                                        }}>Удалить
                                                </button>
                                            </div>
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
