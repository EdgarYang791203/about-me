<template>
  <div
    class="bg-[tomato] rounded-md w-[96vw] max-w-[380px] md:w-[380px] relative contact-box opacity-0"
    :class="{
      'animate-[wobble_700ms] opacity-100': isIntersection,
    }"
    ref="sectionsRef"
  >
    <div class="flex px-[30px] pt-[20px] pb-[50px]">
      <img
        class="w-[96px] rounded-[50%]"
        src="/image/head-shot.jpeg"
        alt="head-shot"
      />
      <div class="pl-8 text-white flex flex-col justify-center">
        <p class="text-[22px] mb-[10px]">Hank Yang</p>
        <p class="text-sm">Hi, I'm Hank and I'm a web front-end developer.</p>
      </div>
      <div
        class="contact-btn transition-all cursor-pointer bg-[#eae1d3] text-[#4d6085] flex justify-center items-center border-b-2 border-[#4d6085]"
        :class="{ active: openSocialList }"
        @click="handleSocialList"
      >
        <p
          class="transition-all"
          :class="{
            'opacity-0 absolute z-[-1]': openSocialList,
            'opacity-100': !openSocialList,
          }"
        >
          contact me
        </p>
        <svg
          class="transition-all"
          :class="{
            'opacity-0 absolute z-[-1]': !openSocialList,
            'opacity-100': openSocialList,
          }"
          style="transition-delay: 0.5s"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <g class="nc-icon-wrapper" fill="#4d6085">
            <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"></path>
          </g>
        </svg>
      </div>
    </div>
    <div
      class="bg-[#4d6085] transition-all duration-700 max-h-0 overflow-hidden"
      :class="{ 'max-h-[100px]': openSocialList }"
      style="border-radius: 0 0 0.375rem 0.375rem"
    >
      <p class="py-4 px-8 text-[#eae1d3]">contact me</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "vue";
import { useIntersectionObserver } from "../composables/useIntersectionObserver";

const props = defineProps<{
  openSocialList: boolean;
}>();

const emit = defineEmits(["handleSocialList"]);

const handleSocialList = () => {
  const status = props.openSocialList;
  emit("handleSocialList", !status);
};

const { isIntersection, intersectionObserver } = useIntersectionObserver();

const sectionsRef = ref(null);

watchEffect(() => {
  if (isIntersection.value === false) {
    emit("handleSocialList", false);
  }
});

onMounted(() => {
  if (sectionsRef.value) {
    intersectionObserver(sectionsRef.value, {
      root: null,
      threshold: 0,
    });
  }
});
</script>

<style scoped>
.contact-box {
  transform-origin: bottom center;
  position: relative;
  z-index: 5;
}

.contact-btn {
  box-shadow: 0 8px 13px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(0, 0, 0, 0.06);
  transition-delay: 0.1s;
  border-radius: 30px;
  position: absolute;
  right: 90px;
  bottom: -24px;
  width: 200px;
  height: 48px;
}

.contact-btn p {
  transition: opacity 0.2s;
  transition-delay: 0.4s;
  width: 100%;
  text-align: center;
}

.contact-btn p::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;
  bottom: -28px;
  z-index: 3;
  border: solid 15px transparent;
  border-top-color: #eae1d3;
}

.contact-btn.active {
  right: 20px;
  bottom: 22px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.contact-btn.active p::after {
  display: none;
}
</style>
