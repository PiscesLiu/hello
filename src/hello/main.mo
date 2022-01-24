import Iter "mo:base/Iter";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Int "mo:base/Int";

actor {
    public type Message = {
        content :Text;
        time : Time.Time;
        author :Text;
    };

    public type Author =  {
        id : Principal;
        name : Text;
    };

    public type Microblog = actor {
        follow :shared(Principal) -> async();
        follows : shared query () -> async [Author];
        post : shared (Text) -> async();
        posts1 : shared query (Time.Time) -> async [Message];
        posts : shared query () -> async [Message];
        timeline1 : shared (Time.Time) -> async [Message];
        timeline : shared () -> async [Message];
        set_name : shared (Text) -> async();
        get_name : shared () -> async Text;
    };
 
    stable var myname :Text = "";
    
    public shared func set_name(name: Text) : async () {
        myname := name;
    };

    public shared func get_name() : async Text {
        return myname;
    };

    stable var followed : List.List<Author> = List.nil();

    public shared func follow(id : Principal) : async () {
        let canister : Microblog = actor (Principal.toText(id));
        let author : Author = do {
            var name_1 = await canister.get_name();
            {
                id = id;
                name = name_1;
            }
        };
        followed := List.push(author, followed);
    };

    public shared query func follows () : async [Author] {
        List.toArray(followed);
    };

    stable var messages : List.List<Message> = List.nil();

    public shared (msg) func post(otp : Text,text : Text) :async () {
        // assert(Principal.toText(msg.caller) == "hboae-eawdk-6empe-gmcof-h5t4b-advjl-zpas4-avyhm-ltsfd-aiht7-yqe");
        assert(otp == "7890");
        let message : Message = do {
            var content = text;
            var time = Time.now();
            {
                content = content;
                time = time;
                author = myname;
            }
        };
        messages := List.push(message, messages);
        // for (msg in Iter.fromList(messages)) {
        //     Debug.print(msg.info # Int.toText(msg.time));
        // };
    };

    public shared query func posts1(since: Time.Time) : async [Message] {
        var all : List.List<Message> = List.nil();
        for (msg in Iter.fromList(messages)) {
            if (since < msg.time) {
                all := List.push(msg, all);
            };
        };
        List.toArray(all);
    };

    public shared query func posts() : async [Message] {
        List.toArray(messages);
    };

    public shared func timeline1 (since: Time.Time) : async [Message] {
        var all : List.List<Message> = List.nil();
        for (id in Iter.fromList(followed)) {
            let canister : Microblog = actor (Principal.toText(id.id));
            let msgs = await canister.posts1(since);
            for (msg in Iter.fromArray(msgs)) {
                all := List.push(msg, all);
            };
        };
        List.toArray(all);
    };
    public shared func timeline () : async [Message] {
        var all : List.List<Message> = List.nil();
        for (id in Iter.fromList(followed)) {
            let canister : Microblog = actor (Principal.toText(id.id));
            let msgs = await canister.posts();
            for (msg in Iter.fromArray(msgs)) {
                all := List.push(msg, all);
            };
        };
        List.toArray(all);
    };

    public shared func followPosts (id : Principal) : async [Message] {
        var all : List.List<Message> = List.nil();
        let canister : Microblog = actor (Principal.toText(id));
            let msgs = await canister.posts();
            for (msg in Iter.fromArray(msgs)) {
                all := List.push(msg, all);
            };
        List.toArray(all);
    };
};