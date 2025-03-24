import express from 'express'
import { initializeDatabase, dbAll, dbGet, dbRun } from './util/database.js'

const app = express()
app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await dbAll("SELECT * FROM users")
    res.status(200).json(users)
})

app.get("/users/:id", async(req, res) => {
    const id = req.params.id
    const user = await dbGet("SELECT * FROM users WHERE id = ?;", [id])
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user)
})

app.use((req, res, next, err) => {
    if(err){
        res.status(500).json({message: `Error ${err.message}`})
    }
})

async function startServer() {
    await initializeDatabase();
    app.listen(3000, () => {
        console.log('Server runs on port 3000')
    })
}
startServer();