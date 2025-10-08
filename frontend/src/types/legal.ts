import { BlocksContent } from "@strapi/blocks-react-renderer";

interface LegalContentData {
  id: number;
  documentId: string;
  content: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PoliticaDePrivacidade {
  data: LegalContentData;
}

export interface TermosECondicoes {
  data: LegalContentData;
}
