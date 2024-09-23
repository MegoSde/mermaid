import type { DiagramDefinition } from '../../diagram-api/types.js';
// @ts-ignore: JISON doesn't support type
import parser from './parser/componentDiagram.jison';
import db from './componentDb.js';
import renderer from './componentRenderer.js';

export const diagram: DiagramDefinition = {
  parser,
  db,
  renderer,
};
