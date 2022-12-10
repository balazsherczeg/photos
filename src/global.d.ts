declare module '*.jpg' {
  export default '' as string;
}
declare module '*.png' {
  export default '' as string;
}

declare module '*.yaml' {
  const data: never;
  export default data;
}

// fix typescript error of not being able to import svgs has react components
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
