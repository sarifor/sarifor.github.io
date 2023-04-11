import React, { Component } from "react";

class Comment extends Component {
    state = {
        color: this.props.color
    };
    
    handleMouseOver = () => {
        this.setState({
            color: "#FDFD96"
        }) // ';' is needed?
    }

    render() {
        let style = {
            background: this.state.color
        };

        return (
            <>
                <div style={style} onMouseOver={this.handleMouseOver}> {/* Cannot assign to read only property 'background' of object '#<Object>' */}
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