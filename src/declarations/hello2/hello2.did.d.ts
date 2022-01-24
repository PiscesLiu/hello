import type { Principal } from '@dfinity/principal';
export interface Author { 'id' : Principal, 'name' : string }
export interface Message {
  'content' : string,
  'time' : Time,
  'author' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'follow' : (arg_0: Principal) => Promise<undefined>,
  'follows' : () => Promise<Array<Author>>,
  'get_name' : () => Promise<string>,
  'post' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'posts' : () => Promise<Array<Message>>,
  'posts1' : (arg_0: Time) => Promise<Array<Message>>,
  'set_name' : (arg_0: string) => Promise<undefined>,
  'timeline' : () => Promise<Array<Message>>,
  'timeline1' : (arg_0: Time) => Promise<Array<Message>>,
}
