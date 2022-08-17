const items = [{
        id: 1,
        // menu_header: "Menu",
        sub_menu: [{
                id: 1,
                menu_item: "Dashboard",
                url: "/admin/dashboard",
                icon: "apps",
            },
            {
                id: 2,
                menu_item: "Users",
                url: "/admin/user-list",
                icon: "people",
            },
        ],
    },
    {
        id: 2,
        menu_header: "deposits",
        sub_menu: [{
                id: 11,
                menu_item: "All Deposits",
                url: "/admin/dashboard/deposits",
                icon: "money",
            },

            {
                id: 21,
                menu_item: "Pending Deposits",
                url: "/admin/dashboard/deposit/pending",
                icon: "pending",
            },
            {
                id: 31,
                menu_item: "Completed Deposits",
                url: "/admin/dashboard/deposit/completed",
                icon: "task_alt",
            },
            {
                id: 41,
                menu_item: "Cancelled Deposits",
                url: "/admin/dashboard/deposit/cancelled",
                icon: "cancel",
            },
        ],
    },
    // {
    //     id: 32,
    //     menu_header: "Withdrawals",
    //     sub_menu: [{
    //             id: 12,
    //             menu_item: "All Withdrawals",
    //             url: "/admin/dashboard/withdrawals",
    //             icon: "money",
    //         },

    //         {
    //             id: 22,
    //             menu_item: "Pending Withdrawals",
    //             url: "/admin/dashboard/withdrawals/pending",
    //             icon: "pending",
    //         },
    //         {
    //             id: 32,
    //             menu_item: "Completed Withdrawals",
    //             url: "/admin/dashboard/withdrawals/completed",
    //             icon: "task_alt",
    //         },
    //         {
    //             id: 42,
    //             menu_item: "Cancelled Withdrawals",
    //             url: "/admin/dashboard/withdrawals/cancelled",
    //             icon: "cancel",
    //         },
    //     ],
    // },
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
            },
        ],
    },
];

export default items;