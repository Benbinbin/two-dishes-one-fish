<template>
  <div
    class="
      p-4
      flex
      justify-center
      items-center
      fixed
      inset-0
      z-30
      bg-black bg-opacity-50
    "
  >
    <div
      class="
        modal-container
        container
        w-full
        flex flex-col
        bg-gray-50
        rounded-lg
      "
    >
      <header
        class="p-4 flex justify-between items-center border-b-2 border-gray-200"
      >
        <h2 class="text-md font-bold border-0">{{ collection.title }}</h2>
        <button
          @click="closeModalHandler"
          class="p-2 select-none rounded-lg text-red-400 hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </header>
      <main class="p-8 divide-y divide-gray-200 overflow-y-scroll" ref="main">
        <post-list
          class="w-full py-2"
          v-for="post of collection.posts"
          :key="post.title"
          :post="post"
        ></post-list>
      </main>
      <footer class="flex bg-gray-200 rounded-b-lg">
        <button
          class="
            flex-grow
            py-4
            select-none
            flex
            items-center
            justify-center
            rounded-bl-lg
            hover:bg-gray-300
          "
          @click="scrollTo(main, 'top')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"
            />
          </svg>
        </button>
        <button
          class="
            flex-grow
            p-2
            select-none
            flex
            items-center
            justify-center
            rounded-br-lg
            hover:bg-gray-300
          "
          @click="scrollTo(main, 'bottom')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"
            />
          </svg>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import PostList from "./PostList.vue";

export default {
  props: ["collection"],
  components: {
    PostList,
  },
  setup(props, context) {
    const data = reactive({
      main: ref(null),
      closeModalHandler() {
        document.body.style.overflow = "overlay";
        context.emit("closeCollectionModal");
      },
      scrollTo(target, value) {
        if (value === "top") {
          target.scrollTop = 0;
        } else if (value === "bottom") {
          target.scrollTop = target.scrollHeight;
        }
      },
    });

    onMounted(() => {
      document.body.style.overflow = "hidden";
    });

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-container {
  max-height: 80vh;
  main {
    scroll-behavior: smooth;
    overflow-y: overlay;
  }
}
</style>