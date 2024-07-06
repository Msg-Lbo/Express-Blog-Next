import { useUserInfoStore } from '@/store/user'
import { createRouter, createWebHistory } from 'vue-router'
const routers = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '首页'
                },
            },
            {
                path: '/category/:category?',
                name: 'category',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '分类'
                }
            },
            {
                path: '/links',
                name: 'links',
                component: () => import('@/views/Links.vue'),
                meta: {
                    title: '友链'
                }
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: () => import('@/views/Detail.vue'),
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('@/views/About.vue'),
                meta: {
                    title: '关于'
                }
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '搜索'
                }
            },
        ]
    },
    {
        path: '/install',
        component: () => import('@/views/install/install.vue'),
        beforeEnter: () => {
        }
    },
    {
        path: '/manager',
        name: 'manager',
        component: () => import('@/views/admin/index.vue'),
        meta: {
            auth: true
        },
        children: [
            {
                path: '/manager',
                redirect: '/manager/article-list',
                meta: {
                    title: '文章管理'
                },
                children: [
                    {
                        path: 'article-list',
                        name: 'article-list',
                        component: () => import('@/views/admin/ArticleList.vue'),
                        meta: {
                            title: '文章列表'
                        }
                    },
                    {
                        path: 'edit-article',
                        name: 'edit-article',
                        component: () => import('@/views/admin/EditArticle.vue'),
                        meta: {
                            title: '编辑文章'
                        }
                    },
                ]
            },
            {
                path: 'category-manager',
                name: 'category-manager',
                component: () => import('@/views/admin/CategoryManager.vue'),
                meta: {
                    title: '分类管理'
                }
            },
            {
                path: 'image-manager',
                name: 'image-manager',
                component: () => import('@/views/admin/ImageManager.vue'),
                meta: {
                    title: '图片管理'
                }
            },
            {
                path: 'navigation-manager',
                name: 'navigation-manager',
                component: () => import('@/views/admin/NavigationManager.vue'),
                meta: {
                    title: '导航管理'
                }
            },
            {
                path: 'tag-manager',
                name: 'tag-manager',
                component: () => import('@/views/admin/TagManager.vue'),
                meta: {
                    title: '标签管理'
                }
            },
            {
                path: 'comment-manager',
                name: 'comment-manager',
                component: () => import('@/views/admin/CommentManager.vue'),
                meta: {
                    title: '评论管理'
                }
            },
            {
                path: 'link-manager',
                name: 'link-manager',
                component: () => import('@/views/admin/LinkManager.vue'),
                meta: {
                    title: '友链管理'
                }
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/views/admin/Settings.vue'),
                meta: {
                    title: '设置'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/:error*',
        name: 'error',
        component: () => import('@/views/result/result.vue'),
        meta: {
            title: 'error'
        }
    },
    // 所有未定义路由，全部重定向到error页面
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        redirect: '/error'
    }
]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),

    routes: routers
})

// 路由守卫
router.beforeEach(async (to, _from, next) => {
    const userInfoStore = useUserInfoStore()
    const { handleGetUserInfo } = userInfoStore
    document.title = to.meta.title ? to.meta.title + ' | ' + '一楼没太阳' : '一楼没太阳'
    if (to.meta.auth) {
        const res = await handleGetUserInfo()
        if (res) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})



export default router