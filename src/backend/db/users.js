import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "koteshmudila",
    firstname: "Kotesh",
    lastname: "Mudila",
    username: "koteshmudila",
    password: "koteshmudila@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "https://avatars.githubusercontent.com/u/69259490?v=4",
    bio: "",
    website: "",
  },
  {
    _id: "saibharath",
    firstname: "Sai",
    lastname: "Bharath",
    username: "saibharath",
    password: "saibharath@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
    bio: "",
    website: "",
  },
  {
    _id: "saikumar",
    firstname: "Saiie",
    lastname: "Kumar",
    username: "saikumar",
    password: "saikumar@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
    bio: "",
    website: "",
  },
  {
    _id: "chinnaprabha",
    firstname: "Chinna",
    lastname: "Prabha",
    username: "chinnaprabha",
    password: "chinnaprabha@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
    bio: "",
    website: "",
  },
  {
    _id: "rameshboddula",
    firstname: "Ramesh",
    lastname: "Boddula",
    username: "rameshboddula",
    password: "rameshboddula@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userImage: "",
    bio: "",
    website: "",
  },
];
