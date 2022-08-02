const items = [
  {
    id: 1,
    // menu_header: "Menu",
    sub_menu: [
      {
        id: 1,
        menu_item: "User Dashboard",
        url: "/user/dashboard",
        icon: "apps",
      },
      {
        id: 2,
        menu_item: "Deposit",
        url: "/user/deposit",
        icon: "people",
      },
    ],
  },
  {
    id: 2,
    menu_header: "deposits",
    sub_menu: [
      {
        id: 1,
        menu_item: "All",
        url: "/user/deposit/all",
        icon: "money",
      },

      {
        id: 22,
        menu_item: "Pending",
        url: "/user/deposit/pending",
        icon: "pending",
      },
      {
        id: 3,
        menu_item: "Completed",
        url: "/user/deposit/completed",
        icon: "task_alt",
      },
      {
        id: 4,
        menu_item: "Cancelled",
        url: "/user/deposit/cancelled",
        icon: "cancel",
      },
      {
        id: 5,
        menu_item: "Accounts",
        url: "/user/accounts",
        icon: "cancel",
      },
    ],
  },
  {
    id: 6,
    menu_header: "withdrawals",
    sub_menu: [
      {
        id: 1,
        menu_item: "Withdrawals",
        url: "/user/withdrawals",
        icon: "money",
      },
    ],
  },
  {
    id: 3,
    menu_header: "navigation",
    sub_menu: [
      // {
      //     id:
      //      1,
      //     menu_item: "Notifications",
      //     url: '/notifications',
      //     icon: 'notifications'
      // },
      {
        id: 1,
        menu_item: "Logout",
        url: "/sign-in",
        icon: "logout",
        action: "logOut",
      },
    ],
  },
];

export default items;
