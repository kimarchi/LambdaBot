/**
 * A Lambda function that chat a message
 */
 const https = require('https')
 const URL = require('url')


 async function request(url, data) {
    return new Promise((resolve, reject) => {
        let req = https.request(URL.parse(url))
        req.write(data)
        req.end(null, null, () => {
            /* Request has been fully sent */
            resolve(req)
        })
    })
}
  
// 0. get urls from evn var
// 0. get app key
// 0. get bot id


exports.handler = async () => {
    // If you change this message, you will need to change hello-from-lambda.test.js
    const message = 'Hello from Lambda!';

    // All log statements are written to CloudWatch
    console.info(`${message}`);

    // - 초대 메시지를 먼저 확인(BotSystem/messages)
	// - 있으면 방에 입장(v1/bots/{botId}/rooms/{roomId}
    // - 입장한 채팅방을 얻어온다(나눠서 /v1/bots/{botId}/rooms


    
    return message;
}

// POST 전용과 GET 용으로 나눠서 만들어두고 나중에 리펙토링 하자
const HttpPostAsync = async(url, body) => {
    console.log(`HttpRequestAsync url=${url}, body=${body}`);
      return new Promise((resolve, reject) => {
      const postData = JSON.stringify(body);
      const contentLength = Buffer.byteLength(postData);
      url += `/?botId=${process.env.BOT_ID}`; // #refactoring     
      console.log('url=',url);
      // make a option
     const options = {method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': contentLength,
                        'x-auth-user': 'LambdaBot', // #refactoring
                        'x-auth-token': process.env.BOT_ACCESS_TOKEN, // #refactoring
                      },
     };
      console.log('options:', options);
      // create request
      const req = https.request(url, options, (res) => {
          let body = '';
          let statusCode = res.statusCode;
          console.log('Headers:', JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', (chunk) => body += chunk);
          res.on('end', () => {
              console.log('Successfully processed HTTPS response');
              // If we know it's JSON, parse it
              if (res.headers['content-type'] === 'application/json') {
                  body = JSON.parse(body);
              }
              res.body = body;
              console.log('body : ', body);
              
              resolve(res);
          });
      });
      req.on('error', (e) => {
          console.error('request error : ' + e); 
          reject(e);
      });
      // Write data to request body
      req.write(postData);
      console.log(`HttpPostAsync write postData=${postData}`);
      req.end();
      return req;
    });
  };

// POST 전용과 GET 용으로 나눠서 만들어두고 나중에 리펙토링 하자
const HttpGetAsync = async(url) => {
    console.log(`HttpRequestAsync url=${url}, body=${body}`);
      return new Promise((resolve, reject) => {
      const postData = JSON.stringify(body);
      const contentLength = Buffer.byteLength(postData);
      url += `/?botId=${process.env.BOT_ID}`; // #refactoring     
      console.log('url=',url);
      // make a option
     const options = {method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': contentLength,
                        'x-auth-user': 'LambdaBot', // #refactoring
                        'x-auth-token': process.env.BOT_ACCESS_TOKEN, // #refactoring
                      },
     };
      console.log('options:', options);
      // create request
      const req = https.request(url, options, (res) => {
          let body = '';
          let statusCode = res.statusCode;
          console.log('Headers:', JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', (chunk) => body += chunk);
          res.on('end', () => {
              console.log('Successfully processed HTTPS response');
              // If we know it's JSON, parse it
              if (res.headers['content-type'] === 'application/json') {
                  body = JSON.parse(body);
              }
              res.body = body;
              console.log('body : ', body);
              
              resolve(res);
          });
      });
      req.on('error', (e) => {
          console.error('request error : ' + e); 
          reject(e);
      });
      // Write data to request body
      req.write(postData);
      console.log(`HttpPostAsync write postData=${postData}`);
      req.end();
      return req;
    });
  };
