/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Item {
  name: string;
  comments: string[];
  active: boolean;
}
