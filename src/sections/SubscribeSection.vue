<script setup lang="ts">
import { ref } from "vue";
import Swal from "sweetalert2";

// Estados del formulario
let nombre = ref("");
let correo = ref("");
let celular = ref("");
let nombreError = ref(false);
let correoError = ref(false);
let celularError = ref(false);

// Expresiones regulares para validación
const phoneRegex = /^[3][0-9]{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let handleSubmit = async () => {
    // Reset errores
    nombreError.value = false;
    correoError.value = false;
    celularError.value = false;

    // Validaciones
    let hasErrors = false;
    
    if (!nombre.value.trim()) {
        nombreError.value = true;
        hasErrors = true;
    }
    
    if (!correo.value || !emailRegex.test(correo.value)) {
        correoError.value = true;
        hasErrors = true;
    }
    
    if (!celular.value || !phoneRegex.test(celular.value)) {
        celularError.value = true;
        hasErrors = true;
    }

    if (!hasErrors) {
        try {
            const response = await fetch("http://localhost:3001/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    nombre: nombre.value,
                    correo: correo.value,
                    celular: celular.value 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "¡Gracias!",
                    text: `${nombre.value}, tu información ha sido registrada exitosamente!`,
                });
                // Limpiar campos
                nombre.value = "";
                correo.value = "";
                celular.value = "";
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "No se pudo registrar la información.",
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al enviar la información.",
            });
        }
    }
};
</script>




<template>
    <!-- Newsletter Section Start -->
    <div id="subscribe" class="bg-[#fe5c19] mt-10">
        <div class="container w-full lg:w-3/5 xl:w-1/2 mx-auto px-5">
            <section class="py-12">
                <h4 class="text-sm tracking-widest uppercase text-center text-white/90 font-theme-heading">2,000+ Ya se han unido</h4>
                <h2 class="text-2xl md:text-3xl font-medium text-center text-white mt-6 mb-8 font-theme-heading">
                    Recibe novedades directamente en tu WhatsApp</h2>

                <form @submit.prevent="handleSubmit()" class="max-w-lg mx-auto">
                    <!-- Campos en grid responsive -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <!-- Campo Nombre -->
                        <div class="relative">
                            <input
                                v-model="nombre"
                                @input="nombreError = false"
                                class="w-full py-2.5 px-4 text-sm text-gray-700 bg-white/95 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 placeholder:text-gray-500"
                                type="text"
                                name="nombre"
                                placeholder="Nombre completo"
                            />
                            <div v-show="nombreError" class="absolute top-full left-0 right-0 text-xs text-white bg-red-500/90 px-2 py-1 rounded mt-1 z-10">
                                Nombre requerido
                            </div>
                        </div>

                        <!-- Campo Celular -->
                        <div class="relative">
                            <input
                                v-model="celular"
                                @input="celularError = false"
                                class="w-full py-2.5 px-4 text-sm text-gray-700 bg-white/95 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 placeholder:text-gray-500"
                                type="text"
                                name="celular"
                                placeholder="Celular"
                            />
                            <div v-show="celularError" class="absolute top-full left-0 right-0 text-xs text-white bg-red-500/90 px-2 py-1 rounded mt-1 z-10">
                                Número válido (ej: 3001234567)
                            </div>
                        </div>
                    </div>

                    <!-- Campo Correo (ancho completo) -->
                    <div class="relative mb-4">
                        <input
                            v-model="correo"
                            @input="correoError = false"
                            class="w-full py-2.5 px-4 text-sm text-gray-700 bg-white/95 backdrop-blur-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 placeholder:text-gray-500"
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico"
                        />
                        <div v-show="correoError" class="absolute top-full left-0 right-0 text-xs text-white bg-red-500/90 px-2 py-1 rounded mt-1 z-10">
                            Correo válido requerido
                        </div>
                    </div>

                    <!-- Botón de envío -->
                    <div class="text-center">
                        <Button type="submit" btn-type="secondary" class="px-8 py-2.5 text-sm font-medium">
                            Registrarme
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    </div>
    <!-- Newsletter Section End -->
</template>
