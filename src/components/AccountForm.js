import React from 'react';
import { connect } from 'react-redux';

class AccountForm extends React.Component {
    render() {
        return (
            <div>
                <p>Account Form</p>
            </div>
        );
    }
}

export default connect()(AccountForm);