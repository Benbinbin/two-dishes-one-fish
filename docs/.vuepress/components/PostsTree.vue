<template>
  <svg
    v-bind="$attrs"
    v-show="layout === 'tree'"
    class="tree-diagram select-none"
    :viewBox="viewBox"
  >
    <g
      :transform="`translate(${transform.x}, ${transform.y}) scale(${transform.k}) `"
    >
      <g
        class="links-container"
        fill="none"
        stroke="#E5E7EB"
        stroke-opacity="1"
        stroke-width="1.5"
      >
        <path
          v-for="link of linksData"
          :key="link.target.id"
          :d="linkPathGenerator(link)"
        ></path>
      </g>
      <g
        class="nodes-cotainer"
        pointer-events="all"
        style="font: 14px sans-serif"
      >
        <g
          v-for="node of nodesData"
          :key="node.id"
          cursor="pointer"
          @click="clickHandler(node)"
          :transform="`translate(${node.y}, ${node.x})`"
        >
          <text
            dy="0.35em"
            :x="node.parent ? '0.8em' : '-0.8em'"
            :text-anchor="node.parent ? 'start' : 'end'"
            :font-weight="node.parent ? 'normal' : 'bold'"
            stroke-linejoin="round"
            stroke-width="5"
            stroke="#fff"
          >
            {{ textGenerator(node) }}
          </text>
          <text
            dy="0.35em"
            :x="node.parent ? '0.8em' : '-0.8em'"
            :text-anchor="node.parent ? 'start' : 'end'"
            :font-weight="node.parent ? 'normal' : 'bold'"
          >
            {{ textGenerator(node) }}
          </text>

          <svg
            v-if="node.data.type === 'post'"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#9CA3AF"
            viewBox="0 0 16 16"
            x="-0.6em"
            y="-0.6em"
          >
            <path
              d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"
            />
          </svg>
          <svg
            v-if="node.data.type === 'folder'"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            :fill="node.children ? '#93C5FD' : '#60A5FA'"
            viewBox="0 0 16 16"
            x="-0.6em"
            y="-0.6em"
          >
            <path
              d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"
            />
          </svg>
          <svg
            v-if="node.data.type === 'root'"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#60A5FA"
            viewBox="0 0 16 16"
            x="-0.6em"
            y="-0.6em"
          >
            <path
              d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"
            />
          </svg>
          <title>{{ textGenerator(node, "full") }}</title>
        </g>
      </g>
    </g>
  </svg>
  <div
    v-show="layout === 'tree'"
    class="p-8 flex justify-between items-center fixed bottom-0 inset-x-0 z-10"
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
        title="重置缩放比例"
        @click="resizeTransform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"
          />
          <path
            d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"
          />
        </svg>
        <span class="text-xs hidden sm:block">Resize</span>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch, onMounted } from "vue";
import * as d3 from "d3";

export default {
  props: ["layout", "width", "height", "postsData"],
  setup(props) {
    const data = reactive({
      nodesData: [],
      linksData: [],
      transform: {
        x: 0,
        y: 0,
        k: 1,
      },
      clickHandler: () => {},
    });

    // tree size
    const dx = 28;
    // node width, each time show 3 node and 2 line
    const dy = computed(() => {
      return props.width / 5;
    });
    const viewBox = computed(() => {
      return `${-dy.value}, ${-props.height / 2}, ${props.width}, ${
        props.height
      }`;
    });

    // build tree
    let treeData = null;
    const setTreeData = () => {
      treeData = d3.hierarchy(props.postsData);
      treeData.descendants().forEach((d, i) => {
        d.id = i;
        if (d.children) d._children = d.children;
        if (d.children && d.depth >= 2) d.children = null;
      });
    };

    const buildTree = () => {
      if (treeData) {
        const tree = d3.tree().nodeSize([dx, dy.value])(treeData);
        data.nodesData = tree.descendants();
        data.linksData = tree.links();
      }
    };

    const linkPathGenerator = (link) => {
      const linkGenerator = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);
      return linkGenerator(link);
    };

    const textGenerator = (node, type = "truncate") => {
      // text max width
      const len = Math.floor(dy.value / 14);
      let text = "";

      if (node.data.children) {
        text = node.data.name;
      } else {
        text = node.data.data.title;
      }

      if (text.length > len && type === "truncate") {
        return `${text.substr(0, len).trim()}...`;
      } else {
        return text;
      }
    };

    // listen window resize and current folder change
    let { width, height, postsData } = toRefs(props);

    watch([width, height], (newValues, prevValues) => {
      buildTree();
    });

    watch(postsData, (newValues, prevValues) => {
      setTreeData();
      buildTree();
    });

    // listen zoom event
    const zoomHandler = (event) => {
      data.transform = event.transform;
    };
    let zoom = null;
    onMounted(() => {
      zoom = d3.zoom().scaleExtent([0.5, 5]).on("zoom", zoomHandler);
      d3.select(".tree-diagram").call(zoom);
    });

    const resizeTransform = () => {
      d3.select(".tree-diagram")
        .transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity);
    };

    // open post page or expand folder
    onMounted(() => {
      data.clickHandler = (node) => {
        if (node.data.type === "post") {
          window.open(`${__BASE__}${node.data.data.pathRelative}`);
        } else if (node.data.type === "folder") {
          if (!node.parent) return;
          if (node.children) {
            node.children = null;
            adjustTransform(node, false);
          } else {
            node.children = node._children;
            adjustTransform(node, true);
          }
          buildTree();
        }
      };
    });

    const adjustTransform = (d, isExpand) => {
      /**
       * if expand sub tree, move folder node to center
       * if contract sub tree, move the parent node to center
       */
      let scale = 1;
      let x, y;
      if (isExpand) {
        // expand sub tree
        x = d.y;
        y = d.x;
      } else {
        // contract sub tree
        x = d.parent.y;
        y = d.parent.x;
      }

      // d3.zoomIdentity represend coordinate=[0, 0] and scale=1
      d3.select(".tree-diagram")
        .transition()
        .duration(500)
        .call(zoom.transform, d3.zoomIdentity.translate(-x, -y).scale(scale));
    };

    // init build tree
    setTreeData();
    buildTree();

    const refData = toRefs(data);
    return {
      ...refData,
      viewBox,
      linkPathGenerator,
      textGenerator,
      resizeTransform,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>