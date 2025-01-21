/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="webpack/module" />

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.module.css' {
  const content: any
  export default content
}

declare module '*.scss' {
  const content: any
  export default content
}
