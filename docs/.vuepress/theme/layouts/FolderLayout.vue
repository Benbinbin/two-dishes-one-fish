<template>
  <div
    ref="bodyContainer"
    class="flex flex-col"
    :class="{
      'min-h-screen': layout === 'grid',
      'h-screen': layout === 'tree',
    }"
  >
    <Navbar
      ref="navContainer"
      class="flex-shrink-0 sticky top-0 z-20 bg-white"
      :navbar-type="'folder'"
    />
    <!-- grid -->
    <main v-show="layout === 'grid'" class="flex-grow">
      <h2 class="py-10 text-5xl font-bold text-center border-0">
        {{ folder.toUpperCase() }}
      </h2>
      <div v-if="tags.length > 0" class="container p-10 mx-auto flex flex-wrap space-x-2">
        <a
          class="tag py-2 text-gray-400 hover:text-gray-600 text-sm font-bold"
          :class="{ 'text-blue-400': currentTag === item }"
          v-for="item of tags"
          :key="item"
          :href="`#${item}`"
          >#{{ item }}</a
        >
      </div>
      <hr class="container w-4/5 mx-auto" />
      <div
        class="
          container
          p-10
          mx-auto
          flex flex-col
          sm:flex-row
          space-y-2
          sm:space-y-0
          sm:justify-between
        "
      >
        <div class="flex items-center sm:space-x-2">
          <button
            class="
              p-3
              select-none
              rounded
              hidden
              sm:flex
              items-center
              space-x-1
              bg-gray-100
              hover:bg-blue-500
              text-gray-500
              hover:text-white
            "
            title="返回"
            @click="setFolderHandler(currentFolder.parent)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
            <span class="text-xs hidden sm:block">Back</span>
          </button>
          <div class="flex flex-wrap items-center space-x-1">
            <template
              v-for="item of breadcrumb"
              :key="item.name"
              class="space-x-1"
            >
              <span v-if="!(item.type === 'root')">/</span>
              <button
                class="
                  p-1
                  select-none
                  sm:p-3
                  rounded
                  flex
                  items-center
                  space-x-1
                  text-gray-500
                  hover:text-white
                  hover:bg-blue-500
                "
                @click="setFolderHandler(item)"
              >
                <div v-if="item.type === 'root'" class="hidden sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </div>
                <div v-if="item.type === 'folder'" class="hidden sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 hidden sm:block"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
                    />
                  </svg>
                </div>
                <span class="text-xs"> {{ item.name }}</span>
              </button>
            </template>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="
              p-3
              select-none
              rounded
              sm:hidden
              items-center
              space-x-1
              bg-gray-100
              hover:bg-blue-500
              text-gray-500
              hover:text-white
            "
            title="返回"
            @click="setFolderHandler(currentFolder.parent)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
            <span class="text-xs hidden sm:block">Back</span>
          </button>
          <div class="flex items-center space-x-2">
            <button
              class="p-3 select-none rounded flex items-center space-x-1"
              :class="{
                'bg-blue-500 hover:bg-blue-600 text-white': layout === 'grid',
                'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                  layout !== 'grid',
              }"
              title="网格布局"
              @click="layout = 'grid'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-5z"
                />
              </svg>
              <span class="text-xs hidden sm:block">Grid</span>
            </button>
            <button
              class="hidden p-3 select-none rounded sm:flex items-center space-x-1"
              :class="{
                'bg-blue-500 hover:bg-blue-600 text-white': layout === 'tree',
                'bg-gray-100 hover:bg-blue-500 text-gray-500 hover:text-white':
                  layout !== 'tree',
              }"
              title="树状布局"
              @click="layout = 'tree'"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.5 10C3.10218 10 2.72064 9.84196 2.43934 9.56066C2.15804 9.27936 2 8.89782 2 8.5L2 7.5C2 7.10218 2.15804 6.72064 2.43934 6.43934C2.72064 6.15804 3.10218 6 3.5 6L4.5 6C4.89782 6 5.27936 6.15804 5.56066 6.43934C5.84197 6.72064 6 7.10218 6 7.5L7 7.5L7 2C7 1.86739 7.05268 1.74021 7.14645 1.64645C7.24022 1.55268 7.36739 1.5 7.5 1.5L8.5 1.5C8.63261 1.5 8.75979 1.55268 8.85355 1.64645C8.94732 1.74021 9 1.86739 9 2C9 2.13261 8.94732 2.25979 8.85355 2.35355C8.75979 2.44732 8.63261 2.5 8.5 2.5L8 2.5L8 7.5L8.5 7.5C8.63261 7.5 8.75979 7.55268 8.85355 7.64645C8.94732 7.74021 9 7.86739 9 8C9 8.13261 8.94732 8.25979 8.85355 8.35355C8.75979 8.44732 8.63261 8.5 8.5 8.5L8 8.5L8 13.5L8.5 13.5C8.63261 13.5 8.75979 13.5527 8.85355 13.6464C8.94732 13.7402 9 13.8674 9 14C9 14.1326 8.94732 14.2598 8.85355 14.3536C8.75979 14.4473 8.63261 14.5 8.5 14.5L7.5 14.5C7.36739 14.5 7.24021 14.4473 7.14645 14.3536C7.05268 14.2598 7 14.1326 7 14L7 8.5L6 8.5C6 8.89782 5.84197 9.27936 5.56066 9.56066C5.27936 9.84196 4.89782 10 4.5 10L3.5 10ZM5 7.5C5 7.36739 4.94732 7.24021 4.85355 7.14645C4.75979 7.05268 4.63261 7 4.5 7L3.5 7C3.36739 7 3.24021 7.05268 3.14645 7.14645C3.05268 7.24021 3 7.36739 3 7.5L3 8.5C3 8.63261 3.05268 8.75979 3.14645 8.85355C3.24021 8.94732 3.36739 9 3.5 9L4.5 9C4.63261 9 4.75979 8.94732 4.85355 8.85355C4.94732 8.75979 5 8.63261 5 8.5L5 7.5ZM11.5 16C11.1022 16 10.7206 15.842 10.4393 15.5607C10.158 15.2794 10 14.8978 10 14.5L10 13.5C10 13.1022 10.158 12.7206 10.4393 12.4393C10.7206 12.158 11.1022 12 11.5 12L12.5 12C12.8978 12 13.2794 12.158 13.5607 12.4393C13.842 12.7206 14 13.1022 14 13.5L14 14.5C14 14.8978 13.842 15.2794 13.5607 15.5607C13.2794 15.842 12.8978 16 12.5 16L11.5 16ZM11 14.5C11 14.6326 11.0527 14.7598 11.1464 14.8536C11.2402 14.9473 11.3674 15 11.5 15L12.5 15C12.6326 15 12.7598 14.9473 12.8536 14.8536C12.9473 14.7598 13 14.6326 13 14.5L13 13.5C13 13.3674 12.9473 13.2402 12.8536 13.1464C12.7598 13.0527 12.6326 13 12.5 13L11.5 13C11.3674 13 11.2402 13.0527 11.1464 13.1464C11.0527 13.2402 11 13.3674 11 13.5L11 14.5ZM11.5 10C11.1022 10 10.7206 9.84197 10.4393 9.56066C10.158 9.27936 10 8.89782 10 8.5L10 7.5C10 7.10218 10.158 6.72064 10.4393 6.43934C10.7206 6.15804 11.1022 6 11.5 6L12.5 6C12.8978 6 13.2794 6.15804 13.5607 6.43934C13.842 6.72064 14 7.10218 14 7.5L14 8.5C14 8.89782 13.842 9.27936 13.5607 9.56066C13.2794 9.84197 12.8978 10 12.5 10L11.5 10ZM11 8.5C11 8.63261 11.0527 8.75979 11.1464 8.85355C11.2402 8.94732 11.3674 9 11.5 9L12.5 9C12.6326 9 12.7598 8.94732 12.8536 8.85355C12.9473 8.75979 13 8.63261 13 8.5L13 7.5C13 7.36739 12.9473 7.24021 12.8536 7.14645C12.7598 7.05268 12.6326 7 12.5 7L11.5 7C11.3674 7 11.2402 7.05268 11.1464 7.14645C11.0527 7.24021 11 7.36739 11 7.5L11 8.5ZM11.5 4C11.1022 4 10.7206 3.84197 10.4393 3.56066C10.158 3.27936 10 2.89782 10 2.5L10 1.5C10 1.10218 10.158 0.720644 10.4393 0.43934C10.7206 0.158035 11.1022 1.08542e-07 11.5 1.13286e-07L12.5 1.25211e-07C12.8978 1.29955e-07 13.2794 0.158035 13.5607 0.43934C13.842 0.720644 14 1.10218 14 1.5L14 2.5C14 2.89782 13.842 3.27936 13.5607 3.56066C13.2794 3.84197 12.8978 4 12.5 4L11.5 4ZM11 2.5C11 2.63261 11.0527 2.75979 11.1464 2.85355C11.2402 2.94732 11.3674 3 11.5 3L12.5 3C12.6326 3 12.7598 2.94732 12.8536 2.85355C12.9473 2.75979 13 2.63261 13 2.5L13 1.5C13 1.36739 12.9473 1.24021 12.8536 1.14645C12.7598 1.05268 12.6326 1 12.5 1L11.5 1C11.3674 1 11.2402 1.05268 11.1464 1.14645C11.0527 1.24021 11 1.36739 11 1.5L11 2.5Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0 16) rotate(-90)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span class="text-xs hidden sm:block">Tree</span>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="folderContent && folderContent.length > 0"
        v-show="layout === 'grid'"
        class="
          container
          p-8
          mx-auto
          grid grid-flow-row-dense grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-2
        "
      >
        <folder-item
          v-for="item of folderContent"
          :key="item.name"
          :item="item"
          :tag="currentTag"
          :class="{
            'row-span-1': item.type === 'post',
            'row-span-2': item.type === 'folder' && item.children.length > 3,
          }"
          @setCollection="setCollectionHandler"
          @setFolder="setFolderHandler"
        ></folder-item>
      </div>
    </main>
    <Footer v-show="layout === 'grid'" />
    <!-- tree -->
    <!-- <div v-show="layout === 'tree'" class="tree-container relative"> -->
    <posts-tree
      :layout="layout"
      :width="treeWidth"
      :height="treeHeight"
      :posts-data="currentFolder"
    ></posts-tree>
    <div
      v-show="layout === 'tree'"
      class="p-8 flex justify-between items-center fixed top-16 inset-x-0 z-10"
    >
      <div class="flex items-center space-x-2">
        <button
          class="
            p-3
            select-none
            rounded
            flex
            items-center
            space-x-1
            bg-gray-200
            hover:bg-blue-500
            text-gray-600
            hover:text-white
            opacity-60
            hover:opacity-100
          "
          title="返回"
          @click="setFolderHandler(currentFolder.parent)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          <span class="text-xs hidden sm:block">Back</span>
        </button>
        <button
          class="
            p-3
            select-none
            rounded
            flex
            items-center
            space-x-0
            sm:space-x-1
            text-gray-600
            hover:text-white
            bg-gray-200
            hover:bg-blue-500
            opacity-60
            hover:opacity-100
          "
          @click="setFolderHandler(postsTreeData)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <span class="text-xs hidden sm:block">
            {{ folder }}</span
          >
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <button
          class="
            p-3
            select-none
            rounded
            flex
            items-center
            space-x-0
            sm:space-x-1
            opacity-60
            hover:opacity-100
            hover:bg-blue-500
            hover:text-white
          "
          :class="{
            'bg-blue-500 text-white': layout === 'grid',
            'bg-gray-200 text-gray-600 ': layout !== 'grid',
          }"
          title="网格布局"
          @click="layout = 'grid'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-5z"
            />
          </svg>
          <span class="text-xs hidden sm:block">Grid</span>
        </button>
        <button
          class="
            hidden
            p-3
            select-none
            rounded
            sm:flex
            items-center
            space-x-0
            sm:space-x-1
            opacity-60
            hover:opacity-100
            hover:bg-blue-500
            hover:text-white
          "
          :class="{
            'bg-blue-500 text-white': layout === 'tree',
            'bg-gray-200 text-gray-600': layout !== 'tree',
          }"
          title="树状布局"
          @click="layout = 'tree'"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.5 10C3.10218 10 2.72064 9.84196 2.43934 9.56066C2.15804 9.27936 2 8.89782 2 8.5L2 7.5C2 7.10218 2.15804 6.72064 2.43934 6.43934C2.72064 6.15804 3.10218 6 3.5 6L4.5 6C4.89782 6 5.27936 6.15804 5.56066 6.43934C5.84197 6.72064 6 7.10218 6 7.5L7 7.5L7 2C7 1.86739 7.05268 1.74021 7.14645 1.64645C7.24022 1.55268 7.36739 1.5 7.5 1.5L8.5 1.5C8.63261 1.5 8.75979 1.55268 8.85355 1.64645C8.94732 1.74021 9 1.86739 9 2C9 2.13261 8.94732 2.25979 8.85355 2.35355C8.75979 2.44732 8.63261 2.5 8.5 2.5L8 2.5L8 7.5L8.5 7.5C8.63261 7.5 8.75979 7.55268 8.85355 7.64645C8.94732 7.74021 9 7.86739 9 8C9 8.13261 8.94732 8.25979 8.85355 8.35355C8.75979 8.44732 8.63261 8.5 8.5 8.5L8 8.5L8 13.5L8.5 13.5C8.63261 13.5 8.75979 13.5527 8.85355 13.6464C8.94732 13.7402 9 13.8674 9 14C9 14.1326 8.94732 14.2598 8.85355 14.3536C8.75979 14.4473 8.63261 14.5 8.5 14.5L7.5 14.5C7.36739 14.5 7.24021 14.4473 7.14645 14.3536C7.05268 14.2598 7 14.1326 7 14L7 8.5L6 8.5C6 8.89782 5.84197 9.27936 5.56066 9.56066C5.27936 9.84196 4.89782 10 4.5 10L3.5 10ZM5 7.5C5 7.36739 4.94732 7.24021 4.85355 7.14645C4.75979 7.05268 4.63261 7 4.5 7L3.5 7C3.36739 7 3.24021 7.05268 3.14645 7.14645C3.05268 7.24021 3 7.36739 3 7.5L3 8.5C3 8.63261 3.05268 8.75979 3.14645 8.85355C3.24021 8.94732 3.36739 9 3.5 9L4.5 9C4.63261 9 4.75979 8.94732 4.85355 8.85355C4.94732 8.75979 5 8.63261 5 8.5L5 7.5ZM11.5 16C11.1022 16 10.7206 15.842 10.4393 15.5607C10.158 15.2794 10 14.8978 10 14.5L10 13.5C10 13.1022 10.158 12.7206 10.4393 12.4393C10.7206 12.158 11.1022 12 11.5 12L12.5 12C12.8978 12 13.2794 12.158 13.5607 12.4393C13.842 12.7206 14 13.1022 14 13.5L14 14.5C14 14.8978 13.842 15.2794 13.5607 15.5607C13.2794 15.842 12.8978 16 12.5 16L11.5 16ZM11 14.5C11 14.6326 11.0527 14.7598 11.1464 14.8536C11.2402 14.9473 11.3674 15 11.5 15L12.5 15C12.6326 15 12.7598 14.9473 12.8536 14.8536C12.9473 14.7598 13 14.6326 13 14.5L13 13.5C13 13.3674 12.9473 13.2402 12.8536 13.1464C12.7598 13.0527 12.6326 13 12.5 13L11.5 13C11.3674 13 11.2402 13.0527 11.1464 13.1464C11.0527 13.2402 11 13.3674 11 13.5L11 14.5ZM11.5 10C11.1022 10 10.7206 9.84197 10.4393 9.56066C10.158 9.27936 10 8.89782 10 8.5L10 7.5C10 7.10218 10.158 6.72064 10.4393 6.43934C10.7206 6.15804 11.1022 6 11.5 6L12.5 6C12.8978 6 13.2794 6.15804 13.5607 6.43934C13.842 6.72064 14 7.10218 14 7.5L14 8.5C14 8.89782 13.842 9.27936 13.5607 9.56066C13.2794 9.84197 12.8978 10 12.5 10L11.5 10ZM11 8.5C11 8.63261 11.0527 8.75979 11.1464 8.85355C11.2402 8.94732 11.3674 9 11.5 9L12.5 9C12.6326 9 12.7598 8.94732 12.8536 8.85355C12.9473 8.75979 13 8.63261 13 8.5L13 7.5C13 7.36739 12.9473 7.24021 12.8536 7.14645C12.7598 7.05268 12.6326 7 12.5 7L11.5 7C11.3674 7 11.2402 7.05268 11.1464 7.14645C11.0527 7.24021 11 7.36739 11 7.5L11 8.5ZM11.5 4C11.1022 4 10.7206 3.84197 10.4393 3.56066C10.158 3.27936 10 2.89782 10 2.5L10 1.5C10 1.10218 10.158 0.720644 10.4393 0.43934C10.7206 0.158035 11.1022 1.08542e-07 11.5 1.13286e-07L12.5 1.25211e-07C12.8978 1.29955e-07 13.2794 0.158035 13.5607 0.43934C13.842 0.720644 14 1.10218 14 1.5L14 2.5C14 2.89782 13.842 3.27936 13.5607 3.56066C13.2794 3.84197 12.8978 4 12.5 4L11.5 4ZM11 2.5C11 2.63261 11.0527 2.75979 11.1464 2.85355C11.2402 2.94732 11.3674 3 11.5 3L12.5 3C12.6326 3 12.7598 2.94732 12.8536 2.85355C12.9473 2.75979 13 2.63261 13 2.5L13 1.5C13 1.36739 12.9473 1.24021 12.8536 1.14645C12.7598 1.05268 12.6326 1 12.5 1L11.5 1C11.3674 1 11.2402 1.05268 11.1464 1.14645C11.0527 1.24021 11 1.36739 11 1.5L11 2.5Z"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0 16) rotate(-90)"
                />
              </clipPath>
            </defs>
          </svg>
          <span class="text-xs hidden sm:block">Tree</span>
        </button>
      </div>
    </div>
    <!-- </div> -->

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
import {
  ref,
  reactive,
  toRefs,
  nextTick,
  onMounted,
  computed,
  watch,
} from "vue";
import { usePageData } from "@vuepress/client";

import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer.vue";
import FolderItem from "../../components/FolderItem.vue";
import PostsTree from "../../components/PostsTree.vue";
import CollectionModal from "../../components/CollectionModal.vue";

function buildPostsTreeData(rootName, postsList) {
  let tree = {
    name: rootName,
    type: "root",
    parent: null,
    children: [],
  };

  const mdReg = /\.md$/;

  postsList.forEach((post) => {
    const paths = post.filePathRelative.split("/").slice(1);
    let folder = tree;
    let currentContent = tree.children;

    for (let index = 0; index < paths.length; index++) {
      const path = paths[index];
      // let existingPath = getLocation(currentLevel, "name", path);
      let existingPath = currentContent.find((item) => {
        return item.name === path;
      });
      if (existingPath) {
        folder = existingPath;
        currentContent = existingPath.children;
      } else if (mdReg.test(path)) {
        const newPath = {
          name: path,
          type: "post",
          parent: folder,
          data: post,
        };
        currentContent.push(newPath);
      } else {
        const newPath = {
          name: path,
          type: "folder",
          parent: folder,
          children: [],
        };

        currentContent.push(newPath);
        folder = newPath;
        currentContent = newPath.children;
      }
    }
  });

  return tree;
}

export default {
  components: {
    Navbar,
    Footer,
    FolderItem,
    PostsTree,
    CollectionModal,
  },
  setup(props) {
    // data
    const data = reactive({
      bodyContainer: ref(null),
      navContainer: ref(null),
      treeWidth: 0,
      treeHeight: 0,
      folder: "",
      folderList: [],
      currentFolder: null,
      posts: [],
      postsTreeData: null,
      tags: [],
      currentTag: "",
      layout: "grid",
      sortType: "descend",
      sortByUpdated: false,
      collectionModalOpen: false,
      collection: null,
    });
    // method
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
    const setFolderHandler = (value) => {
      if (!value) return;
      data.currentFolder = value;

      let folderNameArr = [];
      folderNameArr.unshift(data.currentFolder.name);

      let folder = data.currentFolder;
      while (folder.parent) {
        folderNameArr.unshift(folder.parent.name);
        folder = folder.parent;
      }
      let url = `${location.pathname}`;

      if (folderNameArr.length > 1) {
        const searchStr = `?folder=${folderNameArr.slice(1).join("&folder=")}`;

        url = `${location.pathname}${searchStr}`;
      }
      history.pushState({ url: url }, "", url);
    };

    // set init data property value
    const page = usePageData();

    data.folder = page.value.frontmatter.folder;
    data.posts = page.value.postsData.posts;
    data.postsTreeData = buildPostsTreeData(data.folder, data.posts);
    data.currentFolder = data.postsTreeData;
    data.tags = ["all", ...page.value.postsData.tags];

    onMounted(() => {
      if (location.hash) {
        data.currentTag = location.hash.slice(1);
      }
      if (location.search) {
        const searchStr = location.search.slice(1);
        data.folderList = new URLSearchParams(searchStr).getAll("folder");
        if (data.folderList.length > 0) {
          let folder = data.postsTreeData;
          for (let i = 0; i < data.folderList.length; i++) {
            const subFolderName = data.folderList[i];
            const subFolderItem = folder.children.find((item) => {
              return item.name === subFolderName;
            });
            if (!subFolderItem) break;
            folder = subFolderItem;
          }
          data.currentFolder = folder;
        }
      }

      window.onhashchange = function (event) {
        data.currentTag = location.hash.slice(1);
      };

      // listen layout change and window resize event to re-calculate container size
      const getSize = () => {
        data.treeWidth = data.bodyContainer.clientWidth;
        data.treeHeight =
          data.bodyContainer.clientHeight - data.navContainer.$el.clientHeight;
      };

      watch(
        () => data.layout,
        (newValue, prevValue) => {
          if (newValue === "tree") {
            nextTick(() => {
              getSize();
            });
          }
        }
      );

      let resizeTimer = null;
      window.onresize = () => {
        if (resizeTimer) {
          clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(() => {
          getSize();
          resizeTimer = null;
        }, 300);
      };
    });

    // set current folder content
    const folderContent = computed(() => {
      let content = data.currentFolder.children;

      content.sort((itemA, itemB) => {
        if (itemA.type === "folder" && itemB.type === "folder") {
          return itemB.children.length - itemA.children.length;
        }
        if (itemA.type === "folder" && itemB.type !== "folder") {
          return -1;
        } else if (itemA.type !== "folder" && itemB.type === "folder") {
          return 1;
        } else if (itemA.type === "post" && itemB.type === "post") {
          let timeA = null;
          let timeB = null;
          if (data.sortByUpdated) {
            timeA = itemA.updatedTime || itemA.date || itemA.createdTime;
            timeB = itemB.updatedTime || itemB.date || itemB.createdTime;
          } else {
            timeA = itemA.date || itemA.createdTime;
            timeB = itemB.date || itemB.createdTime;
          }
          if (timeA && timeB) {
            return data.sortType === "descend"
              ? new Date(timeB) - new Date(timeA)
              : new Date(timeA) - new Date(timeB);
          } else {
            return 0;
          }
        }
      });
      return content;
    });

    // set breadcrumb navigation
    const breadcrumb = computed(() => {
      let folderArr = [];
      folderArr.unshift(data.currentFolder);

      let folder = data.currentFolder;
      while (folder.parent) {
        folderArr.unshift(folder.parent);
        folder = folder.parent;
      }
      return folderArr;
    });

    const refData = toRefs(data);

    return {
      ...refData,
      setCollectionHandler,
      closeCollectionModalHandler,
      setFolderHandler,
      folderContent,
      breadcrumb,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>