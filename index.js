const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.raw({ type: 'application/json' }));

// Browser test - returns 200
app.get('/', (req, res) => {
  res.json({ status: "ok", message: "No data received from camera - proxy is working" });
});

// POST from MOBOTIX camera
app.post('/', async (req, res) => {
  try {
    const targetUrl = 'https://prod.aws.extcare.com/vcr-cloud/external/actions/telesitterAlert';
    const bearerToken = 'eyJjdHkiOiJKV1QiLCJ2ZXJzaW9uSWQiOiJkZTAxM2Q0ZC01YjdkLTQ4NDgtODMwYi1jZTI4ZTQ2ODUxMmEiLCJ0eXBlIjoiZXh0ZXJuYWwiLCJhbGciOiJkaXIiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0In0..WFMd8pccFXstUG36M169RQ.Wa0XEafupGhwVG_nadw4xkUCqJFNCqvtw7FjOf1wLU96zm0C4whfCENJTUSz6E6WPNIHqpYPIyWdxDEV_-c0b9Yxk6q7w4KBVjsRNk3JEHYuHHqOWxRH6nR9lugciTz9omzWPnFfUGj19QcOEV-XHUwWap42YjEloh6Vwc1wOc2xGE2WpFjhfja29hUE8Rn4hUFizYIxp2N9rFiw9FYuCw-6blMUgt8ctqwWhx-P5memGv4qrmkzvhzXkhhQarAY9QUIvWaYmiFLt_BsyD9w6TN9Jmcw4tX0bNH7CJUGL9EOB_ymBlu2Q96XjAwN1RZW8HAiBPwxVR7MEBQ-XL2EYY39NPbPiG4vgDUuZV2EcbOblc1Q_6e3VNVLj-NnZRYi-rq3Em2JoAqDA2KfUHyqRc1zbMLlHP8bGOoftUdcsAggu27x1CkuxvFhB31znfUnWXbDBSFesB6buSVYmx5x8CLID-3BMvvV4lIBpkeSZQuF13LJS7imw1yDQysAXX_8.qlLsUb8Aocl5aeKvI1Q6IymrMdz2NfCS';

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      },
      body: req.body
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: "Proxy failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Proxy running on port ${port}`);
});
