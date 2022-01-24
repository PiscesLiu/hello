import { hello } from "../../declarations/hello";

async function post() {
  let post_button = document.getElementById("post");
  let error = document.getElementById("error");
  error.innerText = "";
  post_button.disabled = true;
  let textarea = document.getElementById("message");
  let otp = document.getElementById("otp").value;
  let text = textarea.value;
  try {
    await hello.post(otp, text);
    textarea.value = "";
  } catch (err) {
    console.log(err);
    error.innerText = "Post Failed";
  }
  post_button.disabled = false;
}

var num_posts = 0;

async function load_posts() {
  let posts_section = document.getElementById("posts");
  let posts = await hello.posts();
  if (num_posts == posts.length) return;
  posts_section.replaceChildren([]);
  num_posts = posts.length;
  for (var i = 0; i < posts.length; i++) {
    let post = document.createElement("p");
    // post.innerText = posts[i].content;
    post.innerHTML = "<div style='color:green'>Author:" + posts[i].author + "</div>  <div style='color:green'>Time" + posts[i].time + "</div> <div style='color:green'>Content:" + posts[i].content + "</div>";

    post.innerHTML = "<div><div class='blogmeta'>Time: " + posts[i].time + ", Authored By: " + posts[i].author + "</div><div class='blog'>" + posts[i].content + "</div></div>";
    // <div><div class="blogmeta">Time: 8:58:39 AM, Authored By: Troy </div><div class="blog">First post</div></div>
    posts_section.appendChild(post);
  }
}

var num_follows = 0;

async function load_follows() {
  let follows_section = document.getElementById("follows");
  let follows = await hello.follows();
  if (num_follows == follows.length) return;
  follows_section.replaceChildren([]);
  num_follows = follows.length;
  for (var i = 0; i < follows.length; i++) {
    let follow = document.createElement("f");
    follow.innerHTML = "<div>" + follows[i].id + ", Name: " + "<button>" + follows[i].name; + "</button> </div>";
    let id = follows[i].id;
    follow.onclick = function () {
      followPost(id);
    }
    follows_section.appendChild(follow);
  }
}

var num_timeline = 0;

async function load_timeline() {
  let timeline_section = document.getElementById("timeline");
  let timelines = await hello.timeline();
  if (num_timeline == timelines.length) return;
  timeline_section.replaceChildren([]);
  num_timeline = timelines.length;
  for (var i = 0; i < timelines.length; i++) {
    let timeline = document.createElement("t");
    timeline.innerHTML = "<div><div class='blogmeta'>Time: " + timelines[i].time + ", Authored By: " + timelines[i].author + "</div><div class='blog'>" + timelines[i].content + "</div></div>";
    timeline_section.appendChild(timeline);
  }
}

async function followPost(id) {
  let followPosts_section = document.getElementById("followPosts");
  followPosts_section.replaceChildren([]);
  try {
    let posts = await hello.followPosts(id);
    for (var i = 0; i < posts.length; i++) {
      let followPosts = document.createElement("fp");
      // let timeTemp = Math.round(posts[i].time/100000000);
      // console.log(timeTemp)
      // let time = formatDate(timeTemp);
      followPosts.innerHTML = "<div><div class='blogmeta'>Time: " + posts[i].time + ", Authored By: " + posts[i].author + "</div><div class='blog'>" + posts[i].content + "</div></div>";
      followPosts_section.appendChild(followPosts);
    }
  } catch (error) {
    console.log(error);
    followPosts_section.innerText = "Query Failed";
  }
}

function formatDate(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

function load() {
  let post_button = document.getElementById("post");
  post_button.onclick = post;
  load_posts();
  load_follows();
  load_timeline();
  setInterval(load_posts, 3000)
}

window.onload = load