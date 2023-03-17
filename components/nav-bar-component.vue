<template>
  <nav class="w-full p-6 bg-transparent">
    <div class="flex items-center justify-end">
      <div class="md:hidden">
        <button @click="drawer">
          <svg
            class="h-8 w-8 fill-current text-black"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div class="hidden md:block">
        <ul class="flex space-x-8 text-sm font-sans">
          <li>
            <NuxtLink
              exact
              to="/"
              :replace="true"
              @click.prevent="isOpen = false"
            >
              Criptoativos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              exact
              to="/aggregate-page"
              :replace="true"
              @click.prevent="isOpen = false"
            >
              Estatística
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              exact
              to="/currency-conversion-page"
              :replace="true"
              @click.prevent="isOpen = false"
            >
              Conversor
            </NuxtLink>
          </li>
        </ul>
      </div>

      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen"
          class="z-10 fixed inset-0 transition-opacity"
          @keydown.esc="isOpen = false"
        >
          <div
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
            @click="isOpen = false"
          />
        </div>
      </transition>

      <aside
        class="p-5 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="close">
          <button
            class="absolute top-0 right-0 mt-4 mr-4"
            @click="isOpen = false"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <span
          class="flex w-full items-center p-4 border-b"
          @click="isOpen = false"
        />

        <ul class="divide-y font-sans">
          <li>
            <NuxtLink
              exact
              to="/"
              class="my-4 inline-block"
              :replace="true"
              @click.prevent="isOpen = false"
            >
              Criptoativos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              exact
              to="/aggregate-page"
              class="my-4 inline-block"
              :replace="true"
              @click.prevent="isOpen = false"
            >
              Estatística
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              exact
              to="/currency-conversion-page"
              :replace="true"
              @click.prevent="isOpen = false"
            >
              Conversor
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
