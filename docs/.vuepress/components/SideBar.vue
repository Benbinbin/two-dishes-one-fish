<template>
  <div
    class="
      headings-container
      px-2
      space-y-2
      transition-all
      duration-300
    "
  >
    <a
      v-for="heading of headings"
      :key="heading.id"
      class="
        max-w-max
        p-2
        flex
        justify-start
        items-center
        hover:bg-gray-200
        rounded
        space-x-2
      "
      :class="{ 'bg-gray-200': heading.id === activeHeading }"
      :style="{ 'margin-left': `${heading.level * 5}px` }"
      :href="`#${heading.id}`"
    >
      <span class="text-xs" :class="`text-${levelColor(heading.level)}`">{{
        `H${heading.level}`
      }}</span>
      <span
        class="text-sm"
        :class="{
          'text-gray-600 font-light': heading.id !== activeHeading,
          'text-gray-900 font-bold': heading.id === activeHeading,
        }"
        >{{ heading.text }}</span
      >
    </a>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from "vue";

const levelSizemap = {
  2: 0.45,
  3: 0.35,
  4: 0.25,
  5: 0.2,
  6: 0.2,
};

const levelColorMap = {
  2: "red-400",
  3: "green-400",
  4: "blue-400",
  5: "gray-400",
  6: "gray-300",
};
export default {
  props: ["headings", "activeHeading"],
  setup(props) {
    const data = reactive({});

    // methods
    const levelColor = (level) => {
      return levelColorMap[level];
    };

    const levelSize = (level) => {
      return levelSizemap[level];
    };

    const dotStyle = (level) => {
      return {
        width: `${levelSizemap[level]}rem`,
        height: `${levelSizemap[level]}rem`,
        left: `${-levelSizemap[level] / 2}rem`,
      };
    };

    const refData = toRefs(data);
    return {
      ...refData,
      levelColor,
      levelSize,
      dotStyle,
    };
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(75, 85, 99, 0);
  border: 3px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.5);
}

.headings-container {
  overflow: overlay;
  height: 100vh;
  max-width: 60vw;
}
</style>