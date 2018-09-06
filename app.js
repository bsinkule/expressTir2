const express = require('express')
const app = express()
const data = require('./data.json')
const cors = require('cors')
const port = process.env.PORT || 5000
const listener = () => `Listening on port ${port}!`

app.use(cors())

function findById(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === +id) {
            return data[i]
        }
    }
}

app.get('/', (req, res, next) => {
    res.json({ data: data })
})

app.get('/:id', (req, res, next) => {
    const item = findById(req.params.id)

    if (item) {
        return res.json({ data: item })
    } else {
        return res.status(404).json({
            error: {
                message: 'No record found!'
            }
        })
    }
})

app.listen(port, listener)
