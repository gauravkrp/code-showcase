const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class FeedBackModel {
    tableName = 'feedbacks';

    assign = async (records) => {
        console.log(records)
        const sql = `INSERT INTO ${this.tableName}
        (id, user_id, given_by_user_id, assigned_on) VALUES ? `;

        const result = await query(sql, [records], true);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
    }

    submit = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);
        return result;
    }

    fetchUserReviewFeedback = async(params) => {
        const { columnSet, values } = multipleColumnSet(params)
        
        const sql = `SELECT f.id, f.feedback, f.assigned_on, f.given_by_user_id, f.created_on, 
        u.name, u.email, u.id as user_id, 
        g.name as given_by_user, g.email as given_by_user_email
        FROM feedbacks as f
        LEFT JOIN users as u ON f.user_id = u.id
        LEFT JOIN users as g ON f.given_by_user_id = g.id
        WHERE f.user_id = '${params.id}'`
        
        const result = await query(sql, [...values]);
        
        return result;
    }

    askedForFeedback = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        
        const sql = `SELECT u.id as asked_user_id, u.name as asked_user_name, u.email as asked_user_email,
        u.review as asked_user_review,
        f.id, f.assigned_on, f.created_on, f.feedback
        FROM users as u
        LEFT JOIN feedbacks as f on u.id = f.user_id
        WHERE f.given_by_user_id = '${params.id}'`;

        const result = await query(sql, [...values]);

        return result;
    }

}

module.exports = new FeedBackModel;