// Habilita matchers extendidos de Testing Library como toBeInTheDocument()
import '@testing-library/jest-dom';

// Limpieza automática del DOM después de cada test
import { cleanup } from '@testing-library/react';

// Asegura que el DOM se limpie entre tests para evitar contaminación
afterEach(() => {
  cleanup();
});
