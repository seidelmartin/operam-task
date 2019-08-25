import * as express from 'express'
import { getTreeHandler } from './request-handler/get-tree'

const app = express()

app
  .get('/tree', getTreeHandler)

app.listen(3001, () => {
  console.log('Server running on port 3001')
})
