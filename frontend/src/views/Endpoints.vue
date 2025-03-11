<template>
  <defaultLayout>
    <div class="endpoints">
      <h1>Endpoints</h1>
      <p>Bienvenido a tu página de endpoints.</p>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Petition Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="endpoint in endpoints" :key="endpoint._id">
            <td>{{ endpoint.route }}</td>
            <td>{{ endpoint.petitionType }}</td>
            <td>
              <label class="switch">
                <input type="checkbox" v-model="endpoint.status" @change="toggleStatus(endpoint)">
                <span class="slider round"></span>
              </label>
            </td>
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
import type { Endpoint } from '../types/Endpoint'

const endpoints = ref<Endpoint[]>([])

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/endpoints')
    // console.log('Endpoints:', response.data)

    endpoints.value = response.data
  } catch (error) {
    console.error('Error fetching endpoints:', error)
  }
})

const toggleStatus = async (endpoint: Endpoint) => {
  try {
    await axiosInstance.patch(`/endpoint/${endpoint._id}`, { endpoint })
    console.log('Status updated successfully')
  } catch (error) {
    console.error('Error updating status:', error)
  }
}
</script>

<style scoped>
.endpoints {
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

 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ff0000;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

/* input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
} */

input:checked + .slider:before {
  -webkit-transform: translateX(23px);
  -ms-transform: translateX(23px);
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
} 

</style>
