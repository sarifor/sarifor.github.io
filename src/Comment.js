import React, { Component } from "react";

class Comment extends Component {
    /* handleMouseOver = () => {
        console.log("Mouse overed");
        style.background = "yellow";
    } */

    render() {
        let style = {
            background: "this.props.color",
        };

        return (
            <>
                <div style={style} onMouseOver={()=>{style.background="yellow"}}> {/* Cannot assign to read only property 'background' of object '#<Object>' */}
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