# Product Manager

Este proyecto es un módulo de gestión de productos para un sistema de ventas, implementado utilizando **Vite** y con integración de una base de datos no relacional (Firebase). El sistema incluye funcionalidades de inicio de sesión y permite la administración eficiente de productos.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Requisitos](#requisitos)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración de Firebase](#configuración-de-firebase)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Instalación

Sigue los siguientes pasos para instalar y ejecutar el proyecto localmente:

#### 1. Clona este repositorio:
 ```bash
git clone https://github.com/Mariley20/product-manager.git
```
#### 2. Navega al directorio del proyecto:
 ```bash
cd product-manager
```
#### 3. Instala las dependencias:
 ```bash
npm install
```
#### 4. Inicia el servidor de desarrollo:
 ```bash
npm run dev
```
#### 5. Abre tu navegador en `http://localhost:5173` para ver el proyecto en ejecución.

## Requisitos
-   Node.js (versión 18o superior)
-   npm o yarn (gestor de paquetes)

## Scripts Disponibles

En el proyecto puedes ejecutar los siguientes scripts:

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Genera una versión optimizada para producción.
-   `npm run preview`: Previsualiza la versión optimizada.
-   `npm run lint`: Ejecuta linter para revisar el código.

## Configuración de Firebase

Este proyecto utiliza Firebase como base de datos. Para configurar Firebase:

1.  Crea un proyecto en Firebase Console.

2.  En el proyecto de Firebase, habilita **Firestore** y **Authentication**.

3.  Genera tus credenciales de Firebase y agrégalas a un archivo `.env` en la raíz del proyecto:

```bash 
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```
