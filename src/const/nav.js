export default [
    // {
    //     title: '我的周报',
    //     name: 'reports',
    //     icon: 'el-icon-view',
    //     to: {
    //         path: '/reports'
    //     },
    // },
    // {
    //     title: '写周报',
    //     name: 'new-report',
    //     icon: 'el-icon-edit',
    //     to: {
    //         path: '/new-report'
    //     },
    // },
    // {
    //     title: '组员周报',
    //     name: 'member-reports',
    //     icon: 'el-icon-document-copy',
    //     to: {
    //         path: '/member-reports'
    //     },
    // },
    {
        title: '组员管理',
        icon: 'el-icon-document-copy',
        children: [{
            title: '部门组员',
            icon: 'el-icon-document-copy',
            name: 'members',
            to: {
                path: '/members'
            }
        }, ]
    },
    {
        title: '部门管理',
        icon: 'el-icon-document-copy',
        name: 'departments',
        to: {
            path: '/departments'
        }
    }
];