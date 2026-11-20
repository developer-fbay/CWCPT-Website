// The strip light's shapes, exactly as drawn on the HomeBW board (generated there by
// _context/designs/design-system-bw/strip/strip_lib.py). Coordinates are in each shape's own viewBox.
//   sag:      strung across the top of a section, sagging (over the plans)
//   mountain: the logo's Table Mountain line (the closing band)
//   bracket:  the mountain line over a heading like a long-division sign (trial, on the Offices heading)

export interface StripShape {
  width: number
  height: number
  d: string
  /** The sag sways (a slow path morph); only hanging things move. */
  sway?: boolean
  spark?: boolean
  clips: [x: number, y: number, angle: number][]
  caps: [x: number, y: number, angle: number][]
  power?: [x: number, y: number, angle: number]
  bleeds: [x: number, y: number][]
}

export const strips: Record<'sag' | 'mountain' | 'bracket', StripShape> = {
  sag: {
    width: 1360,
    height: 200,
    d: 'M40 46 L64 46 Q680 196 1296 46 L1320 46',
    sway: true,
    spark: true,
    clips: [[64, 46, 0], [1296, 46, 0]],
    caps: [[40, 46, 180]],
    power: [1320, 46, 0],
    bleeds: [[40, 46], [1320, 46]],
  },
  mountain: {
    width: 1360,
    height: 640,
    d: 'M80.0 435.6 C86.5 424.7 107.1 389.7 119.0 369.9 C130.9 350.2 140.0 334.3 151.5 317.3 C163.0 300.3 175.6 266.2 187.9 267.9 C200.2 269.6 213.2 304.3 225.6 327.7 C237.9 351.1 249.9 382.5 262.0 408.3 C274.1 434.1 286.9 462.9 298.4 482.4 C309.9 501.9 319.2 533.4 330.9 525.3 C342.6 517.2 356.2 468.1 368.6 433.6 C381.0 399.2 393.3 355.5 405.0 318.6 C416.7 281.7 428.0 239.3 438.8 212.0 C449.6 184.7 456.1 166.9 470.0 154.8 C483.9 142.7 491.7 145.8 522.0 139.2 C552.3 132.6 604.3 122.4 652.0 115.2 C699.7 107.9 747.5 102.8 808.0 95.7 C868.5 88.5 980.2 76.2 1014.7 72.2 L1110 62',
    spark: true,
    clips: [
      [119.5, 369.0, -58.9], [221.0, 318.7, 63.8], [300.7, 486.5, 61.6], [379.1, 402.6, -72.3],
      [434.0, 225.0, -70.6], [587.3, 126.1, -10.5], [802.1, 96.4, -6.7], [1002.2, 73.6, -6.5],
    ],
    caps: [[80.0, 435.6, 120.8]],
    power: [1110.0, 62.0, -6.1],
    bleeds: [[80.0, 435.6], [1110.0, 62.0]],
  },
  bracket: {
    width: 610,
    height: 277,
    d: 'M-4.0 190.0 C2.0 181.7 18.3 130.0 32.0 140.0 C45.7 150.0 66.0 245.0 78.0 250.0 C90.0 255.0 97.0 201.0 104.0 170.0 C111.0 139.0 110.0 83.7 120.0 64.0 C130.0 44.3 124.0 55.3 164.0 52.0 C204.0 48.7 289.0 46.7 360.0 44.0 C431.0 41.3 551.7 37.3 590.0 36.0',
    clips: [[47.7, 173.0, 71.0], [100.7, 186.0, -78.9], [247.0, 47.9, -2.1], [487.1, 39.5, -2.0]],
    caps: [[-4.0, 190.0, 125.8], [590.0, 36.0, -2.0]],
    bleeds: [[-4.0, 190.0], [590.0, 36.0]],
  },
}

/** The lit layers, bottom to top: wall wash, far glow, bloom, lit silicone edge, diffuser, hot core. */
export const litLayers = ['wash', 'far', 'near', 'edge', 'tube', 'core'] as const
