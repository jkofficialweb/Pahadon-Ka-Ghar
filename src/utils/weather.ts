/**
 * Weather utility functions for Hariganiwan / Kangan / Ganderbal alpine valley
 */

export interface WeatherConditionInfo {
  description: string;
  conditionGroup: 'clear' | 'clouds' | 'rain' | 'snow' | 'fog' | 'storm';
  advisory: string;
}

/**
 * WMO Weather interpretation codes (WW)
 * https://open-meteo.com/en/docs
 */
export function decodeWeatherCode(code: number, isDay: number = 1): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        description: isDay ? 'Clear Alpine Skies' : 'Clear Starlit Night',
        conditionGroup: 'clear',
        advisory: 'Unobstructed mountain peak views and sunshine.',
      };
    case 1:
      return {
        description: 'Mainly Clear & Crisp',
        conditionGroup: 'clear',
        advisory: 'Great visibility for valley photography and Sindh river walks.',
      };
    case 2:
      return {
        description: 'Partly Cloudy',
        conditionGroup: 'clouds',
        advisory: 'Comfortable alpine weather for Sonamarg excursions.',
      };
    case 3:
      return {
        description: 'Overcast Mountain Mist',
        conditionGroup: 'clouds',
        advisory: 'Cool mountain breeze; ideal for warm Saffron Kahwa in the garden.',
      };
    case 45:
    case 48:
      return {
        description: 'Scenic Valley Fog & Haze',
        conditionGroup: 'fog',
        advisory: 'Drive carefully on Old Sonamarg Road; peaceful atmospheric morning.',
      };
    case 51:
    case 53:
    case 55:
      return {
        description: 'Light Alpine Drizzle',
        conditionGroup: 'rain',
        advisory: 'Carry light waterproof jacket or umbrella.',
      };
    case 61:
    case 63:
    case 65:
      return {
        description: 'Mountain Rain Showers',
        conditionGroup: 'rain',
        advisory: 'Cozy up indoors with hot Wazwan; sound of rain on cedar wood roof.',
      };
    case 71:
    case 73:
    case 75:
      return {
        description: 'Fresh Mountain Snowfall',
        conditionGroup: 'snow',
        advisory: 'Snow-covered pine slopes; electric heated blankets active in rooms.',
      };
    case 77:
      return {
        description: 'Snow Grains / Flurries',
        conditionGroup: 'snow',
        advisory: 'Crisp snowfall; perfect for garden photography.',
      };
    case 80:
    case 81:
    case 82:
      return {
        description: 'Passing Rain Showers',
        conditionGroup: 'rain',
        advisory: 'Intermittent sunshine and rainbows over Sindh Valley.',
      };
    case 85:
    case 86:
      return {
        description: 'Snow Showers',
        conditionGroup: 'snow',
        advisory: 'Winter wonderland scene; heavy woolens and snow boots advised.',
      };
    case 95:
    case 96:
    case 99:
      return {
        description: 'Alpine Thunderstorm',
        conditionGroup: 'storm',
        advisory: 'Stay relaxed inside the resort lounge by the warm stove.',
      };
    default:
      return {
        description: 'Pleasant Mountain Weather',
        conditionGroup: 'clear',
        advisory: 'Fresh Himalayan air and mountain tranquility.',
      };
  }
}

/**
 * Returns practical guest clothing recommendations based on valley temperatures
 */
export function getPackingRecommendation(tempMin: number, tempMax: number, weatherCode: number): string {
  if (weatherCode >= 71 && weatherCode <= 86) {
    return 'Heavy down jacket, thermal inners, woolen socks, gloves, and snow boots recommended.';
  }
  if (tempMin < 4) {
    return 'Thermal layers, warm woolen sweater or fleece, muffler, and warm nightwear advised for chilly nights.';
  }
  if (tempMin < 12) {
    return 'Light woolens or fleece jacket for mornings and evenings; breathable cottons for daytime.';
  }
  if (tempMax > 24) {
    return 'Comfortable daytime cotton wear with a light windbreaker or shawl for evening river breeze.';
  }
  return 'Comfortable layered clothing, walking shoes for riverside trails, and UV sunglasses for mountain glare.';
}

/**
 * Recommends best local activity based on weather conditions
 */
export function getMountainActivityAdvisory(weatherCode: number, tempMax: number): string {
  if (weatherCode >= 71 && weatherCode <= 86) {
    return 'Snow play on resort lawns & warm Wazwan feast in the dining hall';
  }
  if (weatherCode >= 51 && weatherCode <= 65) {
    return 'Steaming Saffron Kahwa session, indoor games & scenic valley mist viewing';
  }
  if (tempMax >= 18) {
    return 'Prime day for Thajiwas Glacier pony trek & Sindh River trout angling walk';
  }
  return 'Ideal morning for Hariganiwan village orchard walks and outdoor garden relaxation';
}
