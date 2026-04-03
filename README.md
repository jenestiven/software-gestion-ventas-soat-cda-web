# Software Gestión Ventas SOAT & CDA

## ℹ️ Sobre el Proyecto

Aplicación web full-stack diseñada para la gestión de ventas de SOAT y servicios de CDA (Centro de Diagnóstico Automotor). La plataforma permite a los administradores y asesores llevar un control detallado de las ventas, gestionar usuarios, y visualizar reportes.

## 🚀 Tecnologías Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [Ant Design](https://ant.design/) y [Tailwind CSS](https://tailwindcss.com/)
- **Backend y Base de Datos:** [Firebase](https://firebase.google.com/) (Firestore, Authentication, Storage)
- **Gestión de Estado:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Visualización de Datos:** [ApexCharts](https://apexcharts.com/)
- **Testing:** [Jest](https://jestjs.io/) y [React Testing Library](https://testing-library.com/)

## 🏃‍➡️ Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [pnpm](https://pnpm.io/installation)

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/jenestiven/software-gestion-ventas-soat-cda-web.git
    cd software-gestion-ventas-soat-cda-web
    ```

2.  **Instala las dependencias:**

    ```bash
    pnpm install
    ```

3.  **Configura Firebase:**
    - Crea un proyecto en la [consola de Firebase](https://console.firebase.google.com/).
    - Registra una nueva aplicación web y obtén tus credenciales de Firebase.
    - Renombra el archivo `.env.local.example` a `.env.local` (si no existe, créalo) y agrega tus variables de entorno de Firebase.
    - Configura las reglas de Firestore y Storage según las necesidades de tu aplicación.

4.  **Ejecuta el servidor de desarrollo:**

    ```bash
    pnpm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📝 Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm start`: Inicia el servidor de producción.
- `pnpm lint`: Ejecuta el linter para verificar el código.
- `pnpm test`: Ejecuta los tests.

## 📂 Estructura del Proyecto

```
/src
├── app/         # Páginas y layouts de la aplicación (App Router)
├── components/  # Componentes reutilizables de React
├── firebase/    # Configuración del cliente y admin de Firebase
├── hooks/       # Hooks de React personalizados
├── lib/         # Lógica de negocio y wrappers de API
├── services/    # Servicios para interactuar con Firebase (Firestore, Storage, etc.)
├── store/       # Store de Zustand para gestión de estado global
├── types/       # Definiciones de tipos de TypeScript
└── utils/       # Funciones de utilidad
```
