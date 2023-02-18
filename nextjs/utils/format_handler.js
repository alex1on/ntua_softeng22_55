const converter = require('json-2-csv')

export default function format_handler(format, rows, filename, res) {
    // In case of csv format, we set the HTTP headers accordingly
    // so it can send a .csv file with the questionnaire to the 
    // user. 

    // rows is the json object that will be converted to .csv file. 
    // In our API rows is usually the result of query on our DB.
    if (format == 'csv') { // csv type is returned only when the format in the http
                           // query is specified as csv. In case the format is not 
                           // specified or is specified as json a json object is 
                           // return. In any other case, a code 400 is sent to 
                           // inticate a Bad Request.
        converter
            .json2csvAsync(rows)
            .then(csv => {
                res.status(200)
                    .set({
                        'Content-Type': 'text/csv',
                        'Content-Disposition': `attachment; filename="` + filename + `.csv"`
                    })
                    .send(csv)
            })
            .catch(err => console.log(err))
    }
    else if (format == 'json' || format == null) {
        res.status(200).json({
            questionnaire: rows
        })
    }
    else {
        res.status(400).json({
            status: 'failed',
            message: 'Incorrect format type.'
        })
    }
}