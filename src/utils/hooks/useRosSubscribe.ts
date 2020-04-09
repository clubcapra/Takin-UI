import { rosClient } from 'utils/ros/rosClient'
import { useEffect } from 'react'
import { TopicOptions } from 'utils/ros/roslib-ts-client/@types'
import { useService } from '@xstate/react'
import { rosService } from 'state/ros'

/**
 * Subscribes to a specified topic
 * The callback will be called everytime a topic receives new data
 *
 * This will automatically unsubscribe when the component is unmounted
 */
export const useRosSubscribe = <R>(
  topic: TopicOptions<R>,
  callback: (message: { data: R }) => void
) => {
  const [state] = useService(rosService)

  useEffect(() => {
    if (state.matches('connected')) {
      rosClient.subscribe(topic, callback)
      return rosClient.unsubscribe(topic)
    }
  }, [callback, state, topic])
}
