<template>
  <defaultLayout>
    <div class="scripts">
      <h1>Scripts</h1>
      <p>Bienvenido a tu página de scripts.</p>
      <button @click="navigateToCreate">Crear Nuevo Script</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Endpoint route</th>
            <!-- <th>Endpoint petition</th> -->
            <th>Lenguaje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="script in scripts" :key="script._id">
            <td>
              <a :href="`/Editor/${script._id}`">
                {{ script.name }}
              </a>
            </td>

            <td>
              <a :href="`/Endpoints`">
                {{ endpoints.find((endp) => script._id == endp.scriptId)?.route }}
              </a>
            </td>

            <td>{{ script.language }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </defaultLayout>
</template>

<script setup lang="ts">
import defaultLayout from '../layouts/defaultLayout.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../utils/axiosInstance'
import type { Script } from '../types/Script'
import type { Endpoint } from '../types/Endpoint'

const scripts = ref<Script[]>([])
const endpoints = ref<Endpoint[]>([])
const router = useRouter()

const navigateToCreate = () => {
  router.push('/Editor')
}

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/scripts')
    scripts.value = response.data
    console.log('Scripts:', scripts.value)
  } catch (error) {
    console.error('Error fetching scripts:', error)
  }

  // Get endpoints by script IDs
  scripts.value.forEach(async (script) => {
    try {
      const response = await axiosInstance.get(`/endpoints?scriptId=${script._id}`)
      endpoints.value.push(...response.data)
    } catch (error) {
      console.error('Error fetching endpoints by script id:', error)
    }
    console.log('Endpoints:', endpoints.value)
  })
})
</script>

<style scoped>
.scripts {
  padding: 20px;
  text-align: center;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
