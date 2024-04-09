export const addDays = (fecha: Date, dias: number) => {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
};
