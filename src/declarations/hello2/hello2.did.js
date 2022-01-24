export const idlFactory = ({ IDL }) => {
  const Author = IDL.Record({ 'id' : IDL.Principal, 'name' : IDL.Text });
  const Time = IDL.Int;
  const Message = IDL.Record({
    'content' : IDL.Text,
    'time' : Time,
    'author' : IDL.Text,
  });
  return IDL.Service({
    'follow' : IDL.Func([IDL.Principal], [], []),
    'follows' : IDL.Func([], [IDL.Vec(Author)], ['query']),
    'get_name' : IDL.Func([], [IDL.Text], []),
    'post' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'posts' : IDL.Func([], [IDL.Vec(Message)], ['query']),
    'posts1' : IDL.Func([Time], [IDL.Vec(Message)], ['query']),
    'set_name' : IDL.Func([IDL.Text], [], []),
    'timeline' : IDL.Func([], [IDL.Vec(Message)], []),
    'timeline1' : IDL.Func([Time], [IDL.Vec(Message)], []),
  });
};
export const init = ({ IDL }) => { return []; };
