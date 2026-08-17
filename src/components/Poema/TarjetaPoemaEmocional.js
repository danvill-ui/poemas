import React from 'react';

/**
 * Calcula si un color HEX necesita texto claro u oscuro basado en la luminancia YIQ.
 */
function obtenerColorTextoOptimo(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#111111' : '#FFFFFF';
}

function obtenerColorEmocionalOrfeo(eco = 0, transgresion = 0, katarsis = 0) {
  const colorEco = { r: 64, g: 224, b: 208 };         // '#40E0D0'
  const colorTransgresion = { r: 196, g: 30, b: 58 }; // '#C41E3A'
  const colorKatarsis = { r: 255, g: 215, b: 0 };     // '#FFD700'

  const e = Math.min(Math.max(eco, 0), 100);
  const t = Math.min(Math.max(transgresion, 0), 100);
  const k = Math.min(Math.max(katarsis, 0), 100);

  const sumaPesos = e + t + k;
  if (sumaPesos === 0) return '#222222'; 

  const r = Math.round((colorEco.r * e + colorTransgresion.r * t + colorKatarsis.r * k) / sumaPesos);
  const g = Math.round((colorEco.g * e + colorTransgresion.g * t + colorKatarsis.g * k) / sumaPesos);
  const b = Math.round((colorEco.b * e + colorTransgresion.b * t + colorKatarsis.b * k) / sumaPesos);

  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function TarjetaPoemaEmocional({ eco = 0, transgresion = 0, katarsis = 0, titulo }) {
  const colorCentro = obtenerColorEmocionalOrfeo(eco, transgresion, katarsis);
  const colorTexto = obtenerColorTextoOptimo(colorCentro);

  const valEco = Math.min(Math.max(eco, 0), 100);
  const valTrans = Math.min(Math.max(transgresion, 0), 100);
  const valKat = Math.min(Math.max(katarsis, 0), 100);

  const alphaEco = valEco / 100;
  const alphaTransgresion = valTrans / 100;
  const alphaKatarsis = valKat / 100;

  // 1. Núcleo central ampliado: el color sólido abarca hasta el 60% y el desvanecimiento llega hasta el 90%
  const estiloFondoEstatico = {
    background: `radial-gradient(ellipse at center, ${colorCentro}ff 0%, ${colorCentro}cc 60%, ${colorCentro}44 80%, transparent 95%)`,
  };

  // 2. Fondo dinámico de ondas laterales
  const estiloOndasLaterales = {
    background: `linear-gradient(90deg, 
      rgba(64, 224, 208, ${alphaEco}) 0%, 
      rgba(196, 30, 58, ${alphaTransgresion}) 25%, 
      ${colorCentro}66 50%, 
      rgba(196, 30, 58, ${alphaTransgresion}) 75%, 
      rgba(255, 215, 0, ${alphaKatarsis}) 100%
    ), #FFFFFF`,
    backgroundSize: '200% 100%',
    animation: 'ondasLaterales 8s ease-in-out infinite alternate',
  };

  return (
    <>
      <style>{`
        @keyframes ondasLaterales {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      <div 
        className="p-6 transition-all duration-300 border border-white/30 relative overflow-hidden "
        style={estiloOndasLaterales}
      >
        {/* Capa estática del núcleo de mezcla (más ancho) */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={estiloFondoEstatico} 
        />

        {/* Contenido de la tarjeta */}
        <div className="relative z-10 flex flex-col gap-4" style={{ color: colorTexto }}>
          <h3 className="text-xl font-bold">{titulo}</h3>
          
          <div className="flex flex-col gap-2.5 text-sm container">
            {/* Barra Eco */}
            <div className="flex items-center gap-3 w-50">
              <span className="w-28 flex items-center gap-1.5 font-medium">
                <span className="icon icon-eco text-orfeo-eco" /> Eco:
              </span>
              <div className="flex-1 h-2.5 bg-black/10 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${valEco}%`, backgroundColor: '#40E0D0' }}
                />
              </div>
              <span className="w-8 text-right font-bold text-xs">{valEco}</span>
            </div>

            {/* Barra Transgresión */}
            <div className="flex items-center gap-3">
              <span className="w-28 flex items-center gap-1.5 font-medium">
                <span className="icon icon-transgresion text-orfeo-transgresion" /> Transgresión:
              </span>
              <div className="flex-1 h-2.5 bg-black/10 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${valTrans}%`, backgroundColor: '#C41E3A' }}
                />
              </div>
              <span className="w-8 text-right font-bold text-xs">{valTrans}</span>
            </div>

            {/* Barra Katarsis */}
            <div className="flex items-center gap-3">
              <span className="w-28 flex items-center gap-1.5 font-medium">
                <span className="icon icon-katarsis text-orfeo-katarsis" /> Katarsis:
              </span>
              <div className="flex-1 h-2.5 bg-black/10 rounded-full overflow-hidden p-0.5 backdrop-blur-xs">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${valKat}%`, backgroundColor: '#FFD700' }}
                />
              </div>
              <span className="w-8 text-right font-bold text-xs">{valKat}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export {TarjetaPoemaEmocional,obtenerColorEmocionalOrfeo}