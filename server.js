// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.get('/api/timestamp', (req, res) => {
  var date = new Date();
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
})

// app.get('/api/timestamp/:date_string', (req, res) => {
//   let param = req.params.date_string;
//   var date = new Date(param);
//   let checkDate = date.toUTCString()
  
//   if(checkDate === 'Invalid Date') {
//     date = new Date(param*1000)
//     if(date.toUTCString() === 'Invalid Date') {
//       return res.json({"error": "Invalid Date" })
//     } else {
//       return res.json({"unix": date.getTime(), "utc" : date.toUTCString()})
//     }
    
//   }
//   res.json({"unix": date.getTime(), "utc": date.toUTCString()})
   
    
  
  
// })

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  
  if (/\d{5,}/.test(dateString)) {
    var dateInt = parseInt(dateString);
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  }

  let dateObject = new Date(dateString);

  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invaid Date" });
  } else {
    res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
