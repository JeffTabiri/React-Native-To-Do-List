const categoryImageMap: { [key: string]: string } = {
  Food: require("../assets/images/categories/Food.jpg"),
  Sport: require("../assets/images/categories/Sport.jpg"),
  Travel: require("../assets/images/categories/Travel.jpg"),
  Finance: require("../assets/images/categories/Finance.jpg"),
  Transport: require("../assets/images/categories/Transport.jpg"),
  Books: require("../assets/images/categories/Books.jpg"),
  Shopping: require("../assets/images/categories/Shopping.jpg"),
  Health: require("../assets/images/categories/Health.jpg"),
  Education: require("../assets/images/categories/School.jpg"),
  Technology: require("../assets/images/categories/Techno.jpg"),
  Entertainment: require("../assets/images/categories/Entertainment.jpg"),
};

export enum CategoryIcon {
  Food = "fastfood",
  Sport = "sports-football",
  Travel = "flight",
  Finance = "attach-money",
  Transport = "commute",
  Books = "book",
  Shopping = "shopping-cart",
  Health = "local-hospital",
  Education = "school",
  Technology = "memory",
  Entertainment = "theater-comedy",
}

export const categories = [
  { name: "Food", value: "Food", icon: CategoryIcon.Food },
  { name: "Sport", value: "Sport", icon: CategoryIcon.Sport },
  { name: "Travel", value: "Travel", icon: CategoryIcon.Travel },
  { name: "Finance", value: "Finance", icon: CategoryIcon.Finance },
  { name: "Transport", value: "Transport", icon: CategoryIcon.Transport },
  { name: "Books", value: "Books", icon: CategoryIcon.Books },
  { name: "Shopping", value: "Shopping", icon: CategoryIcon.Shopping },
  { name: "Health", value: "Health", icon: CategoryIcon.Health },
  { name: "Education", value: "Education", icon: CategoryIcon.Education },
  { name: "Technology", value: "Technology", icon: CategoryIcon.Technology },
  {
    name: "Entertainment",
    value: "Entertainment",
    icon: CategoryIcon.Entertainment,
  },
];

export default categoryImageMap;
