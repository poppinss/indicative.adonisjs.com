const EventSource = require('eventsource')
const events = new EventSource(process.env.WEBHOOK_PROXY_URL)
const crypto = require('crypto')

events.reconnectInterval = 0

events.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  const checksum = message['x-hub-signature']

  console.log(message.body)
  console.log({ checksum })

  const hmac = crypto.createHmac('sha1', process.env.GH_SECRET)
  const digest = 'sha1=' + hmac.update(JSON.stringify(message.body)).digest('hex')
  console.log({ digest })

  if (!digest || !checksum || checksum !== digest) {
    console.log('Untrusted packet')
    return
  }

  console.log(message.body.ref)
})

events.addEventListener('open', () => {
  console.log('Ready')
})

events.addEventListener('error', (error) => {
  console.error(error)
})
