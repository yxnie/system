import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Frame from "../views/Frame.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    redirect: "/"
  },
  // 主页
  {
    path: "/",
    component: Frame,
    children: [
      {
        path: "",
        name: "home",
        component: Home
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue")
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register/Register.vue")
  },
  // 编辑页
  {
    path: "/editPage",
    component: Frame,
    children: [
      {
        path: "",
        name: "editPage",
        component: () => import("../views/editPage/EditPage.vue")
      }
    ]
  },
  // 查看页
  {
    path: "/look",
    component: Frame,
    children: [
      {
        path: "",
        name: "look",
        component: () => import("../views/look/Look.vue")
      }
    ]
  },
  // 分页表格
  {
    path: "/table",
    component: Frame,
    children: [
      {
        path: "",
        name: "table",
        component: () => import("../views/table/Table.vue")
      }
    ]
  },
  // 标签页
  {
    path: "/labelPage",
    component: Frame,
    children: [
      {
        path: "",
        name: "labelPage",
        component: () => import("../views/labelPage/LabelPage.vue")
      }
    ]
  },
  // 图片上传
  {
    path: "/imageUpload",
    component: Frame,
    children: [
      {
        path: "",
        name: "imageUpload",
        component: () => import("../views/imageUpload/ImageUpload.vue")
      }
    ]
  },
  // 已发表
  {
    path: "/published",
    component: Frame,
    children: [
      {
        path: "",
        name: "published",
        component: () => import("../views/published/Published.vue")
      }
    ]
  },
  // 发布文章
  {
    path: "/publishArticle",
    component: Frame,
    children: [
      {
        path: "",
        name: "publishArticle",
        component: () => import("../views/publishArticle/PublishArticle.vue")
      }
    ]
  },
  // 统计
  {
    path: "/statistics",
    component: Frame,
    children: [
      {
        path: "",
        name: "statistics",
        component: () => import("../views/statistics/Statistics.vue")
      }
    ]
  },
  // 导出表格
  {
    path: "/exportExcel",
    component: Frame,
    children: [
      {
        path: "",
        name: "exportExcel",
        component: () => import("../views/exportExcel/ExportExcel.vue")
      }
    ]
  },
  // 退出登录
  {
    path: "/quit",
    component: Frame,
    children: [
      {
        path: "",
        name: "quit",
        component: () => import("../views/quit/Quit.vue")
      }
    ]
  },
  {
    path: "*",
    component: () => import("../views/error/Error.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.name === "login" || to.name === "register") {
    next();
  } else {
    if (localStorage.getItem("name")) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
