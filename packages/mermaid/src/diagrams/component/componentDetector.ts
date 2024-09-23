import type {
  DiagramDetector,
  DiagramLoader,
  ExternalDiagramDefinition,
} from '../../diagram-api/types.js';

const id = 'componentDiagram';

const detector: DiagramDetector = (txt) => {
  return /^\s*componentDiagram/.test(txt);
};

const loader: DiagramLoader = async () => {
  const { diagram } = await import('./componentDiagram.js');
  return { id, diagram };
};

const plugin: ExternalDiagramDefinition = {
  id,
  detector,
  loader,
};

export default plugin;
