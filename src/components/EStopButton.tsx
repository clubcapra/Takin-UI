import React, { FC, useState } from 'react'
import { Modal } from './common/Modal'
import { Button } from './common/Button'
import { rosClient } from 'utils/ros/rosClient'
import { StyledStopButton } from './EStopButton.styles'
import { useRosSubscribe } from 'utils/hooks/useRosSubscribe'
import { TopicOptions } from 'utils/ros/roslib-ts-client/@types'

const topic: TopicOptions<boolean> = {
  name: 'takin_estop_status',
  messageType: 'std_msgs/Bool',
}

interface StopButtonProps {
  onClick: () => void
}

const StopButton: FC<StopButtonProps> = ({ onClick }) => {
  const [text, setText] = useState('EMERGENCY STOP')

  useRosSubscribe(topic, message => {
    if (message.data) {
      setText('EMERGENCY STOP')
    } else {
      setText('REARM')
    }
  })

  return (
    <StyledStopButton onClick={onClick}>
      <span>{text}</span>
    </StyledStopButton>
  )
}

export const EStopButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const stopRobot = () => {
    rosClient.callService({ name: 'takin_estop_disable', serviceType: '' }, '')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const restartRobot = () => {
    rosClient.callService({ name: 'takin_estop_enable', serviceType: '' }, '')
    closeModal()
  }

  return (
    <>
      <StopButton onClick={stopRobot} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Warning!</h2>
        <p>Robot is currently stopped</p>
        <p>Do you want to restart it?</p>
        <div style={{ display: 'flex' }}>
          <Button onClick={restartRobot} btnType="success">
            Yes
          </Button>
          <Button onClick={closeModal} btnType="danger">
            No
          </Button>
        </div>
      </Modal>
    </>
  )
}
