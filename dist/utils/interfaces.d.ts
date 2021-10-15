export interface sharpColorOptions {
    tint?: {
        r: number;
        g: number;
        b: number;
    };
    grayscale?: true;
    pipelineColourspace?: 'multiband' | 'b-w' | 'histogram' | 'xyz' | 'lab' | 'cmyk' | 'labq' | 'rgb' | 'cmc' | 'lch' | 'labs' | 'srgb' | 'yxy' | 'fourier' | 'rgb16' | 'grey16' | 'matrix' | 'scrgb' | 'hsv' | 'last';
    toColourspace?: 'multiband' | 'b-w' | 'histogram' | 'xyz' | 'lab' | 'cmyk' | 'labq' | 'rgb' | 'cmc' | 'lch' | 'labs' | 'srgb' | 'yxy' | 'fourier' | 'rgb16' | 'grey16' | 'matrix' | 'scrgb' | 'hsv' | 'last';
}
export interface sharpChannelOptions {
    removeAlpha?: true;
    ensureAlpha?: 0 | 1;
    extractChannel?: 'green' | 'red' | 'blue' | 'alpha';
}
export interface sharpImageOptions {
    heigth?: number;
    width?: number;
    outPutFormat?: 'jpeg' | 'png' | 'webp' | 'jpg' | 'tiff' | 'raw';
    quality?: number;
    squareSize?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'insede' | 'outside';
    adaptiveFiltering?: boolean;
}
export interface sharpImageOperations {
    rotate?: number;
    flip?: true;
    flop?: true;
    blur?: number;
    sharpen?: {
        sigma: any;
        flat?: any;
        jagged?: any;
    };
    median?: number;
    gamma?: {
        gamma: number;
        gammaOut?: number;
    };
    negate?: true;
    normalise?: true;
    convolve?: {
        width: number;
        height: number;
        kernel: number[];
        scale?: number;
        offset?: number;
    };
    threshold?: {
        threshold: number;
        options?: {
            greyscale: boolean;
        };
    };
    linear?: {
        multiplier?: number;
        offset?: number;
    };
    recomb?: [
        [
            number,
            number,
            number
        ],
        [
            number,
            number,
            number
        ],
        [
            number,
            number,
            number
        ]
    ];
    modulate?: {
        brightness?: number;
        saturation?: number;
        hue?: number;
        lightness?: number;
    };
}
