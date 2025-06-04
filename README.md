# minimarket-react

npm install
npm install react-router-dom@6
npm install @reduxjs/toolkit react-redux
npm install react-hook-form yup @hookform/resolvers
# Instalar TailwindCSS versión 3
npm install -D tailwindcss@3
npx tailwindcss init
npm install -D tailwindcss postcss autoprefixer
npm install --save-dev prettier
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm install --save-dev jsdom

# Guía de Estilos - Minimarket

## 🎨 Paleta de Colores

### Colores Principales
- **Primary (Azul)**: Para botones principales, enlaces y elementos de navegación
- **Secondary (Verde)**: Para acciones de éxito, precios y confirmaciones
- **Accent (Rojo)**: Para alertas, eliminaciones y promociones

### Colores de Estado
- **Success**: Verde para operaciones exitosas
- **Warning**: Amarillo para advertencias
- **Error**: Rojo para errores
- **Info**: Azul claro para información

## 🔤 Tipografía
- **Fuente principal**: Inter
- **Tamaños**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

## 🧩 Componentes Base

### Botones
```jsx
// Botón primario
<button className="btn btn-primary">Comprar</button>

// Botón secundario
<button className="btn btn-secondary">Agregar al carrito</button>

// Botón de peligro
<button className="btn btn-danger">Eliminar</button>

// Botón outline
<button className="btn btn-outline">Cancelar</button>

// Tamaños
<button className="btn btn-primary btn-sm">Pequeño</button>
<button className="btn btn-primary btn-lg">Grande</button>
```

### Cards
```jsx
<div className="card">
  <div className="card-header">
    <h3>Título del producto</h3>
  </div>
  <div className="card-body">
    <p>Descripción del producto...</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-primary">Ver más</button>
  </div>
</div>
```

### Formularios
```jsx
<div className="form-group">
  <label className="form-label">Nombre del producto</label>
  <input type="text" className="form-input" placeholder="Ingrese el nombre" />
  <div className="form-error">Campo requerido</div>
</div>
```

### Badges
```jsx
<span className="badge badge-success">En stock</span>
<span className="badge badge-warning">Poco stock</span>
<span className="badge badge-error">Agotado</span>
```

### Alertas
```jsx
<div className="alert alert-success">Producto agregado al carrito</div>
<div className="alert alert-error">Error al procesar la compra</div>
```

## 📱 Responsive Design
- **Mobile first**: Diseñar primero para móviles
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Contenedor principal**: Usar `container-main`

## ⚡ Animaciones
- **Hover effects**: `.hover-lift`, `.hover-scale`
- **Transitions**: Usar `transition-*` de Tailwind
- **Animaciones personalizadas**: `animate-fade-in`, `animate-slide-in`

## 🛒 Componentes Específicos del Minimarket

### Precios
```jsx
<span className="product-price">$19.99</span>
<span className="product-price-old">$24.99</span>
```

### Contador del carrito
```jsx
<div className="relative">
  <ShoppingCartIcon />
  <span className="cart-counter">3</span>
</div>
```

## 📏 Espaciado Consistente
- **Margin/Padding**: Usar múltiplos de 4px (1, 2, 3, 4, 6, 8, 12, 16, 20, 24...)
- **Gaps**: Usar `gap-*` para flexbox y grid
- **Contenedores**: Usar `container-main` para el layout principal

## 🎯 Buenas Prácticas

1. **Usar clases de componentes** antes que utilities individuales
2. **Mantener consistencia** en tamaños y espaciado
3. **Priorizar accesibilidad** con focus states y colores contrastantes
4. **Mobile first** en todos los diseños
5. **Usar variables CSS** para valores que se repiten
6. **Documentar componentes nuevos** en este archivo

## 🚀 Comandos Útiles

```bash
# Ejecutar el proyecto
npm run dev

# Construir para producción
npm run build

# Linting de estilos
npm run lint

# Formatear código
npm run format
```

## 👥 Equipo
Recuerden seguir esta guía para mantener consistencia en todo el proyecto. Si necesitan agregar nuevos componentes o estilos, actualicen esta documentación.