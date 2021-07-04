<template>
  <footer
    class="bg-gray-200 p-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
  >
    <div class="flex justify-center md:justify-start items-center">
      <a
        class="p-2 hover:bg-gray-300 rounded-md"
        :href="footerAvatarLink"
        target="_blank"
      >
        <img
          :src="$withBase(`/images/${avatar}`)"
          alt="avatar"
          class="w-10 h-10 rounded-full"
        />
      </a>
    </div>

    <div class="text-center space-y-0.5">
      <p class="text-sm text-gray-600">
        &copy;{{ new Date().getFullYear() }}
        <span class="author">{{ author }}</span
        >. All Right Reserved.
      </p>
      <p class="text-xs text-center text-gray-400">
        除特殊说明外，本站的文章遵循
        <a :href="footerLicenseLink" target="_blank" class="text-blue-400">{{
          footerLicense
        }}</a>
        协议
      </p>
      <p class="text-xs text-center text-gray-400">
        网站主题采用
        <a
          href="https://github.com/Benbinbin/two-dishes-one-fish"
          target="_blank"
          class="text-blue-400"
          >Two Dishes One Fish</a
        >
      </p>
    </div>

    <div
      class="
        btn-container
        flex
        justify-center
        md:justify-end
        items-center
        space-x-0.5
      "
    >
      <a
        class="p-2 hover:bg-gray-300 rounded-md"
        v-for="item of socialMedia"
        :key="item.name"
        :href="item.url"
        :target="item.name === 'email' ? '' : '_blank'"
      >
        <img
          :src="$withBase(`/images/icons/${item.logo}`)"
          :alt="item.name"
          class="w-auto h-6"
        />
      </a>
    </div>
  </footer>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup(props) {
    const data = reactive({
      author: "",
      avatar: "",
      footerAvatarLink: "",
      footerLicense: "",
      footerLicenseLink: "",
      socialMedia: [],
    });
    data.author = __AUTHOR__ || "";
    data.avatar = __AVATAR__ || "";
    data.footerAvatarLink = __FOOTER_AVATAR_LINK__ || "#";
    data.footerLicense = __FOOTER_LICENSE__ || "CC-BY-SA-4.0";
    data.footerLicenseLink =
      __FOOTER_LICENSE_LINK__ ||
      "https://creativecommons.org/licenses/by-sa/4.0/deed.en";
    data.socialMedia = __SOCIAL_MEDIA__ || [];

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>