import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: 1,
    content:
      "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "rameshboddula",
    firstname: "Ramesh",
    lastname: "Boddula",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        username: "pawankalyan",
        text: "Truth Bomb💣",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Kiran",
        text: "Can't agree more..💯",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    userImage: "",
  },
  {
    _id: 2,
    content:
      "Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "saibharath",
    firstname: "Sai",
    lastname: "Bharath",

    comments: [
      {
        _id: uuid(),
        username: "Kishan",
        text: "I believe",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "ammakutti",
        text: "bharath's Preachings 😂😂",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
  },
  {
    _id: 3,
    content:
      "You can't cross the sea merely by standing and staring at the water.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstname: "Saiie",
    lastname: "Kumar",
    username: "saikumar",

    comments: [
      {
        _id: uuid(),
        username: "raju",
        text: "Courage is everything!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Charu",
        text: "Sometimes staying back is the best thing one can do 😏",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
  },
  {
    _id: 4,
    content:
      "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstname: "Chinna",
    lastname: "Prabha",
    username: "chinnaprabha",
    comments: [
      {
        _id: uuid(),
        username: "Pradeep",
        text: "Failure is your life-long teacher",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Keerthi",
        text: "NEVER EVER GIVE UP!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
  },
  {
    _id: 5,
    content:
      "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    firstname: "Kotesh",
    lastname: "Mudila",
    username: "koteshmudila",
    comments: [
      {
        _id: uuid(),
        username: "Prakhar",
        text: "Failure is your life-long teacher",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
      {
        _id: uuid(),
        username: "Charu",
        text: "NEVER EVER GIVE UP!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
  },
];
