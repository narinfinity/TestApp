import React from "react";
import { computed, observable } from "mobx";

export default class Editor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editing: false
        };
    }

    onClick(e) {
        //let v = e.target.innerText;
        this.setState({ editing: true });
    }

    onBlur(e) {
        this.setState({ editing: false });
    }

    onChange(e) {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    }
    render() {
        const { value, editing } = this.state;
        
        return (
            <div class="form-group">
                { editing
                  ? <input class="form-control" type="text"
                         onBlur={this.onBlur.bind(this)} onChange={this.onChange.bind(this)} value={value} />
                    : <label class="form-control" onClick={this.onClick.bind(this)}>{value}</label>}
            </div>
        );
    }
}
