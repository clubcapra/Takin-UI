import React, { useEffect, FC } from 'react'
import { rosClient } from '@/renderer/utils/ros/rosClient'
import { TopicOptions } from '@/renderer/utils/ros/roslib-ts-client/@types'

const audioTopic: TopicOptions<Uint8Array> = {
  name: '/audio/audio',
  messageType: 'audio_common_msgs/AudioData',
}

export const Audio: FC = () => {
  useEffect(() => {
    const init = async () => {
      // TODO move devices to store
      // TODO selectDeviceId from store

      const devices = await navigator.mediaDevices.enumerateDevices()

      const inputDevices = devices.filter((d) => d.kind === 'audioinput')

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: inputDevices[0].deviceId,
        },
      })

      const context = new AudioContext()
      const source = context.createMediaStreamSource(stream)
      const processor = context.createScriptProcessor(256, 1, 1)

      source.connect(processor)
      processor.connect(context.destination)

      processor.onaudioprocess = (e) => {
        const channelData = e.inputBuffer.getChannelData(0)
        rosClient.publish(
          audioTopic,
          new Uint8Array(
            channelData.map((x) => Math.round(((x + 1) / 2) * 255))
          )
        )
      }
    }

    void init()
  }, [])

  return (
    <>
      <audio />
    </>
  )
}
