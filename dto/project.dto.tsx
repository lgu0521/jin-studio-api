import { Timestamp } from "firebase/firestore";
import { ImageStoreageDTO, ImageStoreageWithOrderDTO } from "./image-storage.dto";
import { ProjectContentDTO } from "./project-content.dto";

export interface ProjectDTO extends ProjectSimpleDTO {
  content: ProjectContentItemDTO[];
  datetime: Timestamp;
}

export type ProjectSimpleDTO = {
  id: string;
  title: string;
  catagory: string;
  thumbnail: ImageStoreageDTO;
};

export type ProjectContentItemDTO = {
  type: string;
  order: number;
  item: ImageStoreageWithOrderDTO[] | ProjectContentDTO | ImageStoreageDTO;
};

export type NoticeDetailDTO = {
  id: string;
  title: string;
  content: string;
  datetime: Timestamp;
  isNotice: boolean;
};
