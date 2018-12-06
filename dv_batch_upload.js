const request = require('superagent');
const fs = require('fs');
const path = require('path');

var args = process.argv.slice(2);
var doc_dir = args[0];

const btoa = Buffer.from(process.env.API_TOKEN + ":" + process.env.API_SECRET).toString('base64');

async function finalize(scan_ref) {
    try {
        var res = await request.put('https://acquisition.netverify.com/api/netverify/v2/acquisitions/'+ scan_ref)
            .set('Authorization', 'Basic ' + btoa)
            .set('Accept', 'application/json')
            .set('User-Agent', 'DV Batch/1.0')
            ;

        console.log(res.body);
    } catch (error) {
        console.log(error);
    }
}

async function upload(scan_ref, filename) {
    try {
        var file = fs.readFileSync(path.join(doc_dir, filename));
        var buf = Buffer.from(file);

        let res = await request.post('https://acquisition.netverify.com/api/netverify/v2/acquisitions/'+ scan_ref + '/document')
            .set('Authorization', 'Basic ' + btoa)
            .set('Accept', 'application/json')
            .set('User-Agent', 'DV Batch/1.0')
            .attach('', buf, {filename: filename})
            ;

        console.log(res.body);

        finalize(scan_ref);
    } catch (error) {
        console.log(error);
    }
}

async function initiate(filename) {
    try {
        var res = await request.post('https://acquisition.netverify.com/api/netverify/v2/acquisitions')
            .set('Authorization', 'Basic ' + btoa)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('User-Agent', 'DV Batch/1.0')
            .send(
                {
                    // type: "CUSTOM",
                    // customDocumentCode: "ALL",
                    type: "BS",
                    country: "USA",
                    merchantScanReference: "Remediation",
                    customerId: filename.split('.').slice(0, -1).join('.'),
                    enableExtraction: "true"
                }
            )
            ;

        console.log(res.body);

        upload(res.body.scanReference, filename);
    } catch (error) {
        console.log(error);
    }
}

fs.readdir(doc_dir, function(err, items) {
    for (var ii = 0; ii < items.length; ii++) {
        var filename = items[ii];
        console.log(filename);
        setTimeout(initiate, 5000*ii, filename); 
    }
});
