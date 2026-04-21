declare module 'flubber' {
  type Interpolator = (t: number) => string;

  interface InterpolateOptions {
    maxSegmentLength?: number;
    string?: boolean;
  }

  export function interpolate(a: string, b: string, options?: InterpolateOptions): Interpolator;
  export function separate(
    fromShape: string,
    toShapes: string[],
    options?: InterpolateOptions,
  ): Interpolator[];
  export function combine(
    fromShapes: string[],
    toShape: string,
    options?: InterpolateOptions,
  ): Interpolator[];
}
