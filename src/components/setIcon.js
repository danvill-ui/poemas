export default function useTermIcon(term) {
  // Mapa de términos a clases de iconos (Phosphor icons)
  const iconMap = {
    nacimiento: 'ph ph-plant',
    matrimonio: 'ph ph-circle',
    duelo: 'ph ph-heart-break',
    muerte: 'ph ph-skull',
    amor: 'ph ph-heart',
    amistad: 'ph ph-users',
    guerra: 'ph ph-sword',
    naturaleza: 'ph ph-butterfly',
    viaje: 'ph ph-sailboat',
    religión: 'ph ph-star-and-crescent',
    humor: 'ph ph-smiley',
    trabajo :'ph ph-hummer',
    tiempo:'ph ph-hourglass',
    fragilidad:'ph ph-clover',
    vida: 'ph ph-sun-dim',
    memoria:'ph ph-brain'
  };

  // Normalizamos el término a minúsculas y sin tildes si es necesario
  const normalizedTerm = term ? term.toLowerCase().trim() : '';
  
  // Retornamos directamente el icono correspondiente o uno por defecto
  return iconMap[normalizedTerm] || 'ph ph-tag';
}