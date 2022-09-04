import { WaterbodyClassification } from '../../types/Waterbody'

const classificationCategories= {
    'bay': 'Bays',
    'beach': 'Beaches', 
    'bayou': 'Bayous', 
    'creek': 'Creeks',
    'lagoon': 'Lagoons', 
    'lake': 'Lakes', 
    'pond': 'Ponds', 
    'reservoir': 'Reservoirs', 
    'river': 'Rivers', 
    'stream': "Streams", 
    'bend': "Bends",
    'channel': 'Channels',
    'dock': 'Docks',
    'harbor': 'Harbors', 
    'marsh': 'Marshes', 
    'oxbow': 'Oxbows',
    'slough': 'Sloughs', 
    'strait': 'Straits', 
    'unknown': 'Unknown'
}

export const classificationToCategory = (x: WaterbodyClassification): string | undefined => {
    if(classificationCategories.hasOwnProperty(x)){
        return classificationCategories[x]
    }
}