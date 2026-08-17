/**
 * Mezcla tres colores base según los valores de eco, transgresión y katarsis (0-100).
 * @param {number} eco - Valor de 0 a 100
 * @param {number} transgresion - Valor de 0 a 100
 * @param {number} katarsis - Valor de 0 a 100
 * @returns {string} - Color HEX resultante de la mezcla ponderada
 */
export default function obtenerColorEmocionalPersonalizado(eco = 0, transgresion = 0, katarsis = 0) {
  // 1. Define aquí tus colores base en formato HEX (reemplázalos por los códigos reales de tu paleta)
const colorEco = { r: 64, g: 224, b: 208 };         // '#40E0D0'
const colorTransgresion = { r: 196, g: 30, b: 58 }; // '#C41E3A'
const colorKatarsis = { r: 255, g: 215, b: 0 };     // '#FFD700'
  

  // 2. Normalizamos los valores (0-100)
  const e = Math.min(Math.max(eco, 0), 100);
  const t = Math.min(Math.max(transgresion, 0), 100);
  const k = Math.min(Math.max(katarsis, 0), 100);

  const sumaPesos = e + t + k;

  // Si todas las métricas están a 0, devolvemos un color neutro por defecto
  if (sumaPesos === 0) {
    return '#333333'; 
  }

  // 3. Calculamos la media ponderada de los canales RGB en función de los porcentajes
  const r = Math.round((colorEco.r * e + colorTransgresion.r * t + colorKatarsis.r * k) / sumaPesos);
  const g = Math.round((colorEco.g * e + colorTransgresion.g * t + colorKatarsis.g * k) / sumaPesos);
  const b = Math.round((colorEco.b * e + colorTransgresion.b * t + colorKatarsis.b * k) / sumaPesos);

  // 4. Convertimos a hexadecimal
  const toHex = (n) => n.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}