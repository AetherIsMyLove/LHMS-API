(async () => {
  const axios = require('axios')
  const express = require('express')
  const app = express()
  const port = 3000
     
function capitalizeFLetter(input) {
         
          let string = input;
           
          return string.replace(/^./, string[0].toUpperCase());
        }

  
  function removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }
   app.get('/api',(req,res) => {
     res.json({content: 'Please Enter A Name'})
   })
  app.get('/api/:name', async (req, res) => {
    const uid = await axios.get(`https://lhms.fandom.com/vi/api.php?action=query&titles=${req.params.name}&indexpageids=&format=json`)
    const data = await axios.get(`https://lhms.fandom.com/vi/api.php?action=query&prop=extracts&titles=${req.params.name}&rvprop=content&format=json#parse`)
    const id = uid.data.query.pageids[0].toString()
    console.log(id)
    if (id < 0) {
      res.json({ content: 'Invalid Data' })
    }
    else {
      res.json({
        content: removeTags(data.data.query.pages[id].extract)
      })
    }

  })



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()
