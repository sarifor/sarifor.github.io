import React, { Component } from "react";

class Comment extends Component {

    handleMouseOver = () => {
        console.log("Mouse overed");
    }

    render() {
        const style = {
            background: this.props.color,
        };

        return (
            <>
                <div style={style} onMouseOver={this.handleMouseOver}>
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