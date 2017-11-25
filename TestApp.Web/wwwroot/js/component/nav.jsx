import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true
        };
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        // const featuredClass = location.pathname === "/" ? "active" : "";
        // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
        // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";

        return (
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class={"navbar-collapse " + navClass}>
                        <ul class="nav navbar-nav">
                            <li class="active">
                                <NavLink to="/" exact replace
                                    activeStyle={{ fontWeight: 'bold', color: 'white' }} onClick={this.toggleCollapse.bind(this)}>Product Store</NavLink>
                            </li>
                            <li class="active">
                                <NavLink to="/shopping-card/0" exact replace
                                    activeStyle={{ fontWeight: 'bold', color: 'white' }} onClick={this.toggleCollapse.bind(this)}>Shopping Card</NavLink>
                            </li>
                            <li class="active">
                                <NavLink to="/payment" exact replace
                                    activeStyle={{ fontWeight: 'bold', color: 'white' }} onClick={this.toggleCollapse.bind(this)}>Payment</NavLink>
                            </li>
                            <li class="active">
                                <NavLink to="/product-detail/0" exact replace
                                    activeStyle={{ fontWeight: 'bold', color: 'white' }} onClick={this.toggleCollapse.bind(this)}>Product detail</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
