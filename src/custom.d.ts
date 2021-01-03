declare module '*.txt' {
    const value: string
     export default value
   }
   declare module '*.json' {
     const value: any
     export default value
   }
   declare module '*.b64' {
    const value: string
     export default value
   }
   declare module '*.buf' {
    const value: Uint8Array
     export default value
   }
   declare module "*.css" {
    const content: any;
    export default content;
  }   

  declare module "*.svg" {
    const content: any;
    export default content;
  }