import { Connection } from "./index";

//can be insert, delete, whatever
export const all = async () => {
    return new Promise((resolve, reject) => {
        Connection.query('Select * from books', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export default {
    all
}