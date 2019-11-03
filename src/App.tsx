import React, {ReactNode} from 'react';
import './App.css';
import {InputComponent} from "./InputComponent";
import {TodoItem} from "./todo";


interface AppState {

    items: TodoItem[];

}

export class App extends React.Component<{}, AppState> {


    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            items: []
        };
    }

    onNewTodoHandle(title: string) {
        let today = new Date();
        let newTodoItem = new TodoItem({description: title, date: today.toLocaleDateString()});
        this.setState({
            items: [...this.state.items, newTodoItem]
        });
    }

    render(): ReactNode {
        return (
            <div className="App">

                <main className="py-md-3 pl-md-5">

                    <div className="container">

                        <InputComponent onNewTodoCreated={title => this.onNewTodoHandle(title)}/>

                        <div id="items-container">
                            {this.state.items.map(item => {
                                return (
                                    <TodoItem description={item.props.description} date={item.props.date}/>
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
