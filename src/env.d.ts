/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="webpack/module" />
/// <reference types="chrome-types" />
declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.module.css' {
  const content: any
  export default content
}
