/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// jQuery
declare let $: any;

// PatternLock lib
declare let PatternLock: any;

// Leapjs lib
declare let Leap: any;

// Kinetic lib
declare let Kinetic: any;
