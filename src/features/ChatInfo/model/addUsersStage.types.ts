import { ChatInfoTypes, StageChatInfo } from './chatInfo.types';

export interface IAddUsersStage extends ChatInfoTypes {
  switchStage: (stage: StageChatInfo) => void;
}
