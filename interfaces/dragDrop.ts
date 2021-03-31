export interface SourceInterface {
  droppableId: string,
  index: number,
}

export interface DestinationInterface {
  droppableId: string,
  index: number,
}

export interface StartInterface {
  source: SourceInterface,
}

export interface ResultInterface {
  source: SourceInterface,
  destination: DestinationInterface,
}
