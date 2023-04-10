import React, { Component } from 'react';
import Comment from './Comment';

class ScrollBox extends Component {
    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    }

    render() {
        const style = {
            border: '1px solid black',
            height: '300px',
            width: '300px',
            overflow: 'auto',
            position: 'relative'
        }

        return (
            <div style={style} ref={(ref) => {this.box=ref}}>
                <p>Rumongdaro!</p>
                <hr/>

                <Comment />
            </div>
        );
    }
}

export default ScrollBox;