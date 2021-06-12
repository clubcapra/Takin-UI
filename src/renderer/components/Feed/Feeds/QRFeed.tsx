import React, { FC } from 'react'
import { useRosSubscribe } from '@/renderer/utils/hooks/useRosSubscribe'
import { TopicOptions } from '@/renderer/utils/ros/roslib-ts-client/@types'

const topic: TopicOptions<string> = {
  name: 'visp',
  messageType: 'std_msgs/String',
}

const message_set = new Set<string>()
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')
message_set.add('QR_message')

export const QrFeed: FC = () => {
  useRosSubscribe(topic, ({ data }) => {
    console.log('Received QR message: ', data)
    message_set.add(data)
  })

  return (
    <div>
      <ol>
        {[...message_set].map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ol>
    </div>
  )
}
