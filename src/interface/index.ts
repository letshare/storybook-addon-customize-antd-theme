export interface ArgType {
    value: string;
    name: string;
    desc?: string;
    type?: string;
    category?: string;
    select?: string[];
}

export interface ArgTypes {
  [key: string]: ArgType
}

export type Args = {
  [key: string]: any
}
