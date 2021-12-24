declare module "*.css" {  //when we import .css files，it will follow the following settings
    const css : {[key: string] : string};
    export default css;
}