<template>
  <div
    id="BANNER"
    class="w-full pt-[55px] pb-8 md:py-0 md:min-h-screen md:h-screen bg-[url('/image/laptop.jpg')] bg-blend-multiply bg-cover bg-top bg-fixed flex flex-col justify-center px-1 relative parallelogram after:huge:rotate-[0.5deg] after:border-[#FF6347] after:border-b-0"
    style="background-color: rgba(216, 216, 216, 1)"
  >
    <div
      class="w-full max-w-[1200px] max-h-[876px] h-[30vw] bg-white mx-auto border-2 border-[#222] relative overflow-hidden"
      style="border-radius: 55px 225px 15px 25px/25px 25px 35px 355px"
    >
      <button
        class="absolute md:right-[1rem] md:top-[1rem] right-[0.5rem] top-[0.5rem] btn-reset md:hover:animate-[shake_1s]"
        v-if="!hiddenBanner"
        @click="showAnimation"
      >
        <img
          src="/image/play.svg"
          class="md:w-[45px] md:h-[45px] w-[30px] h-[30px]"
          alt="play"
        />
      </button>
      <button
        class="absolute md:right-[1rem] md:top-[1rem] right-[0.5rem] top-[0.5rem] btn-reset"
        :class="{ 'animate-spin': animating }"
        v-else
        @click="refreshAnimation"
      >
        <img
          src="/image/refresh.png"
          class="md:w-[45px] md:h-[45px] w-[30px] h-[30px]"
          alt="refresh"
        />
      </button>
      <!-- 三D立體字 -->
      <div
        ref="rendererContainer"
        class="three-container"
        v-show="hiddenBanner && !animating"
      ></div>
      <div
        v-if="!hiddenBanner"
        class="w-full h-full bg-[url('/image/banner.jpg')] bg-[length:100%_auto] md:hover:bg-[length:125%_auto] bg-center bg-no-repeat transition-all"
      ></div>
      <div
        class="w-full h-full font-cabin text-[#222222] flex flex-col justify-center"
        v-else
      >
        <p
          class="w-full text-[6vw] text-center"
          :class="{
            'animate-slide-left-fade': animating,
          }"
          @animationend="handleAnimationEnd"
          v-show="!animationStopped"
        >
          Welcome
        </p>
        <p
          class="w-full text-[6vw] text-center"
          :class="{
            'animate-slide-right-fade': animating,
          }"
          v-show="!animationStopped"
        >
          My website.
        </p>
      </div>
    </div>
    <!-- TODO: 跑馬燈 -->
    <Marquee />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import Marquee from "./Marquee.vue";

const rendererContainer = ref(null);

const hiddenBanner = ref(false);

const animating = ref(false);

const animationStopped = ref(false);

let timer = ref<null | ReturnType<typeof setTimeout>>(null);

const showAnimation = () => {
  hiddenBanner.value = true;
  animating.value = true;
  timer.value = setTimeout(() => {
    animating.value = false;
    animationStopped.value = true;
  }, 1000);
};

const handleAnimationEnd = (event: { animationName: string }) => {
  if (event.animationName === "fade-out1") {
    animating.value = false;
  }
};

const refreshAnimation = () => {
  if (animating.value) return;
  if (timer.value) clearTimeout(timer.value);
  animationStopped.value = false;
  animating.value = true;
  timer.value = setTimeout(() => {
    animating.value = false;
    animationStopped.value = true;
  }, 1000);
};

// 定義需要在多個生命週期中使用的變數
let scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.WebGLRenderer;

function render() {
  if (!renderer || !scene || !camera) return;
  renderer.render(scene, camera);
}

function init() {
  const container = rendererContainer.value;
  if (!container) return;
  const width = (container as HTMLElement).clientWidth;
  const height = (container as HTMLElement).clientHeight;

  // 建立相機，根據容器比例設定 aspect
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  // 根據需求調整相機位置，這裡將相機移到 Z 軸正方向
  camera.position.set(0, 0, 600);

  //Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ffffff");

  const loader = new FontLoader();
  loader.load(
    "/fonts/helvetiker_regular.typeface.json",
    function (font: { generateShapes: (arg0: string, arg1: number) => any }) {
      const messages = "I Need A Job!!!";

      const color = "#000000";
      // 建立 Mesh
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });

      const shapes = font.generateShapes(messages, 100);

      const geometry = new THREE.ShapeGeometry(shapes);

      geometry.computeBoundingBox();

      const xMid = geometry.boundingBox
        ? -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
        : 0;

      geometry.translate(xMid, 0, 0);

      const textMesh = new THREE.Mesh(geometry, material);

      textMesh.position.set(0, 0, -150);

      scene.add(textMesh);

      const matDark = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      });

      const holeShapes = [];

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        if (shape.holes && shape.holes.length > 0) {
          for (let j = 0; j < shape.holes.length; j++) {
            const hole = shape.holes[j];
            holeShapes.push(hole);
          }
        }
      }

      shapes.push.apply(shapes, holeShapes);

      const lineText = new THREE.Object3D();

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        const points = shape.getPoints();
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        geometry.translate(xMid, 0, 0);

        const lineMesh = new THREE.Line(geometry, matDark);
        lineText.add(lineMesh);
      }

      scene.add(lineText);

      render();
    }
  );

  // 建立渲染器並設定尺寸
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  if (rendererContainer.value) {
    (rendererContainer.value as HTMLElement).appendChild(renderer.domElement);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.update();

  controls.addEventListener("change", render);
}

function setSize() {
  if (!camera || !renderer) return;
  const container = rendererContainer.value;
  if (!container) return;
  const width = (container as HTMLElement).clientWidth;
  const height = (container as HTMLElement).clientHeight;

  (camera as THREE.PerspectiveCamera).aspect = width / height;
  (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  renderer.setSize(width, height);

  render();
}

const resizeObserver = new ResizeObserver(setSize);

onMounted(() => {
  init();
  if (rendererContainer.value) {
    resizeObserver.observe(rendererContainer.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.three-container {
  width: 100%;
  max-width: 1200px;
  height: 30vw;
  overflow: hidden;
  margin: 0 auto;
  cursor: pointer;
}
.three-container:deep(canvas) {
  width: 100%;
  height: 100%;
}
</style>
