import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Grid extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const keys = this.props.bindList.length
            ? Object.keys(this.props.bindList[0]).map((k, i) => k === "Id" ? "#" : k)
            : [];

        const colsHeader = keys.map((k, i) => (<th class="text-center" key={"head-" + i}>{k}</th>));
        const colsFooter = keys.map((k, i) => (<td key={"foot-" + i}></td>));

        const { createHtmlElementForKey } = this.props;

        const rowsBody = this.props.bindList.map((item, index) => {

            const cols = keys.map((k, i) => (
                <td key={i}>
                    <div class="input-group-sm">
                        {
                            typeof (createHtmlElementForKey) === "function"
                                ? createHtmlElementForKey(index, item, k)
                                : <span class="form-control text-ellipsis">{k === "#" ? index + 1 : item[k]}</span>
                        }
                    </div>
                </td>));

            const actionCols = Object.keys(this.props.actionCols || {}).map((k, i) => (
                <td key={cols.length + i}>
                    <div class="input-group-sm">
                        {
                            typeof (this.props.actionCols[k]) === "function"
                                ? <button class="btn-link" onClick={this.props.actionCols[k].bind(this, item)}>{k}</button>
                                : <Link to={this.props.actionCols[k].LinkTo + item.Id} class="btn-link">{this.props.actionCols[k].LinkText}</Link>
                        }
                    </div>
                </td>));

            return (
                <tr key={index}>
                    {cols}{actionCols}
                </tr>
            );
        });

        return (
            <table class="table">
                <thead><tr key="head">{colsHeader}</tr></thead>
                <tbody>{rowsBody}</tbody>
                <tfoot><tr key="foot">{colsFooter}</tr></tfoot>
            </table>
        );
    }
}