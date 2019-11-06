import React, {ReactNode} from 'react';
import './App.css';
import {InputComponent} from "./InputComponent";

class ToDoItem {

    title: string;
    date: Date;
    idx : number;

    constructor(title: string, index : number) {
        this.title = title;
        this.date = new Date();
        this.idx = index;
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

    onDelete(i : any){
        const items_list: ToDoItem [] = this.state.items.slice();
        items_list.splice(i, 1);
        for (var j = i; i < items_list.length; i++) {
            items_list[i].idx = items_list[i].idx - 1;
        }
        this.setState({
            items: items_list
        });
    }


    render(): ReactNode {
        return (
            <div className="App">

                <main className="py-md-3 pl-md-5">

                    <div className="container">

                        <InputComponent onNewTodoCreated={title => this.onNewTodoHandle(title)}/>

                        <div id="items-container">
                            {this.state.items.map(todoItem => {
                                return (
                                    <div>
                                    <div className="d-flex w-100">
                                        <div>{todoItem.title}</div>
                                        <div className="d-flex w-100 justify-content-end">
                                            <div>{todoItem.date.toLocaleString()}</div>
                                           <button className="btn btn-danger delete-button" type="button"
                                                    onClick={() => {
                                                        this.onDelete(todoItem.idx)
                                                    }}>Delete
                                           </button>
                                        </div>
                                    </div>
                                        <div>{<span>&nbsp;</span>}</div>
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
