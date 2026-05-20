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
    const targetUrl = 'https://cloud01.extcare.stagrp.com/vcr-cloud/external/actions/telesitterAlert';
    const bearerToken = 'eyJjdHkiOiJKV1QiLCJ2ZXJzaW9uSWQiOiJkOWE0ZDdiZi1kMDE0LTRhNmQtYjU4ZC1lZTE5MWZmMGRjMjEiLCJ0eXBlIjoiZXh0ZXJuYWwiLCJhbGciOiJkaXIiLCJlbmMiOiJBMTkyQ0JDLUhTMzg0In0..1CG-dDk0g3Tl-IyZMi8JoA.NWOWsCJvA-K_bG-AC6zYHoq5RpMbZERN4iUyfy8mKVZmjrRyC4sK776-UXF4rEPKhSY2GR0bDiVK7Rlqeoxl12IlpCYR1_KlJ8TjGln_3tcoYghL-Ck2gBsl31ZXmGEIjajiX11TDsQT9Yr7YSRyqOsJrvIi1BR9vjrwVkIcO60hgor4F1GDeoW7etJcEGY3074z7Z3ruHAmyuc9ljpvo1peKtvNbigeJzr7_uIyVe_9vMvk8ko_DDwvThFYI_BsKSId7g0tWd_63e5meKnc-wqdO0YTMqlntoN248cEED65AJHhfT7t6jTwH2r_5sEeUKw6FSi3j7YZh3-e2V9FT3iS8RRY30NydPMtExlFGwokiI-16gwO8IVg-OHLojjOzBaPitOsho5tqQ3K_bW-TVCaaKEhAJBz3A5EjIcp6B39UptYDiLUY_0Ffyf1OgkFSwIBz6ZJ3YlkUnAQfxbu7Lm4ZpndwfbvaC1Rs58-x6L51hf_myIpqhCB9ts7XE.x-YJYdDb_KiM7kzXTCJNc3D-geEWdob6';

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
