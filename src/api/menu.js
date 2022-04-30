const items = [{
        id: 1,
        // menu_header: "Menu",
        sub_menu: [{
            id: 1,
            menu_item: "Dashboard",
            url: '/',
            icon: 'apps'
        }, {
            id: 2,
            menu_item: "Users",
            url: '/user-list',
            icon: 'people'
        }, ]
    },
    {
        id: 2,
        menu_header: "transactions",
        sub_menu: [{
                id: 1,
                menu_item: "Transactions",
                url: '/transactions',
                icon: 'money'
            },

            {
                id: 2,
                menu_item: "Pending",
                url: '/pending',
                icon: 'pending'
            },
            {
                id: 3,
                menu_item: "Completed",
                url: '/completed',
                icon: 'task_alt'
            },
            {
                id: 4,
                menu_item: "Cancelled",
                url: '/cancelled',
                icon: 'cancel'
            },
        ]

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
                url: '/sign-in',
                icon: 'logout'
            },
        ]

    },

]

export default items;