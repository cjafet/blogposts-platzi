const AWS = require('aws-sdk');
const { Pool, Client } = require('pg');

let pool = new Pool({
    user: 'user',
    host: 'endpoint.region.redshift.amazonaws.com',
    database: 'db-name',
    password: 'db-pwd',
    port: 5439,
});
    
let s3Path = 's3://bucket/file.json';
let targetTable = 'nome-da-tabela-no-redshift';
let region = 'aws-region';
let role = 'arn:aws:iam::ACCOUNTID:role/AWS-ROLE-NAME-WITH-PERMISSION-TO-ACCESS-REDSHIFT';
let json_mode = 'auto';
   
let copyStatement = [
    'COPY ' + targetTable,
    'FROM ' + quote(s3Path),
    'region ' + quote(region),
    'iam_role ' + quote(role),
    'json ' + quote(json_mode)
].join('\n');
    
pool.query(copyStatement, (err, res) => {
    if (err == undefined) {
        console.log('Data inserted successfully into database');
    } else {
        console.log(err);
    }
        pool.end()
});
