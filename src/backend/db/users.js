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
  {
    _id: uuid(),
    firstName: "Ganesh",
    lastName: "Matha",
    username: "ganeshmatha",
    password: "ganeshmatha@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "",
  },
  {
    _id: uuid(),
    firstName: "Suresh",
    lastName: "jummala",
    username: "sureshjummala",
    password: "sureshjummala@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    userProfile: "",
  },
];
