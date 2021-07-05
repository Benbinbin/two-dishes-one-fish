<template>
  <div>
    <h3 class="py-2 ">
      <a class="text-lg sm:text-xl font-bold hover:text-blue-500" :href="$withBase(`${post.pathRelative}`)" target="_blank">{{
        post.title
      }}</a>
    </h3>
    <div
      class="
        sm:flex
        justify-between
        item-center
        sm:space-x-4
        space-y-2
        sm:space-y-0
      "
    >
      <div class="flex-shrink-0 flex space-x-2">
        <div
          v-if="createdTime || updatedTime"
          class="flex-shrink-0 flex items-center text-gray-400 space-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
            />
            <path
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
            />
          </svg>
          <span v-if="createdTime" class="text-xs">{{ createdTime }}</span>
          <span v-if="createdTime && updatedTime"> - </span>
          <span v-if="updatedTime" class="text-xs"
            >Update {{ updatedTime }}</span
          >
        </div>

        <button
          v-if="post.collection"
          class="p-2 select-none flex-shrink-0 hover:bg-gray-300 rounded text-blue-500"
          title="查看系列文章"
          @click="$emit('setCollection', post.collection)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
            />
          </svg>
        </button>
      </div>

      <div class="tags flex items-center flex-nowrap overflow-x-auto space-x-2">
        <a
          v-for="tag of post.tags"
          :key="tag"
          class="
            flex-shrink-0
            text-gray-400
            font-bold
            text-xs
            hover:text-gray-800
          "
          :href="`#${tag}`"
          >#{{ tag }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import formatTime from "../utils/formatTime";

export default {
  props: ["post"],
  setup({ post }) {
    const data = reactive({
      createdTime: null,
      updatedTime: null,
    });

    if (post.date) {
      data.createdTime = formatTime(post.date);
    } else if (post.createdTime) {
      data.createdTime = formatTime(post.createdTime);
    }
    if (post.updatedTime) {
      data.updatedTime = formatTime(post.updatedTime);
    }

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #4b5563;
}
</style>