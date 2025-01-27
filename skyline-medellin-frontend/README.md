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

### Estructura del Proyectoskyline-medellin-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── room1.jpg
│   ├── components/
│   │   └── RoomCard.tsx
│   ├── hooks/
│   ├── layouts/
│   │   └── DefaultLayout.tsx
│   ├── pages/
│   │   ├── Hotels/
│   │   │   └── CreateHotel.tsx
│   │   ├── HotelSearchPage.tsx
│   │   └── Rooms/
│   │       └── RoomsForm.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   └── hotelsSlice.ts
│   ├── types/
│   ├── App.tsx
│   └── index.tsx
├── .gitignore
├── package.json
└── README.md

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