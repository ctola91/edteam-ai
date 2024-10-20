<script setup lang="ts">
import Logo from "/logo.png"
</script>
<template>
  <UContainer as="div" class="p-4 flex justify-center align-center">
    <UCard class="w-80">
      <div>
        <img :src="Logo" alt="logo" width="320" />
      </div>
      <template #footer>
        <div class="flex flex-row justify-between gap-2 flex-wrap">
          <UButton size="lg" color="indigo" label="Iniciar" block to="/game" />
          <UButton size="lg" color="gray" label="Generar Preguntas" block to="questions" />          
        </div>
      </template>
    </UCard>
  </UContainer>
</template>