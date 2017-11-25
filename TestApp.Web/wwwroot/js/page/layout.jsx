import React from "react";

import Footer from "../component/footer.jsx";
import Nav from "../component/nav.jsx";

export default class Layout extends React.Component {
    render() {
        const { location } = this.props;

        return (
            <div class="container-fluid">
                <Nav location={location} />
                <div class="row">
                    <div class="col-xs-12">
                        <h1>My Test App</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        {this.props.children}
                    </div>
                </div>
                <hr />
                <Footer />
            </div>
        );
    }
}
