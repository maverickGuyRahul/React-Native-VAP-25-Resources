import express from 'express';

const app = express();
const PORT = 3000;

app.get('/greetmessage', (req, res) => {
  res.send('<h1> Hello ViMEET !!  </h1>').sendStatus(200);
});

app.post('/login', (req, res) => {
  res
    .send('<h1> POST REQUEST handler working correctly  </h1>')
    .sendStatus(200);
});

app.put('/changeprofile', (req, res) => {
  res.send('<h1> PUT REQUEST handler working correctly  </h1>').sendStatus(200);
});

app.patch('/updateprofile', (req, res) => {
  res
    .send('<h1> PATCH REQUEST handler working correctly  </h1>')
    .sendStatus(200);
});

app.delete('/deleteprofile', (req, res) => {
  res
    .send('<h1> DELETE REQUEST handler working correctly  </h1>')
    .sendStatus(200);
});

app.listen(PORT, (req, res) => {
  console.log(`The server is up and running on Port Number : ${PORT}`);
});
