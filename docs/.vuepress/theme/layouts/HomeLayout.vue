<template>
  <div class="bg-gray-100">
    <header
      class="
        h-screen
        flex flex-col
        justify-center
        items-center
        bg-gray-400
        text-white
      "
    >
      <h1 class="p-8 text-center text-5xl md:text-8xl font-bold">技术部落格</h1>
      <div class="container w-full p-8 flex justify-center items-center">
        <div class="before flex-grow h-0.5 bg-white"></div>
        <img
          class="flex-shrink-0 px-4 w-20 sm:w-24"
          :src="$withBase('/images/icons/tech-blog.svg')"
          alt="tech blog logo"
        />
        <div class="after flex-grow h-0.5 bg-white"></div>
      </div>
      <p class="p-8 text-center text-lg font-bold">
        我是
        <a
          class="hover:text-blue-400 underline font-bold transition-colors"
          href="https://benbinbin.github.io/Portfolio/"
          target="_blank"
          >{{ author }}</a
        >，该 blog 是我学习技术过程中做的笔记。
      </p>
    </header>

    <main class="px-8 py-16">
      <div
        class="
          container
          mx-auto
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        <button
          v-for="card of cards"
          :key="card.name"
          class="
            card
            rounded-2xl
            pl-6
            relative
            bg-cover bg-center bg-no-repeat
            hover:shadow-lg
            hover:text-blue-400
            text-white
            transition-all
          "
          :style="{
            backgroundImage:
              'url(' + $withBase(`/images/home/${card.image}`) + ')',
          }"
          @click.exact="clickHandler(card.name)"
          @click.ctrl.shift.exact="ctrlShiftClickHandler(card.name)"
        >
          <div class="card-body my-40 relative z-10">
            <h3 class="text-5xl text-left font-bold">{{ card.name }}</h3>
          </div>
        </button>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import { usePageFrontmatter } from "@vuepress/client";
import { reactive, toRefs, onMounted } from "vue";

export default {
  components: {
    Footer,
  },
  setup(props) {
    // data
    const data = reactive({
      author: "",
      cards: [],
      clickHandler: () => {},
      ctrlShiftClickHandler: () => {},
    });

    onMounted(() => {
      data.clickHandler = (value) => {
       const link = `postslist/${value.toLowerCase()}`;
        window.open(link);
      };

      data.ctrlShiftClickHandler = (value) => {
       const link = `folderslist/${value.toLowerCase()}`;
        window.open(link);
      };
    });

    data.author = __AUTHOR__ || "";
    data.cards = usePageFrontmatter().value.cards || [];

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped>
.card::after {
  content: "";
  background-color: rgba(0, 0, 0, 0.25);
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 1rem;
}
</style>