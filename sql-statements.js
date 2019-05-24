const { Pool } = require('pg')
const connectionUrl = process.env.DATABASE_URL || `postgresql://postgres:secret@localhost:5432/postgres`
const pool = new Pool({
  connectionString: connectionUrl
})


pool.on('error', (err, client) => {
  console.error('error event on pool', err)
})



  pool.connect((err, client, release) => {
    if (err) {
      console.error('error in connect', err)
    } else {
      client.query(`CREATE TABLE IF NOT EXISTS person (id serial,
        first_name varchar(255), last_name varchar(255), 
        eye_color varchar(255))`, (err, res) => {
         // release()
          if (err) {
            console.error('error in query', err)
          } else {
            //console.log(res.rows)
            client.query(`INSERT INTO person (first_name,last_name,eye_color) 
            VALUES ($1,$2,$3)`, ['James', 'Smith', 'brown'], (err, res) => {
             // release()
              if (err) {
                console.error('error in query', err)
              } else {
                client.query(`INSERT INTO person (first_name,last_name,eye_color) 
                VALUES ($1,$2,$3)`, ['Frank', 'Jones', 'brown'], (err, res) => {
                //  release()
                  if (err) {
                    console.error('error in query', err)
                  } else {
                    client.query(`INSERT INTO person (first_name,last_name,eye_color) 
                    VALUES ($1,$2,$3)`, ['Rebecca', 'Andrews', 'blue'], (err, res) => {
                    //  release()
                      if (err) {
                        console.error('error in query', err)
                      } else {
                        client.query(`UPDATE person
                        SET eye_color=$1
                        WHERE eye_color=$2`, ['blue', 'brown'], (err, res) => {
                          //release()
                          if (err) {
                            console.error('error in query', err)
                          } else {
                            client.query(`SELECT * FROM person
                               WHERE first_name=$1`, ['James'], (err, res) => {
                             release()
                             if (err) {
                               console.error('error in query', err)
                               } else {
                              console.log(res.rows)
                               }
                            })
                          }
                        })
                        
                      }
                    })
                    
                  }
                })
                
              }
            })
          }
        })
    }
  })


 




