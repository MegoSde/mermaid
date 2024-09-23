import type { DiagramDB } from '../../diagram-api/types.js';

export interface ComponentNode {
  id: string;
  domId: string;
  label: string;
  components: ComponentNode[];
  parent?: ComponentNode;
}

export interface InfoFields {
  version: string;
}

export interface InfoDB extends DiagramDB {
  getVersion: () => string;
}

export type ComponentMap = Map<string, ComponentNode>;
