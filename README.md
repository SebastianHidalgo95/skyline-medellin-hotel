# Skyline Medellin Hotel

Skyline Medellin Hotel es una aplicación web para buscar y reservar habitaciones de hotel. Los usuarios pueden buscar hoteles por ciudad, seleccionar habitaciones y realizar reservas.

## Características

- Búsqueda de hoteles por ciudad, fecha de entrada, fecha de salida y número de huéspedes.
- Selección de habitaciones de hotel.
- Formulario de reserva para ingresar los datos de los huéspedes.
- Notificación de reserva por correo electrónico.

## Tecnologías Utilizadas

- React
- Redux
- TypeScript
- Tailwind CSS
- React Router
- React Select
- React Country State City

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado Node.js y npm en tu máquina.

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/skyline-medellin-hotel.git
cd skyline-medellin-hotel/skyline-medellin-frontend
```

### Description of Project Structure

- **public/**: Contains public assets like images and other static files.
- **src/**: The main source code directory for the application.
  - **assets/**: Contains images and other asset files.
  - **components/**: Reusable components like `RoomCard.tsx`.
  - **hooks/**: Custom React hooks.
  - **layouts/**: Layout components like `DefaultLayout.tsx` for page structure.
  - **pages/**: Different pages of the application.
    - **Hotels/**: Components and pages related to hotels (e.g., `CreateHotel.tsx`).
    - **Rooms/**: Components and pages related to rooms (e.g., `RoomsForm.tsx`).
    - **HotelSearchPage.tsx**: The page for searching hotels.
  - **redux/**: Contains Redux related files.
    - **store.ts**: Redux store configuration.
    - **hotelsSlice.ts**: Redux slice for hotel-related state management.
  - **types/**: TypeScript type definitions.
  - **App.tsx**: The main application component.
  - **index.tsx**: The entry point for the React app.

- **.gitignore**: Specifies files and directories that should not be tracked by Git.
- **package.json**: The configuration file for the project's dependencies and scripts.
- **README.md**: The file you are currently reading.

### Uso
- Buscar Hoteles
- Navega a la página de búsqueda de hoteles.
- Selecciona la ciudad, fecha de entrada, fecha de salida y número de huéspedes.
- Haz clic en "Search" para ver los resultados.
- Reservar una Habitación
- Selecciona un hotel de los resultados de búsqueda.
- Elige una habitación disponible.
- Completa el formulario de reserva con los datos de los huéspedes.
- Haz clic en "Reserve Room" para completar la reserva.