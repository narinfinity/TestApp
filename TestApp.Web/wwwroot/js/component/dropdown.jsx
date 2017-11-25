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
        this.state.items = this.props.bindList.map((v, i) => (<li key={i}><Link to="/" onClick={e => this.onClick(e, v)}>{v.Name}</Link></li>));
        this.state.selectedItemName = this.props.defaultText;
    }
    onClick(e, item) {
        e.preventDefault();
        this.setState({ selectedItemName: item.Name});
        this.props.onSelect(item);
    }
    render() {
        const { items, selectedItemName } = this.state;
        return (
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {selectedItemName}
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">{items}</ul>
            </div>
        );
    }
}