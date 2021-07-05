<template>
  <div class="min-h-screen flex flex-col">
    <Navbar
      class="sticky top-0 z-20 bg-white"
      :navbar-type="'classification'"
    />

    <main class="flex-grow">
      <h2 class="py-10 text-5xl font-bold text-center border-0">
        {{ classification.toUpperCase() }}
      </h2>
      <div v-if="tags.length > 0" class="container p-10 mx-auto flex flex-wrap space-x-2">
        <a
          class="tag py-2 text-gray-400 hover:text-gray-600 text-sm font-bold"
          :class="{ 'text-gray-800': currentTag === item }"
          v-for="item of tags"
          :key="item"
          :href="`#${item}`"
          >#{{ item }}</a
        >
      </div>
      <hr class="container w-4/5 mx-auto" />
      <div class="container p-10 mx-auto flex justify-between">
        <div class="flex items-center space-x-2">
          <button
            class="p-2 select-none rounded flex items-center space-x-1"
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white': layout === 'grid',
              'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                layout !== 'grid',
            }"
            title="网格布局"
            @click="setLayout('grid')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
            <span class="text-xs hidden sm:block">Grid</span>
          </button>
          <button
            class="hidden p-2 select-none rounded sm:flex items-center space-x-1"
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white': layout === 'masonry',
              'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                layout !== 'masonry',
            }"
            title="瀑布流式布局"
            @click="setLayout('masonry')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"
              />
            </svg>
            <span class="text-xs hidden sm:block">Masonry</span>
          </button>
          <button
            class="p-2 select-none rounded flex items-center space-x-1"
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white': layout === 'list',
              'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                layout !== 'list',
            }"
            title="列表布局"
            @click="setLayout('list')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </svg>
            <span class="text-xs hidden sm:block">List</span>
          </button>
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="p-2 select-none text-xs rounded"
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white': sortByUpdated,
              'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                !sortByUpdated,
            }"
            title="按更新时间排序"
            @click="sortByUpdated = !sortByUpdated"
          >
            Updated
          </button>
          <button
            class="p-2 select-none rounded flex items-center space-x-1"
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white': sortType === 'ascend',
              'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                sortType !== 'ascend',
            }"
            title="旧的文章在前"
            @click="setSortType('ascend')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"
              />
              <path
                fill-rule="evenodd"
                d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
              />
              <path
                d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
              />
            </svg>
            <span class="text-xs hidden sm:block">Ascend</span>
          </button>
          <button
            class="p-2 select-none rounded flex items-center space-x-1"
            :class="{
              'bg-blue-500 hover:bg-blue-600 text-white':
                sortType === 'descend',
              'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                sortType !== 'descend',
            }"
            title="新的文章在前"
            @click="setSortType('descend')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
              />
              <path
                d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
              />
            </svg>
            <span class="text-xs hidden sm:block">Descend</span>
          </button>
        </div>
      </div>
      <div
        v-if="sortPosts && sortPosts.length > 0"
        v-show="layout !== 'list'"
        id="cards-container"
        class="container p-8 mx-auto"
        :class="{
          'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8':
            layout === 'grid',
        }"
      >
        <post-card
          :class="{ 'grid-item': layout === 'masonry' }"
          v-for="post of sortPosts"
          :key="post.title"
          :post="post"
          @setCollection="setCollectionHandler"
        ></post-card>
      </div>
      <div
        v-if="sortPosts && sortPosts.length > 0"
        v-show="layout === 'list'"
        class="container p-8 mx-auto divide-y divide-gray-200"
      >
        <post-list
          class="w-full py-2"
          v-for="post of sortPosts"
          :key="post.title"
          :post="post"
          @setCollection="setCollectionHandler"
        ></post-list>
      </div>
    </main>

    <Footer />

    <teleport to="body">
      <collection-modal
        v-if="collectionModalOpen && collection"
        :collection="collection"
        @closeCollectionModal="closeCollectionModalHandler"
      ></collection-modal>
    </teleport>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, nextTick } from "vue";
import { usePageData } from "@vuepress/client";

import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import PostCard from "../../components/PostCard.vue";
import PostList from "../../components/PostList.vue";
import CollectionModal from "../../components/CollectionModal.vue";

export default {
  components: {
    Navbar,
    Footer,
    PostCard,
    PostList,
    CollectionModal,
  },
  setup(props) {
    // data
    const data = reactive({
      classification: "",
      posts: [],
      tags: [],
      currentTag: "",
      layout: "grid",
      sortType: "descend",
      sortByUpdated: false,
      collectionModalOpen: false,
      collection: null,
      setLayout: () => {},
    });

    // methods
    const setSortType = (value) => {
      localStorage.setItem("sortType", value);
      data.sortType = value;
    };

    const setCollectionHandler = (value) => {
      let collectionPosts = [];
      data.posts.forEach((post) => {
        if (post.collection && post.collection === value) {
          collectionPosts.push(post);
        }
      });
      collectionPosts.sort((postA, postB) => {
        const timeA = postA.date || postA.createdTime;
        const timeB = postB.date || postB.createdTime;
        const orderA = postA.collectionOrder;
        const orderB = postB.collectionOrder;
        if (orderA && orderB && orderA !== orderB) {
          return orderA - orderB;
        } else if (timeA && timeB) {
          return new Date(timeA) - new Date(timeB);
        } else {
          return 0;
        }
      });
      data.collection = {
        title: value,
        posts: collectionPosts,
      };
      data.collectionModalOpen = true;
    };
    const closeCollectionModalHandler = () => {
      data.collectionModalOpen = false;
      data.collection = null;
    };

    // get init page data
    const page = usePageData();

    data.classification = page.value.frontmatter.classification;
    data.posts = page.value.postsList.posts;
    data.tags = ["all", ...page.value.postsList.tags];

    // tag
    onMounted(() => {
      // base on url hash to set current tag
      if (location.hash) {
        data.currentTag = location.hash.slice(1);
      }

      window.onhashchange = function (event) {
        data.currentTag = location.hash.slice(1);
      };
    });

    // layout
    let masonry = null;
    onMounted(async () => {
      // base on localStorage to set layout
      if (localStorage.getItem("layout")) {
        data.layout = localStorage.getItem("layout");
      } else {
        localStorage.setItem("layout", "grid");
      }
      if (localStorage.getItem("sortType")) {
        data.sortType = localStorage.getItem("sortType");
      } else {
        localStorage.setItem("sortType", "descend");
      }

      // dynamic import masonry
      const module = await import("masonry-layout");
      const Masonry = module.default;
      
      const createMasonryLayout = (container, item) => {
        return new Masonry(container, {
          itemSelector: item,
          gutter: 28,
          horizontalOrder: true,
          transitionDuration: 0,
        });
      };

      if (data.layout === "masonry") {
        nextTick(() => {
          masonry = createMasonryLayout("#cards-container", ".grid-item");
        });
      }

      data.setLayout = (value) => {
        if (data.layout === "masonry" && masonry) {
          masonry.destroy();
          masonry = null;
        }

        localStorage.setItem("layout", value);
        data.layout = value;

        if (value === "masonry") {
          nextTick(() => {
            masonry = createMasonryLayout("#cards-container", ".grid-item");
          });
        }
      };
    });

    // sort posts
    const sortPosts = computed(() => {
      let posts = data.posts;
      if (data.currentTag && data.currentTag !== "all") {
        posts = data.posts.filter((post) => {
          return post.tags.includes(data.currentTag);
        });
      } else if (data.currentTag && data.currentTag === "all") {
        posts = data.posts;
      }
      posts.sort((postA, postB) => {
        let timeA = null;
        let timeB = null;
        if (data.sortByUpdated) {
          timeA = postA.updatedTime || postA.date || postA.createdTime;
          timeB = postB.updatedTime || postB.date || postB.createdTime;
        } else {
          timeA = postA.date || postA.createdTime;
          timeB = postB.date || postB.createdTime;
        }
        if (timeA && timeB) {
          return data.sortType === "descend"
            ? new Date(timeB) - new Date(timeA)
            : new Date(timeA) - new Date(timeB);
        } else {
          return 0;
        }
      });
      if (data.layout === "masonry" && masonry) {
        nextTick(() => {
          masonry.reloadItems();
          masonry.layout();
        });
      }
      return posts;
    });

    const refData = toRefs(data);

    return {
      ...refData,
      sortPosts,
      setSortType,
      setCollectionHandler,
      closeCollectionModalHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
// masonry layout style
.grid-item {
  width: calc(100% - 4rem);
}

// breakpoint: sm
// 2 cols
@media (min-width: 640px) {
  .grid-item {
    width: calc(50% - 14px - 2rem);
  }
}

// breakpoint: xl
// 3 cols
@media (min-width: 1280px) {
  .grid-item {
    width: calc(33% - 20px - 1.5rem);
  }
}

// breakpoint: 2xl
// 4 cols
@media (min-width: 1536px) {
  .grid-item {
    width: calc(25% - 21px - 1rem);
  }
}

.grid-item {
  margin-bottom: 28px;
}
</style>