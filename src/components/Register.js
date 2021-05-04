import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        cpassword: '',
        successMsg: '',
        errorMsg: '',
        isSubmitted: false
    };

    registerUser = (event) => {
        event.preventDefault();
        const { first_name, last_name, email, password, cpassword } = this.state;

        const fieldsToValidate = [
            { first_name },
            { last_name },
            { email },
            { password },
            { cpassword }
        ];
    }
}