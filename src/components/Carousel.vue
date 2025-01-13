<template>
  <div class="carousel h-full" ref="carouselRef">
    <button
      v-for="(item, index) in sideProjects"
      :key="item.name"
      class="project hover:border-none focus:outline-none bg-[#222]"
      :class="{ center: projectActive === item.id }"
      :style="styleList[index]"
      @click="arrangeHandler(item.id)"
    >
      <img
        class="w-full h-full"
        :src="`/image/production${item.id}.png`"
        alt="demo"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";

interface Project {
  name: string;
  id: number;
  intro: string;
  href: string | null;
}

const props = defineProps<{ sideProjects: Project[]; projectActive: number }>();

const emit = defineEmits(["redirectPage", "selectProject", "handleSliding"]);

const styleList = ref<any[]>([]);

const setStyle = (values: any) => {
  if (values) {
    const {
      xtrans,
      scale,
      opacity,
      zIndex,
      pIndex,
      rotateY,
      rotateZ,
      transformOrigin,
    } = values;
    const transform = `translate(${xtrans - 50}%, ${
      0 - 50
    }%) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    const newStyleList = [...styleList.value];
    newStyleList[pIndex] = {
      zIndex,
      transform,
      display: opacity === 0 ? "none" : "inline-block",
      transition: "transform 0.5s",
      transformOrigin,
    };
    Object.assign(styleList.value, newStyleList);
  }
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

const carouselRef = ref(null);

const arrange = (centerIndex: number) => {
  const catesReference: any = carouselRef.value;
  if (catesReference.children) {
    styleList.value = [];
    const half = (props.sideProjects.length - 1) / 2;
    const before = [];
    for (let i = centerIndex - 1; before.length < half; i--) {
      const pIndex = mod(i, props.sideProjects.length);
      before.push({
        pIndex,
        zIndex: 0,
        xtrans: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        rotateZ: 0,
        transformOrigin: "right center",
      });
    }
    const after = [];
    for (
      let i = centerIndex + 1;
      after.length < props.sideProjects.length - before.length - 1;
      i++
    ) {
      const pIndex = mod(i, props.sideProjects.length);
      after.push({
        pIndex,
        zIndex: 0,
        xtrans: 0,
        scale: 1,
        opacity: 1,
        rotateY: 45,
        rotateZ: -150,
        transformOrigin: "left center",
      });
    }
    // console.log(before, after);
    const centerZIndex = Math.max(before.length, after.length) + 1;
    setStyle({
      pIndex: centerIndex,
      xtrans: 0,
      scale: 1,
      opacity: 1,
      zIndex: centerZIndex,
      rotateY: 0,
      rotateZ: 0,
      transformOrigin: "50% 50% 0",
    });
    [before, after].forEach((list: any, listIndex: number) => {
      let parentTrans = 0;

      if (list) {
        list.forEach((item: any, i: number) => {
          const scale = 0.8 ** (i + 1);
          const absolute = 105 * scale * 1.125 + parentTrans;
          parentTrans = absolute;
          const xtrans = (listIndex === 0 ? -1 : 1) * absolute;
          const opacity = Math.max(1 - 0.25 * (i / 2 + 1) ** 2, 0);
          const zIndex = Math.max(before.length, after.length) - i;
          const rotateY = item.rotateY;
          const rotateZ = item.rotateZ;
          const transformOrigin = item.transformOrigin;
          setStyle({
            pIndex: item.pIndex,
            xtrans,
            scale,
            opacity,
            zIndex,
            rotateY,
            rotateZ,
            transformOrigin,
          });
        });
      }
    });
  }
  setTimeout(() => {
    emit("handleSliding", false);
  }, 700);
};

const arrangeHandler = (id: number) => {
  if (props.projectActive === id) {
    emit("redirectPage");
    return;
  }
  emit("handleSliding", true);
  const index = props.sideProjects.findIndex((item: Project) => item.id === id);
  if (index >= 0) {
    emit("selectProject", id);
    arrange(index);
  }
};

onMounted(() => {
  nextTick(() => {
    arrange(props.projectActive);
  });
});
</script>

<style scoped>
.carousel {
  position: relative;
  z-index: 10;
  flex: 1;
  overflow-x: visible;
}
.carousel .project {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  width: 474px;
  height: 216px;
  padding: 0;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transform: translate(-50%, -50%);
}
</style>
