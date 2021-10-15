"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharpImageProcess = exports.createSharpFilter = exports.setSharpImageOperation = exports.setSharpChannelOptions = exports.setSharpColorOptions = exports.readFilePassedBy = void 0;
const fileS = __importStar(require("fs"));
const sharp = __importStar(require("sharp"));
const defaultValues_1 = require("./defaultValues");
function readFilePassedBy(imagePath) {
    return fileS.createReadStream(imagePath);
}
exports.readFilePassedBy = readFilePassedBy;
function setSharpColorOptions(sharp, colorOptions) {
    if (colorOptions.tint != undefined) {
        if ((colorOptions.tint.r && colorOptions.tint.g && colorOptions.tint.b) >=
            0 ||
            (colorOptions.tint.r && colorOptions.tint.g && colorOptions.tint.b) <= 255) {
            sharp.tint({
                r: colorOptions.tint.r,
                g: colorOptions.tint.g,
                b: colorOptions.tint.b,
            });
        }
        else {
            console.error('The RGB values must be between 0 and 255');
        }
    }
    if (colorOptions.grayscale != undefined) {
        sharp.grayscale(colorOptions.grayscale);
    }
    if (colorOptions.pipelineColourspace != undefined) {
        sharp.pipelineColourspace(colorOptions.pipelineColourspace);
    }
    if (colorOptions.toColourspace != undefined) {
        sharp.toColourspace(colorOptions.toColourspace);
    }
    return sharp;
}
exports.setSharpColorOptions = setSharpColorOptions;
function setSharpChannelOptions(sharp, channelsOptions) {
    if (channelsOptions.removeAlpha != undefined) {
        sharp.removeAlpha(true);
    }
    if (channelsOptions.ensureAlpha != undefined) {
        sharp.ensureAlpha(channelsOptions.ensureAlpha);
    }
    if (channelsOptions.extractChannel != undefined) {
        sharp.extractChannel(channelsOptions.extractChannel);
    }
    return sharp;
}
exports.setSharpChannelOptions = setSharpChannelOptions;
function setSharpImageOperation(sharp, options) {
    if (options.blur != undefined) {
        if (options.blur >= 0.3 && options.blur < 1000)
            sharp.blur(options.blur);
        else
            console.error('The blur value is out of bound');
    }
    if (options.convolve != undefined) {
        if (options.convolve.kernel.length ==
            options.convolve.width * options.convolve.height) {
            sharp.convolve({
                width: options.convolve.width,
                height: options.convolve.height,
                kernel: options.convolve.kernel,
                scale: options.convolve.scale,
                offset: options.convolve.offset,
            });
        }
        else {
            console.error(`Kernel length higher or lower than ${options.convolve.width * options.convolve.height}`);
        }
    }
    if (options.flip != undefined) {
        sharp.flip(options.flip);
    }
    if (options.flop != undefined) {
        sharp.flop(options.flop);
    }
    if (options.gamma != undefined) {
        if (options.gamma.gamma >= 1.0 && options.gamma.gamma <= 3.0) {
            sharp.gamma(options.gamma.gamma, options.gamma.gammaOut >= 1.0 && options.gamma.gammaOut <= 3.0
                ? options.gamma.gammaOut
                : undefined);
        }
        else {
            console.error('The gamma value must be between 1.0 and 3.0. In case that you are using gammaOut, the value must be in the same range');
        }
    }
    if (options.linear != undefined) {
        sharp.linear(options.linear.multiplier, options.linear.offset);
    }
    if (options.median != undefined) {
        sharp.median(options.median);
    }
    if (options.modulate != undefined) {
        sharp.modulate({
            brightness: options.modulate.brightness,
            hue: options.modulate.hue,
            saturation: options.modulate.saturation,
            lightness: options.modulate.lightness,
        });
    }
    if (options.negate != undefined) {
        sharp.negate(true);
    }
    if (options.normalise != undefined) {
        sharp.normalise(true);
    }
    if (options.recomb != undefined) {
        sharp.recomb(options.recomb);
    }
    if (options.rotate != undefined) {
        sharp.rotate(options.rotate);
    }
    if (options.sharpen != undefined) {
        sharp.sharpen(options.sharpen.sigma, options.sharpen.flat, options.sharpen.jagged);
    }
    if (options.threshold != undefined) {
        if (options.threshold.threshold >= 0 && options.threshold.threshold < 255)
            sharp.threshold(options.threshold.threshold, {
                greyscale: options.threshold.options != undefined
                    ? options.threshold.options.greyscale
                    : false,
            });
        else
            console.error('The treshold must be between 0 and 255');
    }
    return sharp;
}
exports.setSharpImageOperation = setSharpImageOperation;
function createSharpFilter(options, optionsImageOperations, optionsChannelOperations, optionsColorOperations) {
    try {
        let width = null;
        let height = null;
        let fit = 'cover';
        let quality = 80;
        let adaptiveFiltering = false;
        let format = 'webp';
        if (options) {
            if (!options.width && !options.heigth && options.squareSize) {
                width = height = options.squareSize;
            }
            else {
                width = options.width;
                height = options.heigth;
            }
            fit = options.fit != undefined ? options.fit : fit;
            quality = options.quality != undefined ? options.quality : quality;
            adaptiveFiltering =
                options.adaptiveFiltering != undefined
                    ? options.adaptiveFiltering
                    : adaptiveFiltering;
            format =
                options.outPutFormat != undefined ? options.outPutFormat : format;
        }
        let sharkSharp = sharp()
            .resize(width, height, { fit: fit })
            .toFormat(format, {
            quality: quality,
            adaptiveFiltering: adaptiveFiltering,
        });
        if (optionsImageOperations != undefined) {
            sharkSharp = setSharpImageOperation(sharkSharp, optionsImageOperations);
        }
        if (optionsChannelOperations != undefined) {
            sharkSharp = setSharpChannelOptions(sharkSharp, optionsChannelOperations);
        }
        if (optionsColorOperations != undefined) {
            sharkSharp = setSharpColorOptions(sharkSharp, optionsColorOperations);
        }
        return sharkSharp;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}
exports.createSharpFilter = createSharpFilter;
async function sharpImageProcess(imagePath, name, res, options, optionsImageOperations, optionsColorOperations, optionsChannelOperations) {
    try {
        const fileType = options
            ? options.outPutFormat
            : defaultValues_1.defaultSharpOptions.outPutFormat;
        const fileImage = readFilePassedBy(imagePath);
        fileImage.on('error', (e) => {
            if (e) {
                console.log('File not found');
                res.writeHeader(404, 'File not found');
                res.end('File not found');
            }
            else {
            }
        });
        fileImage.on('open', (_) => {
            res.set({
                'Content-Type': `image/${fileType}`,
                'Content-Disposition': `filename=${name}`,
            });
        });
        const sharpFilter = createSharpFilter(options ? options : undefined, optionsImageOperations ? optionsImageOperations : undefined, optionsChannelOperations ? optionsChannelOperations : undefined, optionsColorOperations ? optionsColorOperations : undefined);
        fileImage.pipe(sharpFilter).pipe(res);
    }
    catch (e) {
        console.error(e);
    }
}
exports.sharpImageProcess = sharpImageProcess;
//# sourceMappingURL=sharpImageProcesor.js.map