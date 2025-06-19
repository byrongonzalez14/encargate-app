<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";

// Estado del número de celular
let phone = ref("");
let phoneError = ref(false);

// Expresión regular para validar número celular colombiano (10 dígitos, sin símbolos)
const phoneRegex = /^[3][0-9]{9}$/;

let handleSubmit = async () => {
    if (!phone.value || !phoneRegex.test(phone.value)) {
        phoneError.value = true;
    } else {
        try {
            const response = await fetch("https://encargate-api.onrender.com/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone: phone.value }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Gracias",
                    text: `${phone.value} se ha suscrito a nuestro boletín por WhatsApp!`,
                });
                phone.value = ""; // Limpiar campo
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "No se pudo registrar el número.",
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al enviar el número.",
            });
        }
    }
};
</script>




<template>
    <!-- Newsletter Section Start -->
    <div id="subscribe" class="bg-[#fe5c19] mt-10">
        <div class="container w-full lg:w-2/5 mx-auto px-5">
            <section class="py-16">
                <h4 class="text-sm tracking-widest uppercase text-center text-white font-theme-heading">2,000+ Ya se han unido</h4>
                <h2 class="text-3xl md:text-4xl font-medium text-center text-white mt-9 mb-10 font-theme-heading">
                    Recibe novedades directamente en tu WhatsApp</h2>

                <form @submit.prevent="handleSubmit()">
                    <div class="relative flex flex-col items-center lg:flex-row justify-center lg:space-x-3">
                        <div class="relative w-full lg:mb-0 font-theme-content">
                            <input
                                v-model="phone"
                                @input="phoneError = false"
                                class="w-full py-3 px-5 text-sm text-gray-600 border-0 shadow-md rounded focus:ring-4 focus:ring-blue-300"
                                type="text"
                                name="newsletter_phone"
                                placeholder="Escribe tu número de celular"
                            />
                            <div v-show="phoneError">
                                <img class="absolute right-3 top-3" src="/images/icon-error.svg" alt="Error Icon" />
                                <div class="absolute w-full text-xs italic px-2 py-1 bg-theme-secondary text-white rounded">
                                    Ingresa un número válido (Ej: 3001234567)
                                </div>
                            </div>
                        </div>

                        <Button type="submit" btn-type="secondary">Suscríbete</Button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    <!-- Newsletter Section End -->
</template>
