import React from "react";
import { computed, observable } from "mobx";
import { NavLink, Link } from "react-router-dom";

export default class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectedItemName: "Select"
        };
        this.onClick = this.onClick.bind(this);
    }
    componentWillReceiveProps(nextProps) { //not called with initial props during mounting
        //before a mounted component receives new props
        //state to be up-to-date with any props update
        //must compare this.props and nextProps and then this.setState(), setState() doesn’t trigger this method
        //called even if the props have not changed, only if some of component’s props may update


    }
    onClick(e, item) {
        e.preventDefault();
        this.setState({ selectedItemName: item.Name});
        this.props.onSelect(item);
    }
    render() {
        const items = this.props.bindList.map((v, i) => (<li key={i}><Link to="/" onClick={e => this.onClick(e, v)}>{v.Name}</Link></li>));
        const defaultText = this.props.defaultText;

        return (
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {defaultText}
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">{items}</ul>
            </div>
        );
    }
}