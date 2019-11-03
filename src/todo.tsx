import React, {ReactNode} from "react";

type TodoItemProps = { description: string, date: string};

type TodoItemState = { active: boolean }

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {

    constructor(props: TodoItemProps) {
        super(props);
        this.state = {active: true}
    }

    changeState() {
        this.setState({
            active: false
        });
    }


    render(): ReactNode {
        if (this.state.active === true)
            return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.description}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.date}</h6>
                        <button className="btn btn-danger" onClick={event => this.changeState()}>Удалить</button>
                    </div>
                </div>
            );
        else
            return (
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Карточка была удалена</h6>
                    </div>
                </div>
            );
    }

}
