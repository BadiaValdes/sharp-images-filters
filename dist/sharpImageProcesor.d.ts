/// <reference types="node" />
import * as fileS from 'fs';
import { sharpColorOptions, sharpChannelOptions, sharpImageOptions, sharpImageOperations } from './interfaces';
export declare function readFilePassedBy(imagePath: any): fileS.ReadStream;
export declare function setSharpColorOptions(sharp: any, colorOptions: sharpColorOptions): any;
export declare function setSharpChannelOptions(sharp: any, channelsOptions: sharpChannelOptions): any;
export declare function setSharpImageOperation(sharp: any, options: sharpImageOperations): any;
export declare function createSharpFilter(options?: sharpImageOptions, optionsImageOperations?: sharpImageOperations, optionsChannelOperations?: sharpChannelOptions, optionsColorOperations?: sharpColorOptions): any;
export declare function sharpImageProcess(imagePath: string, name: any, res: any, options?: sharpImageOptions, optionsImageOperations?: sharpImageOperations, optionsColorOperations?: sharpColorOptions, optionsChannelOperations?: sharpChannelOptions): Promise<void>;
