import type { InfoFields, InfoDB } from './componentTypes.js';
import { version } from '../../../package.json';
import { getConfig } from '../../diagram-api/diagramAPI.js';
import common from '../common/common.js';
import { setAccTitle, getAccTitle, clear as commonClear } from '../common/commonDb.js';
import type { ComponentNode, ComponentMap } from './componentTypes.js';

const MERMAID_DOM_ID_PREFIX = 'componentId-';

let components = new Map<string, ComponentNode>();

export const DEFAULT_INFO_DB: InfoFields = { version } as const;

export const getVersion = (): string => DEFAULT_INFO_DB.version;

export const db: InfoDB = {
  getVersion,
};

/**
 * Function called by parser when a node definition has been found.
 *
 * @param id - Id of the class to add
 * @param label - Label of the class to add
 * @public
 */
export const addComponent = function (_id: string, _label: string) {
  const id = common.sanitizeText(_id, getConfig());
  const label = common.sanitizeText(_id, getConfig());
  // Only add class if not exists
  if (components.has(_id)) {
    return;
  }
  // alert('Adding class: ' + className);
  // alert('Adding class after: ' + name);
  components.set(id, {
    id: id,
    domId: MERMAID_DOM_ID_PREFIX + id,
    label: label,
    components: [],
    parent: undefined,
  } as ComponentNode);
};

export const clear = function () {
  components = new Map();
  commonClear();
};

export const getComponent = function (id: string): ComponentNode {
  return components.get(id)!;
};

export const getComponents = function (): ComponentMap {
  return components;
};

export default {
  setAccTitle,
  getAccTitle,
  getAccDescription,
  setAccDescription,
  getVersion,
  addComponent,
  clear,
  getComponent,
  getComponents,
};
