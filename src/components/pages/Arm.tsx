import React, { FC } from 'react'
import { Feed } from 'components/Feed/Feed'
import { useControl } from 'utils/hooks/useControl'

export const Arm: FC = () => {
  useControl('arm')
  return <Feed id="arm_main" defaultFeed="camera_3d_rgb" />
}
