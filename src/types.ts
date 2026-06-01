export type BlockType = 'text' | 'dashboard' | 'table' | 'kanban' | 'map' | 'radar' | 'budget_variance' | 'composite' | 'code' | 'chart' | 'stat';

export interface UIComponent {
  id: string;
  type: BlockType;
  title?: string;
  data?: any;
  layout?: string; // e.g. for grid placement
  language?: string;
}

export interface ChatMessage {
  id: string;
  prompt: string;
  response: {
    type: BlockType;
    data?: any;
    text?: string;
    title?: string;
    components?: UIComponent[];
  };
  timestamp: Date;
}
