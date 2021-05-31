const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const isInvalidField = (receivedFields, validFieldsToUpdate) => {
    return receivedFields.some(
        (field) => validFieldsToUpdate.indexOf(field) === -1
    );
};

const validateUser = async (email,password) => {
    const result = await pool.query(
        'select userid, email, password from bank_user where email = $1',
        [email]
    );
    const user = result.rows[0];
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            delete user.password;
            return user;
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
};

const generateAuthToken = async (user) => {
    const { userid, email } = user;
    const secret = process.env.secret;
    const token = await jwt.sign({ userid, email }, secret);
    return token;
};

const getTransactions = async (account_id, start_date, end_date) => {
    let result;
    try {
        if (start_date && end_date) {
            result = await pool.query(
                "select to_char(transaction_date, 'YYYY-MM-DD') as formatted_date,withdraw_amount,deposit_amount,balance from transactions where account_id=$1 and to_char(transaction_date, 'YYYY-MM-DD') between $2 and $3 order by transaction_date desc",
                [account_id, start_date, end_date]
            );
        } else {
            result = await pool.query(
                "select to_char(transaction_date, 'YYYY-MM-DD') as formated_date,withdraw_amount,deposit_amount,balance from transactions where account_id=$1 oder by transaction_date desc",
                [account_id]
            );
        }
        return result;
    } catch (error) {
        throw new Error();
    }
};

module.exports = { isInvalidField, validateUser, generateAuthToken, getTransactions, generatePDF };