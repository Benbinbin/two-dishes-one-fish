<template>
  <div class="headings-container">
    <ul
      class="
        max-w-max
        m-2
        pl-7
        xl:pl-16
        2xl:pl-20
        py-4
        opacity-50
        hover:opacity-100
        transition-all
        duration-300
      "
    >
      <li
        v-for="heading of headings"
        :key="heading.id"
        class="flex justify-start items-center relative"
      >
        <span
          class="opacity-0 absolute -left-7 text-xs"
          :class="`text-${levelColor(heading.level)}`"
          >{{ `H${heading.level}` }}</span
        >
        <div
          class="
            dot-icon
            absolute
            ring-4
            opacity-0
            ring-opacity-50
            rounded-full
          "
          :class="`bg-${levelColor(heading.level)} ring-${levelColor(
            heading.level
          )}`"
          :style="dotStyle(heading.level)"
        ></div>
        <a
          :href="`#${heading.id}`"
          class="border-l border-dashed border-gray-400 text-sm"
          :class="{
            'text-gray-400 dfont-light': heading.id !== activeHeading,
            'text-gray-900 font-bold': heading.id === activeHeading,
          }"
        >
          <p class="px-3 py-2 hover:bg-gray-100 rounded">{{ heading.text }}</p>
        </a>
      </li>
    </ul>
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
.headings-container {
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(75, 85, 99, 0);
    border: 3px solid transparent;
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(75, 85, 99, 0.5);
  }

  ul {
    max-height: 60vh;
    overflow: overlay;
    &:hover {
      li > span,
      .dot-icon {
        opacity: 1;
      }
    }
  }
}
</style>