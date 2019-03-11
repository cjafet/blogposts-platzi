const AWS = require('aws-sdk');
var s3 = new AWS.S3();
const fetch = require('node-fetch');
let count = 0;
var today = new Date();

var params = {
    Bucket: "cjafet/platzi", 
    Key: "products.json"
};

 s3.getObject(params, function(err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        //console.log(data.Body.toString('utf-8'));
        obj = JSON.parse(data.Body.toString('utf-8'));
        console.log(obj);
        
        for (var i = 0; i < 1; i++) {                                               
            callApi(obj[i]).then(res => {
                console.log(res);
            });
            console.log('end of call');
        }


        // TO POST DATA TO A ES DB WE NEED TO CONSTRCUT OUR URL IN THE FOLLOWING FORMAT
        // url = host/index/type
        function callApi(product) {
            console.log(product);
            // JSON.stringify(product)
            product_obj = JSON.stringify(product);
            console.log(product_obj);
            return fetch('https://endpoint.region.es.amazonaws.com:443/nameof-your-index/doc-type', { method: 'POST', body: product_obj, headers: { 'Content-Type': 'application/json' } })
                .then(res => { 
                    return res.json();
                }).catch( err => {
                    console.log(err);
                });
        }
    }    
 });
