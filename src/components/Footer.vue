<script setup lang="ts">
import { computed } from "vue";

type social = { name: string; href: string; img: string };

const props = defineProps<{ isMobile: boolean }>();

const socialLinks: social[] = [
  {
    name: "f-github",
    img: "/image/github-icon.png",
    href: "https://github.com/EdgarYang791203",
  },
  {
    name: "f-codepen",
    img: "/image/codepen-icon.png",
    href: "https://codepen.io/hank73307/pens/public",
  },
  {
    name: "f-share",
    img: "/image/share-icon.png",
    href: "mailto:edgaryang791203@gmail.com",
  },
];

const links = computed(() =>
  props.isMobile ? socialLinks.slice(0, 2) : socialLinks
);
</script>

<template>
  <footer
    class="w-full px-2 py-[6px] bg-[#4d6085]"
    style="border-top: 2px solid tomato"
  >
    <div
      class="mx-auto container md:max-w-[1000px] flex items-center justify-between"
    >
      <div class="flex">
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          target="_blank"
          class="top-0 relative hover:top-[5px] hover:invert mr-4 md:mr-6"
          style="transition: all 0.5s cubic-bezier(0.36, 0.87, 0.63, -0.07)"
          event=""
          @click.prevent="
            $emit('redirectPage', { href: link.href, name: link.name })
          "
        >
          <img
            class="w-[30px] h-[30px] md:w-[48px] md:h-[48px]"
            :src="link.img"
            alt="github"
          />
        </a>
      </div>
      <p class="text-[#eae1d3] inline-block tracking-wide">
        © Copy right Feb 14,2024
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
