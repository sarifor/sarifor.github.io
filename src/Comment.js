import React, { Component } from "react";

class Comment extends Component {
    render() {
        return (
            <div>
                <div>
                    Date: {this.props.date}
                </div>
                <div>
                    Comment: {this.props.comment}
                </div>
            </div>
        );
    }
}

export default Comment;