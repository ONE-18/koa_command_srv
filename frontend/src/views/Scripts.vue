<template>
  <defaultLayout>
    <div class="scripts">
      <h1>Scripts</h1>
      <p>Bienvenido a tu página de scripts.</p>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Endpoint route</th>
            <th>Endpoint petition</th>
            <th>Lenguaje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="script in scripts" :key="script._id">
            <td>{{ script.name }}</td>
            <td>{{ endpoints.find((endp) => endp._id == script.endpointId)?.route }}</td>
            <td>{{ endpoints.find((endp) => endp._id == script.endpointId)?.petitionType }}</td>
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
import axiosInstance from '../utils/axiosInstance'
import type { Script } from '../types/Script'
import type { Endpoint } from '../types/Endpoint'

const scripts = ref<Script[]>([])
const endpoints = ref<Endpoint[]>([])

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/scripts')
    scripts.value = response.data
    console.log('Scripts:', scripts.value)
  } catch (error) {
    console.error('Error fetching scripts:', error)
  }

  // Get endpoint names from IDs
  scripts.value.forEach(async (script) => {
    try {
      const response = await axiosInstance.get(`/endpoint/${script.endpointId}`)
      endpoints.value.push(response.data)
    } catch (error) {
      console.error('Error fetching endpoint by id:', error)
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
