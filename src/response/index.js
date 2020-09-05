exports.success200 = (data, time, req, res) => {
    const ipSource = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];

    const jsonData = {
        statusCode: 200,
        message: data.message,
        responeApi: time,
        token: data.token
    }

    res.json(jsonData);
    res.end();
    console.log(`REQUEST: IP${ipSource}`, req.method, req.url, JSON.stringify(req.method === 'GET' ? req.query : req.body));
    console.log("SUCCESS RESPONE:", JSON.stringify(jsonData));
}

exports.error401 = (message, time, req, res) => {
    const ipSource = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];

    const jsonData = {
        statusCode: 401,
        message: message,
        responeApi: time
    }

    res.status(401).json(jsonData);
    res.end();
    console.log(`REQUEST: IP${ipSource}`, req.method, req.url, JSON.stringify(req.method === 'GET' ? req.query : req.body));
    console.log("SUCCESS RESPONE:", JSON.stringify(jsonData));
}

exports.error403 = (message, time, req, res) => {
    const ipSource = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];

    const jsonData = {
        statusCode: 403,
        message: message,
        responeApi: time
    }

    res.status(403).json(jsonData);
    res.end();
    console.log(`REQUEST: IP${ipSource}`, req.method, req.url, JSON.stringify(req.method === 'GET' ? req.query : req.body));
    console.log("SUCCESS RESPONE:", JSON.stringify(jsonData));
}

exports.error500 = (error, time, req, res) => {
    const ipSource = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress).split(",")[0];

    const jsonData = {
        statusCode: 500,
        message: "Internal server error",
        responeApi: time,
        error: error
    }

    res.status(500).json(jsonData);
    res.end();
    console.log(`REQUEST: IP${ipSource}`, req.method, req.url, JSON.stringify(req.method === 'GET' ? req.query : req.body));
    console.log("SUCCESS RESPONE:", JSON.stringify(jsonData));
}