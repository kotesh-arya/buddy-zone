import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Kotesh",
    lastName: "Mudila",
    username: "koteshmudila",
    password: "koteshmudila@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "https://avatars.githubusercontent.com/u/69259490?v=4",
  },
  {
    _id: uuid(),
    firstName: "Sai",
    lastName: "Bharath",
    username: "saibharath",
    password: "saibharath@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "",
  },
  {
    _id: uuid(),
    firstName: "Saiie",
    lastName: "Kumar",
    username: "saikumar",
    password: "saikumar@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "",
  },
  {
    _id: uuid(),
    firstName: "Chinna",
    lastName: "Prabha",
    username: "chinnaprabha",
    password: "chinnaprabha@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "",
  },
  {
    _id: uuid(),
    firstName: "Ramesh",
    lastName: "Boddula",
    username: "rameshboddula",
    password: "rameshboddula@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "",
  },
];
