export interface FeedState {
  feeds: FeedCollection
  feedMap: FeedMap
}

export interface FeedMap {
  [id: string]: FeedMapValue
}

export interface FeedMapValue {
  id: string
  feedId: string
}

export enum FeedTypeEnum {
  camera,
  urdf,
}

export enum CameraType {
  MJPEG = 'mjpeg',
  PNG = 'png',
  VP8 = 'vp8',
  WEBCAM = 'webcam',
}

export interface FeedCollection {
  [feedId: string]: FeedType
}

export type FeedType = ICameraFeed | IUrdfFeed

interface IFeed {
  type: FeedTypeEnum
  id: string
}

export interface ICameraFeed extends IFeed {
  type: FeedTypeEnum.camera
  id: string
  camera: ICameraData
}

export interface ICameraData {
  name: string
  type: CameraType
  topic: string
}

export interface IUrdfFeed extends IFeed {
  type: FeedTypeEnum.urdf
  id: string
}
