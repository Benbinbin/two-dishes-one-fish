<template>
  <div
    class="
      card
      z-10
      flex flex-col
      bg-gray-200
      rounded-lg
      hover:shadow-lg
      transition
    "
  >
    <div
      class="card-main relative flex-grow flex flex-col"
      :class="{ collection: post.collection }"
    >
      <div
        v-if="post.cover"
        class="card-cover h-40 bg-center bg-no-repeat bg-cover rounded-t-lg"
        :style="{
          backgroundImage:
            'url(' + $withBase(`/images/covers/${post.cover}`) + ')',
        }"
      ></div>
      <div
        class="card-header bg-gray-50"
        :class="{ 'rounded-t-lg': !post.cover }"
      >
        <h3 class="px-6 py-4 text-2xl font-bold">{{ post.title }}</h3>
        <div
          v-if="createdTime || updatedTime"
          class="px-6 flex items-center text-gray-400 space-x-1"
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
      </div>
      <div class="card-body bg-gray-50 flex-grow p-6">
        <p>{{ post.summary }}</p>
      </div>
      <a
        :href="$withBase(post.pathRelative)"
        target="_blank"
        class="absolute z-10 inset-0"
      ></a>
    </div>

    <div class="card-footer px-4 h-14 relative z-10 flex justify-between items-center space-x-2">
      <div class="tags h-full flex flex-nowrap items-center overflow-x-auto space-x-2">
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
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import formatTime from '../utils/formatTime'

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

.tags {
  overflow: overlay;
}

.collection {
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    z-index: -10;
    border-radius: 0.5rem;
    transition: 300ms;
  }

  &::before {
    left: 16px;
    right: 16px;
    background: #d1d5db;
  }

  &::after {
    left: 8px;
    right: 8px;
    background: #e5e7eb;
  }
}

.card:hover {
  .collection::before {
    transform: translateY(-20px);
  }
  .collection::after {
    transform: translateY(-10px);
  }
}
</style>