import React, { FC } from 'react'
import { Feed } from 'components/Feed/Feed'
import { useControl } from 'utils/hooks/useControl'

export const Teleop: FC = () => {
  useControl('flipper')
  return <Feed id="teleop_main" defaultFeed="camera_3d_rgb" />
}
