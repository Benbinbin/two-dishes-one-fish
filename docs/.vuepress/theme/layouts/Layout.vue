<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="sticky top-0 z-30 bg-white" :navbar-type="'classification'">
      <template v-slot:left>
        <button
          class="
            catelog-btn
            p-2
            select-none
            text-sm
            font-bold
            hover:text-gray-900
            rounded-md
            lg:hidden
          "
          :class="{
            'text-gray-400 hover:bg-gray-100': !showSidebar,
            'text-gray-900 bg-gray-100 hover:bg-gray-200': showSidebar,
          }"
          @click="toggleSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </button>
      </template>
      <template v-slot:right>
        <button
          class="
            p-2
            select-none
            text-sm
            font-bold
            hover:text-gray-900
            rounded-md
            hidden
            lg:block
          "
          :class="{
            'text-gray-400 hover:bg-gray-100': !showCatalog,
            'text-gray-900 bg-gray-100 hover:bg-gray-200': showCatalog,
          }"
          @click="showCatalog = !showCatalog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </button>
      </template>
    </Navbar>
    <div class="relative flex-grow">
      <Layout></Layout>
      <div
        v-show="showCatalog"
        class="catalog-container absolute top-0 right-0 h-full hidden lg:block"
        :style="{ width: `${catalogWidth}px` }"
      >
        <Catalog
          class="sticky top-36"
          :headings="headings"
          :activeHeading="activeHeading"
        ></Catalog>
      </div>
      <div
        v-show="showSidebar"
        ref="sidebarContainer"
        tabindex="0"
        class="
          sidebar-container
          fixed
          inset-y-0
          left-0
          z-20
          lg:hidden
          opacity-10
          hover:opacity-95
        "
      >
        <SideBar
          :headings="headings"
          :activeHeading="activeHeading"
          class="py-20"
        ></SideBar>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
import Navbar from "../../components/Navbar.vue";
import Catalog from "../../components/Catalog.vue";
import SideBar from "../../components/SideBar.vue";
import Footer from "../../components/Footer.vue";
import { ref, reactive, toRefs, onMounted, nextTick } from "vue";
const headingsMap = {
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6,
};

export default {
  components: {
    Layout,
    Navbar,
    Catalog,
    SideBar,
    Footer,
  },
  setup(props) {
    // data
    const data = reactive({
      showCatalog: true,
      showSidebar: false,
      catalogWidth: 0,
      activeHeading: "",
      headings: [],
      toggleSidebar: () => {},
    });

    const sidebarContainer = ref(null);

    onMounted(() => {
      // get headings list
      const contentDom = document.getElementsByClassName(
        "theme-default-content"
      )[0];
      const headingDomList = contentDom.querySelectorAll("h2, h3, h4, h5, h6");
      const headingsArr = Array.from(headingDomList);

      headingDomList.forEach((item) => {
        data.headings.push({
          level: headingsMap[item.nodeName],
          id: item.id,
          text: item.textContent.slice(1).trim() || item.id,
        });
      });

      // set catalog width
      const setCatalogWidth = () => {
        data.catalogWidth =
          (document.documentElement.clientWidth - contentDom.offsetWidth) / 2;
      };

      setCatalogWidth();

      let resizeTimer = null;
      window.onresize = () => {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(() => {
          setCatalogWidth();
          resizeTimer = null;
        }, 300);
      };

      // get current heading id
      const getScrollTop = () => {
        return (
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0
        );
      };

      const lastHeading = headingsArr[headingsArr.length - 1];
      const getCurrentHeading = () => {
        if (headingsArr.length === 0) return;
        const scrollTop = getScrollTop();

        if (scrollTop >= lastHeading.offsetTop) {
          data.activeHeading = lastHeading.id;
        } else {
          const target = headingsArr.find((heading) => {
            if (heading.offsetTop && scrollTop <= heading.offsetTop) {
              return true;
            }
          });
          if (!target) return;
          data.activeHeading = target.id;
        }
      };
      getCurrentHeading();

      let scrollTimer = null;
      window.onscroll = () => {
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
          getCurrentHeading();
          scrollTimer = null;
        }, 300);
      };

      // toggle sidebar and focus
      data.toggleSidebar = () => {
        data.showSidebar = !data.showSidebar;
        if (data.showSidebar) {
          nextTick(() => {
            console.log(sidebarContainer);
            sidebarContainer.value.focus();
          });
        }
      };
    });

    const refData = toRefs(data);
    return {
      ...refData,
      sidebarContainer,
    };
  },
};
</script>

<style lang="scss">
.sidebar-container {
  &:hover {
    opacity: 95%;
    background: #f3f4f6;
  }
  &:focus-within {
    opacity: 95%;
    background: #f3f4f6;
  }
}

.theme-default-content {
  h1 {
    text-align: center;
    padding-bottom: 3rem;
    font-size: 3rem;
    font-weight: bold;
    border: none;
  }

  h2 {
    padding-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
    border: none;
  }

  h3 {
    padding-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }

  h4,
  h5,
  h6 {
    padding-bottom: 1.2rem;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre {
    margin: 15px 0;
  }

  li {
    margin-left: 30px;
  }

  ol li {
    list-style: decimal;
  }

  ul li {
    list-style: circle;
  }

  & > ul > li {
    list-style: disc;
  }

  & > ul > li > ul > li > ul > li {
    list-style: square;
  }

  img {
    margin: 1rem auto;
  }

  a:not(.header-anchor) {
    box-shadow: inset 0 -0.2em 0 blue;
    &:hover {
      text-decoration: none;
      box-shadow: inset 0 -0.6em 0 rgba(0, 0, 255, 0.5);
    }
  }

  .katex-display {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>