const request = require('request')
const functions = require('firebase-functions')

module.exports = function (phone, message) {
  return new Promise((resolve, reject) => {
    const body = {
      "sender": "DHIYOA",
      "route": "4",
      "country": "91",
      "sms": [
        {
          "message": `Your OTP is ${message}`,
          "to": [phone]
        }
      ]
    }

    const options = {
      headers: {
        'authkey': functions.config().msg91.authkey,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      url: 'https://api.msg91.com/api/v2/sendsms?country=91',
      body: body,
      json: true
    }

    request(options, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve('SMS Sent Successfully')
      }
    })
  })
}