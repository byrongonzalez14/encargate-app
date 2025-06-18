<template>
  <div id="beneficios" class="container mx-auto px-5">
    <section class="py-16">
      <!-- Título y descripción -->
      <div class="w-4/5 md:w-3/5 mx-auto">
        <h2 class="text-3xl md:text-4xl font-semibold font-theme-heading text-center">Beneficios</h2>
        <p class="text-theme-grayish-blue text-center mt-7 font-theme-content text-lg">
          En Encárgate, te ayudamos a conseguir más clientes sin perder tiempo buscándolos. Tus servicios se sincronizan entre dispositivos para que puedas atender solicitudes, agendar tareas y seguir tu trabajo desde donde estés.
        </p>
      </div>

      <!-- Tabs -->
      <div class="mt-10">
        <ul class="flex flex-col items-center md:flex-row justify-center font-theme-heading">
          <li
            v-for="feature in features"
            :key="feature.id"
            :class="isOpen === feature.id ? 'md:border-b-4 md:border-theme-secondary' : ''"
            class="w-full md:w-56 cursor-pointer hover:text-theme-secondary transition duration-200 border-b-2 border-t-2 md:border-t-0 flex justify-center"
          >
            <a
              @click.prevent="handleTabClick(feature.id)"
              href="#"
              :class="isOpen === feature.id ? 'border-theme-secondary' : ''"
              class="py-5 md:border-b-0 border-b-4"
            >
              {{ feature.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Contenido del tab activo -->
      <div ref="tabContent" class="mt-16">
        <template v-for="feature in features" :key="feature.id">
          <div v-show="isOpen === feature.id" class="grid gap-32 lg:grid-cols-2 items-center">
            <div class="relative">
              <img class="z-10 w-full" :src="feature.details.imageUrl" />
              <div
                class="-z-10 bg-theme-primary h-52 w-96 sm:h-80 sm:w-full rounded-r-full absolute -left-56 -bottom-16"
              ></div>
            </div>
            <div>
              <h3 class="font-theme-heading text-2xl md:text-3xl font-medium text-center lg:text-left">
                {{ feature.details.title }}
              </h3>
              <p class="mt-7 font-theme-content text-lg text-theme-grayish-blue text-center lg:text-left">
                {{ feature.details.description }}
              </p>
              <div class="flex justify-center lg:justify-start mt-7">
                <LinkButton btn-type="primary" :link="feature.details.link">Más información</LinkButton>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>


<script setup>

import features from '../data/features.js';
import { ref, nextTick } from 'vue';

// Lista de pestañas con su contenido


// Estado de la pestaña activa
const isOpen = ref(1);

// Referencia al contenedor del contenido de la pestaña
const tabContent = ref(null);

// Cuando se hace clic en una pestaña
const handleTabClick = async (id) => {
  isOpen.value = id; // Cambia la pestaña activa

  // Espera a que el contenido se renderice antes de hacer scroll
  await nextTick();

  // Scroll al contenido
  if (tabContent.value) {
    const top = tabContent.value.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }
};
</script>
