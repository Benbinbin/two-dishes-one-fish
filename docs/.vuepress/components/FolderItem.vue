<template>
  <div>
    <div
      v-if="type === 'post'"
      class="post-container bg-gray-50 rounded flex flex-col"
      :class="{
        'border border-blue-300': post.tags.includes(tag),
      }"
    >
      <div class="flex-grow p-4 flex items-start justify-between space-x-2">
        <a
          class="
            w-full
            p-2
            flex
            items-start
            space-x-2
            font-bold
            text-gray-600
            hover:text-gray-900
            hover:bg-gray-200
            rounded
          "
          :href="$withBase(post.pathRelative)"
          target="_blank"
        >
          <div class="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
              />
              <path
                d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
              />
            </svg>
          </div>
          <h3 class="text-md font-bold">{{ post.title }}</h3>
        </a>
        <button
          v-if="post.collection"
          class="
            p-2
            select-none
            flex-shrink-0
            text-gray-600
            hover:text-gray-900
            hover:bg-gray-200
            rounded
          "
          title="查看系列文章"
          @click="$emit('setCollection', post.collection)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
            />
          </svg>
        </button>
      </div>

      <div
        class="
          tags
          px-4
          h-8
          flex flex-nowrap
          items-center
          bg-gray-100
          space-x-2
          overflow-x-auto
          rounded-b
        "
      >
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

    <div
      v-if="type === 'folder' && folder.children.length > 0"
      class="folder-container bg-gray-50 rounded flex flex-col overflow-y-auto"
    >
      <button
        class="
          folder-head
          px-4
          py-3
          select-none
          flex
          items-start
          text-white
          bg-blue-400
          hover:bg-blue-500
          space-x-2
          rounded-t
        "
        @click="$emit('setFolder', folder)"
      >
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
            />
          </svg>
        </div>
        <h3 class="font-bold text-md rounded-t">
          {{ folder.name }}
        </h3>
      </button>
      <div class="folder-body px-4 py-2 space-y-1">
        <template v-for="item of folder.children" :key="item.name">
          <div
            v-if="item.type === 'post'"
            class="flex items-center justify-between space-x-2"
            :class="{
              'border border-blue-300 rounded': item.data.tags.includes(tag),
            }"
          >
            <a
              class="
                p-2
                flex-grow flex
                items-start
                space-x-1
                text-gray-600
                hover:text-gray-900
                hover:bg-gray-200
                rounded
              "
              :href="$withBase(item.data.pathRelative)"
              target="_blank"
            >
              <div class="flex-shrink-0 p-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
                  />
                  <path
                    d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
                  />
                </svg>
              </div>
              <span class="text-xs">{{ item.data.title }}</span>
            </a>
            <button
              v-if="item.data.collection"
              class="
                flex-shrink-0
                p-2
                select-none
                text-gray-500
                hover:text-gray-900
                hover:bg-gray-200
                rounded
              "
              title="查看系列文章"
              @click="$emit('setCollection', item.data.collection)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
                />
              </svg>
            </button>
          </div>
          <button
            v-if="item.type === 'folder'"
            class="
              w-full
              p-2
              select-none
              flex
              items-start
              space-x-1
              text-blue-500
              hover:text-white
              hover:bg-blue-400
              rounded
            "
            @click="$emit('setFolder', item)"
          >
            <div class="flex-shrink-0 p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
                />
              </svg>
            </div>
            <span class="text-xs">
              {{ item.name }}
            </span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: ["item", "tag"],
  setup({ item, tag }) {
    const data = reactive({
      type: item.type,
      tag: tag,
      folder: null,
      post: null,
    });

    if (data.type === "post") {
      data.post = item.data;
    } else if (data.type === "folder") {
      data.folder = item;
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

.folder-container {
  .folder-body {
    max-height: 10rem;
    overflow: overlay;
  }
}
</style>