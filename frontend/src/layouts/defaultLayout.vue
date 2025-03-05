<template>
  <div class="layout">
    <!-- Barra superior -->
    <header class="header">
      <!-- Flecha hacia atrás TODO: condicional para boton :disabled="isButtonDisabled" -->
      <button @click="goBack" class="icon-btn">◀</button>

      <!-- Botones de navegación -->
      <nav class="nav-buttons">
        <router-link to="/Scripts">Scripts</router-link>
        <router-link to="/Endpoints">Endpoints</router-link>
        <router-link to="/Logs">Logs</router-link>
      </nav>

      <!-- Menú desplegable -->
      <div class="menu-container">
        <button @click="toggleMenu" class="icon-btn">☰</button>
        <div v-if="menuOpen" class="menu">
          <router-link to="/Profile">Perfil</router-link>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </header>

    <!-- Contenido de la página -->
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)

const goBack = () => {
  router.go(-1)
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const logout = () => {
  console.log('Cerrar sesión')
  // Aquí puedes agregar la lógica real de logout
  // Por ejemplo, redirigir a la página de login
  // TODO: Implementar logout
  router.push('/login')
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #333;
  color: white;
}

.icon-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.nav-buttons a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  background: #555;
  border-radius: 5px;
}

.menu-container {
  position: relative;
}

.menu {
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  color: black;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 1000;
}

.menu a,
.menu button {
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}
</style>
