import React, { Component } from "react";

class Comment extends Component {
    render() {
        const style = {
            background: this.props.color,
        };

        return (
            <>
                <div style={style}>
                    <div>
                        Date: {this.props.date}
                    </div>
                    <div>
                        Comment: {this.props.comment}
                    </div>
                </div>
                <hr/>
            </>
        );
    }
}

export default Comment;