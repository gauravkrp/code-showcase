let headers = { 'X-Api-Key': 'd5966107b636eb3b4ace8e9bfd3de7e6', 'X-Auth-Token': 'e5af69091ee2796ba5c506529b651ae7', "Content-Type": "application/json" }
//let headers = { 'X-Api-Key': 'test_d3c3b4b2dbd36433a74d84e80b5', 'X-Auth-Token': 'test_5413a408461910a561a17271e06', "Content-Type": "application/json" }

// https://test.instamojo.com/api/1.1/
// https://www.instamojo.com/api/1.1/

export default async (req:any, res:any) => {
  if (req.method === 'POST' && req.body) {
    await fetch('https://www.instamojo.com/api/1.1/payment-requests/', {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      body: req.body,
      redirect: 'follow'
    }).then(response => {
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data)
      res.status(200).json(data)
    }).catch(error => {
      console.log(error)
      res.status(401).json(error)
    })
  } else {
    res.status(405).end() //Method Not Allowed
  }
}