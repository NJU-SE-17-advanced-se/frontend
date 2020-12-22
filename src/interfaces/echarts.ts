/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface EchartsItemNode {
  dataType: "node";
  dataItem: number;
  data: EchartsNode;
}

export interface EchartsItemEdge {
  dataType: "edge";
  dataItem: number;
  data: EchartsLink;
}

export interface EchartsNode {
  id: string;
  name: string;
  symbolSize: number;
  value: number;
  [key: string]: unknown;
}

export interface EchartsLink {
  source: string;
  target: string;
  value: number;
  [key: string]: any;
}
