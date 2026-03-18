import {
  COMPOSITION_BUFFER_MODE,
  NG_VALUE_ACCESSOR
} from "./chunk-3VF27ZPB.js";
import "./chunk-7AFCKYR5.js";
import "./chunk-GUXEIMF7.js";
import {
  getDOM
} from "./chunk-OACGOX5T.js";
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  NgModule,
  Optional,
  Renderer2,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener
} from "./chunk-SS62QQNN.js";
import "./chunk-MJFKGM26.js";
import {
  __spreadValues
} from "./chunk-4MWRP73S.js";

// node_modules/@matheo/text-mask/fesm2022/matheo-text-mask.mjs
var defaultPlaceholderChar = "_";
var err$1 = "text-mask: convertMaskToPlaceholder; The mask property must be an array.";
function convertMaskToPlaceholder(mask, placeholderChar = defaultPlaceholderChar) {
  if (!isArray(mask)) {
    throw new Error(err$1);
  }
  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(`Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.

The placeholder character that was received is: ${JSON.stringify(placeholderChar)}

The mask that was received is: ${JSON.stringify(mask)}`);
  }
  return mask.map((char) => {
    return char instanceof RegExp ? placeholderChar : char;
  }).join("");
}
function isMaskCreator(value) {
  return typeof value === "function";
}
function isMaskObject(value) {
  return typeof value === "object" && value.pipe !== void 0 && value.mask !== void 0;
}
function isArray(value) {
  return Array.isArray && Array.isArray(value) || value instanceof Array;
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
function processCaretTraps(mask) {
  const caretTrapIndexes = [];
  let indexOfCaretTrap = mask?.indexOf("[]");
  while (mask && indexOfCaretTrap !== -1) {
    caretTrapIndexes.push(indexOfCaretTrap);
    mask.splice(indexOfCaretTrap, 1);
    indexOfCaretTrap = mask.indexOf("[]");
  }
  return caretTrapIndexes;
}
var err = "Text-mask:conformToMask; The mask property must be an array.";
function conformToMask(rawValue = "", mask = [], config = {}) {
  if (!isArray(mask)) {
    if (isMaskCreator(mask)) {
      mask = mask(rawValue, config);
      processCaretTraps(mask);
    } else {
      throw new Error(err);
    }
  }
  const {
    guide = true,
    previousConformedValue = "",
    placeholderChar = defaultPlaceholderChar,
    placeholder = convertMaskToPlaceholder(mask, placeholderChar),
    currentCaretPosition,
    keepCharPositions
  } = config;
  const suppressGuide = guide === false && previousConformedValue !== void 0;
  const rawValueLength = rawValue.length;
  const previousConformedValueLength = previousConformedValue.length;
  const placeholderLength = placeholder.length;
  const maskLength = mask.length;
  const editDistance = rawValueLength - previousConformedValueLength;
  const isAddition = editDistance > 0;
  const indexOfFirstChange = (currentCaretPosition || 0) + (isAddition ? -editDistance : 0);
  const indexOfLastChange = indexOfFirstChange + Math.abs(editDistance);
  if (keepCharPositions === true && !isAddition) {
    let compensatingPlaceholderChars = "";
    for (let i = indexOfFirstChange; i < indexOfLastChange; i++) {
      if (placeholder[i] === placeholderChar) {
        compensatingPlaceholderChars += placeholderChar;
      }
    }
    rawValue = rawValue.slice(0, indexOfFirstChange) + compensatingPlaceholderChars + rawValue.slice(indexOfFirstChange, rawValueLength);
  }
  const rawValueArr = rawValue.split("").map((char, i) => ({
    char,
    isNew: i >= indexOfFirstChange && i < indexOfLastChange
  }));
  for (let i = rawValueLength - 1; i >= 0; i--) {
    const {
      char
    } = rawValueArr[i];
    if (char !== placeholderChar) {
      const shouldOffset = i >= indexOfFirstChange && previousConformedValueLength === maskLength;
      if (char === placeholder[shouldOffset ? i - editDistance : i]) {
        rawValueArr.splice(i, 1);
      }
    }
  }
  let conformedValue = "";
  let someCharsRejected = false;
  placeholderLoop: for (let i = 0; i < placeholderLength; i++) {
    const charInPlaceholder = placeholder[i];
    if (charInPlaceholder === placeholderChar) {
      if (rawValueArr.length > 0) {
        while (rawValueArr.length > 0) {
          const res = rawValueArr.shift();
          if (res?.char === placeholderChar && suppressGuide !== true) {
            conformedValue += placeholderChar;
            continue placeholderLoop;
          } else if (res?.char && mask[i].test(res.char)) {
            if (keepCharPositions !== true || res?.isNew === false || previousConformedValue === "" || guide === false || !isAddition) {
              conformedValue += res?.char;
            } else {
              const rawValueArrLength = rawValueArr.length;
              let indexOfNextAvailablePlaceholderChar = null;
              for (let k = 0; k < rawValueArrLength; k++) {
                const charData = rawValueArr[k];
                if (charData.char !== placeholderChar && charData.isNew === false) {
                  break;
                }
                if (charData.char === placeholderChar) {
                  indexOfNextAvailablePlaceholderChar = k;
                  break;
                }
              }
              if (indexOfNextAvailablePlaceholderChar !== null) {
                conformedValue += res?.char;
                rawValueArr.splice(indexOfNextAvailablePlaceholderChar, 1);
              } else {
                i--;
              }
            }
            continue placeholderLoop;
          } else {
            someCharsRejected = true;
          }
        }
      }
      if (suppressGuide === false) {
        conformedValue += placeholder.substr(i, placeholderLength);
      }
      break;
    } else {
      conformedValue += charInPlaceholder;
    }
  }
  if (suppressGuide && isAddition === false) {
    let indexOfLastFilledPlaceholderChar = null;
    for (let i = 0; i < conformedValue.length; i++) {
      if (placeholder[i] === placeholderChar) {
        indexOfLastFilledPlaceholderChar = i;
      }
    }
    if (indexOfLastFilledPlaceholderChar !== null) {
      conformedValue = conformedValue.substr(0, indexOfLastFilledPlaceholderChar + 1);
    } else {
      conformedValue = "";
    }
  }
  return {
    conformedValue,
    meta: {
      someCharsRejected
    }
  };
}
function adjustCaretPosition({
  previousConformedValue = "",
  previousPlaceholder = "",
  currentCaretPosition = 0,
  conformedValue,
  rawValue,
  placeholderChar,
  placeholder,
  indexesOfPipedChars = [],
  caretTrapIndexes = []
}) {
  if (currentCaretPosition === 0 || !rawValue.length) {
    return 0;
  }
  const rawValueLength = rawValue.length;
  const previousConformedValueLength = previousConformedValue.length;
  const placeholderLength = placeholder.length;
  const conformedValueLength = conformedValue.length;
  const editLength = rawValueLength - previousConformedValueLength;
  const isAddition = editLength > 0;
  const isFirstRawValue = previousConformedValueLength === 0;
  const isPartialMultiCharEdit = editLength > 1 && !isAddition && !isFirstRawValue;
  if (isPartialMultiCharEdit) {
    return currentCaretPosition;
  }
  const possiblyHasRejectedChar = isAddition && (previousConformedValue === conformedValue || conformedValue === placeholder);
  let startingSearchIndex = 0;
  let trackRightCharacter;
  let targetChar = "";
  if (possiblyHasRejectedChar) {
    startingSearchIndex = currentCaretPosition - editLength;
  } else {
    const normalizedConformedValue = conformedValue.toLowerCase();
    const normalizedRawValue = rawValue.toLowerCase();
    const leftHalfChars = normalizedRawValue.substr(0, currentCaretPosition).split("");
    const intersection = leftHalfChars.filter((char) => normalizedConformedValue.indexOf(char) !== -1);
    targetChar = intersection[intersection.length - 1];
    const previousLeftMaskChars = previousPlaceholder.substr(0, intersection.length).split("").filter((char) => char !== placeholderChar).length;
    const leftMaskChars = placeholder.substr(0, intersection.length).split("").filter((char) => char !== placeholderChar).length;
    const masklengthChanged = leftMaskChars !== previousLeftMaskChars;
    const targetIsMaskMovingLeft = previousPlaceholder[intersection.length - 1] !== void 0 && placeholder[intersection.length - 2] !== void 0 && previousPlaceholder[intersection.length - 1] !== placeholderChar && previousPlaceholder[intersection.length - 1] !== placeholder[intersection.length - 1] && previousPlaceholder[intersection.length - 1] === placeholder[intersection.length - 2];
    if (!isAddition && (masklengthChanged || targetIsMaskMovingLeft) && previousLeftMaskChars > 0 && placeholder.indexOf(targetChar) > -1 && rawValue[currentCaretPosition] !== void 0) {
      trackRightCharacter = true;
      targetChar = rawValue[currentCaretPosition];
    }
    const pipedChars = indexesOfPipedChars.map((index) => normalizedConformedValue[index]);
    const countTargetCharInPipedChars = pipedChars.filter((char) => char === targetChar).length;
    const countTargetCharInIntersection = intersection.filter((char) => char === targetChar).length;
    const countTargetCharInPlaceholder = placeholder.substr(0, placeholder.indexOf(placeholderChar)).split("").filter((char, index) => (
      // Check if `char` is the same as our `targetChar`, so we account for it
      char === targetChar && // but also make sure that both the `rawValue` and placeholder don't have the same character at the same
      // index because if they are equal, that means we are already counting those characters in
      // `countTargetCharInIntersection`
      rawValue[index] !== char
    )).length;
    const requiredNumberOfMatches = countTargetCharInPlaceholder + countTargetCharInIntersection + countTargetCharInPipedChars + // The character to the right of the caret isn't included in `intersection`
    // so add one if we are tracking the character to the right
    (trackRightCharacter ? 1 : 0);
    let numberOfEncounteredMatches = 0;
    for (let i = 0; i < conformedValueLength; i++) {
      const conformedValueChar = normalizedConformedValue[i];
      startingSearchIndex = i + 1;
      if (conformedValueChar === targetChar) {
        numberOfEncounteredMatches++;
      }
      if (numberOfEncounteredMatches >= requiredNumberOfMatches) {
        break;
      }
    }
  }
  if (isAddition) {
    let lastPlaceholderChar = startingSearchIndex;
    for (let i = startingSearchIndex; i <= placeholderLength; i++) {
      if (placeholder[i] === placeholderChar) {
        lastPlaceholderChar = i;
      }
      if (
        // If we're adding, we can position the caret at the next placeholder character.
        placeholder[i] === placeholderChar || // If a caret trap was set by a mask function, we need to stop at the trap.
        caretTrapIndexes.indexOf(i) !== -1 || // This is the end of the placeholder. We cannot move any further. Let's put the caret there.
        i === placeholderLength
      ) {
        return lastPlaceholderChar;
      }
    }
  } else {
    if (trackRightCharacter) {
      for (let i = startingSearchIndex - 1; i >= 0; i--) {
        if (
          // `targetChar` should be in `conformedValue`, since it was in `rawValue`, just
          // to the right of the caret
          conformedValue[i] === targetChar || // If a caret trap was set by a mask function, we need to stop at the trap.
          caretTrapIndexes.indexOf(i) !== -1 || // This is the beginning of the placeholder. We cannot move any further.
          // Let's put the caret there.
          i === 0
        ) {
          return i;
        }
      }
    } else {
      for (let i = startingSearchIndex; i >= 0; i--) {
        if (
          // If we're deleting, we can position the caret right before the placeholder character
          placeholder[i - 1] === placeholderChar || // If a caret trap was set by a mask function, we need to stop at the trap.
          caretTrapIndexes.indexOf(i) !== -1 || // This is the beginning of the placeholder. We cannot move any further.
          // Let's put the caret there.
          i === 0
        ) {
          return i;
        }
      }
    }
  }
}
var isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
var defer = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
function createTextMaskInputElement(config) {
  const state = {
    previousConformedValue: void 0,
    previousPlaceholder: void 0
  };
  return {
    state,
    // `update` is called by framework components whenever they want to update the `value` of the input element.
    // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
    // is for this to be read from the `inputElement` directly.
    update(rawValue, {
      inputElement,
      mask: providedMask,
      guide,
      pipe,
      placeholderChar = defaultPlaceholderChar,
      keepCharPositions = false,
      showMask = false
    } = config) {
      if (typeof rawValue === "undefined") {
        rawValue = inputElement.value;
      }
      if (rawValue === state.previousConformedValue) {
        return;
      }
      let mask;
      if (isMaskObject(providedMask)) {
        pipe = providedMask.pipe;
        providedMask = providedMask.mask;
      }
      let placeholder = "";
      if (providedMask instanceof Array) {
        placeholder = convertMaskToPlaceholder(providedMask, placeholderChar);
      }
      if (!providedMask) {
        return;
      }
      const safeRawValue = getSafeRawValue(rawValue);
      const {
        selectionEnd: currentCaretPosition
      } = inputElement;
      const {
        previousConformedValue,
        previousPlaceholder
      } = state;
      let caretTrapIndexes = [];
      if (typeof providedMask === "function") {
        mask = providedMask(safeRawValue, {
          currentCaretPosition,
          previousConformedValue,
          placeholderChar
        });
        if (!mask) {
          return;
        }
        caretTrapIndexes = processCaretTraps(mask);
        placeholder = convertMaskToPlaceholder(mask, placeholderChar);
      } else {
        mask = providedMask;
      }
      const conformToMaskConfig = {
        previousConformedValue,
        guide,
        placeholder,
        placeholderChar,
        pipe,
        currentCaretPosition,
        keepCharPositions
      };
      const {
        conformedValue
      } = conformToMask(safeRawValue, mask, conformToMaskConfig);
      let pipeResults = {};
      let finalConformedValue = conformedValue;
      if (typeof pipe === "function") {
        pipeResults = pipe(conformedValue, __spreadValues({
          rawValue: safeRawValue
        }, conformToMaskConfig));
        if (pipeResults === false) {
          pipeResults = {
            value: previousConformedValue,
            rejected: true
          };
          finalConformedValue = previousConformedValue;
        } else if (isString(pipeResults)) {
          pipeResults = {
            value: pipeResults
          };
          finalConformedValue = pipeResults;
        }
      }
      const adjustedCaretPosition = adjustCaretPosition({
        previousConformedValue,
        previousPlaceholder,
        conformedValue: finalConformedValue,
        placeholder,
        rawValue: safeRawValue,
        currentCaretPosition: currentCaretPosition || 0,
        placeholderChar,
        indexesOfPipedChars: pipeResults.indexesOfPipedChars,
        caretTrapIndexes
      });
      const inputValueShouldBeEmpty = finalConformedValue === placeholder && (adjustedCaretPosition === 0 || adjustedCaretPosition === placeholder.length - 1);
      const emptyValue = showMask ? placeholder : "";
      const inputElementValue = inputValueShouldBeEmpty ? emptyValue : finalConformedValue;
      state.previousConformedValue = inputElementValue;
      state.previousPlaceholder = placeholder;
      if (inputElement.value === inputElementValue) {
        return;
      }
      inputElement.value = inputElementValue;
      safeSetSelection(inputElement, adjustedCaretPosition);
    }
  };
}
function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element && isNumber(selectionPosition)) {
    if (isAndroid) {
      defer(() => element.setSelectionRange(selectionPosition, selectionPosition, "none"));
    } else {
      element.setSelectionRange(selectionPosition, selectionPosition, "none");
    }
  }
}
function getSafeRawValue(inputValue) {
  if (isString(inputValue)) {
    return inputValue;
  } else if (isNumber(inputValue)) {
    return String(inputValue);
  } else if (inputValue === void 0 || inputValue === null) {
    return "";
  } else {
    throw new Error(`The 'value' provided to Text Mask needs to be a string or a number. The value received was:

 ${JSON.stringify(inputValue)}`);
  }
}
var MASKEDINPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskedInputDirective),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var _MaskedInputDirective = class _MaskedInputDirective {
  constructor(renderer, elementRef, compositionMode) {
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.compositionMode = compositionMode;
    this.textMaskConfig = {
      mask: [],
      guide: true,
      placeholderChar: "_",
      pipe: void 0,
      keepCharPositions: false
    };
    this.composing = false;
    this.onChange = (_) => {
    };
    this.onTouched = () => {
    };
    if (this.compositionMode == null) {
      this.compositionMode = !_isAndroid();
    }
  }
  ngOnChanges() {
    this._setupMask(true);
    if (this.textMaskInputElement !== void 0) {
      this.textMaskInputElement.update(this.inputElement.value);
    }
  }
  writeValue(value) {
    this._setupMask();
    const normalizedValue = value == null ? "" : value;
    this.renderer.setProperty(this.inputElement, "value", normalizedValue);
    if (this.textMaskInputElement !== void 0) {
      this.textMaskInputElement.update(value);
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.renderer.setProperty(this.elementRef.nativeElement, "disabled", isDisabled);
  }
  _handleInput(value) {
    if (!this.compositionMode || this.compositionMode && !this.composing) {
      this._setupMask();
      if (this.textMaskInputElement !== void 0) {
        this.textMaskInputElement.update(value);
        value = this.inputElement.value;
        this.onChange(value);
      }
    }
  }
  _setupMask(create = false) {
    if (!this.inputElement) {
      if (this.elementRef.nativeElement.tagName.toUpperCase() === "INPUT") {
        this.inputElement = this.elementRef.nativeElement;
      } else {
        this.inputElement = this.elementRef.nativeElement.getElementsByTagName("INPUT")[0];
      }
    }
    if (this.inputElement && create) {
      this.textMaskInputElement = createTextMaskInputElement(Object.assign({
        inputElement: this.inputElement
      }, this.textMaskConfig));
    }
  }
  _compositionStart() {
    this.composing = true;
  }
  _compositionEnd(value) {
    this.composing = false;
    if (this.compositionMode) {
      this._handleInput(value);
    }
  }
};
_MaskedInputDirective.ɵfac = function MaskedInputDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MaskedInputDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(COMPOSITION_BUFFER_MODE, 8));
};
_MaskedInputDirective.ɵdir = ɵɵdefineDirective({
  type: _MaskedInputDirective,
  selectors: [["", "textMask", ""]],
  hostBindings: function MaskedInputDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("input", function MaskedInputDirective_input_HostBindingHandler($event) {
        return ctx._handleInput($event.target.value);
      })("blur", function MaskedInputDirective_blur_HostBindingHandler() {
        return ctx.onTouched();
      })("compositionstart", function MaskedInputDirective_compositionstart_HostBindingHandler() {
        return ctx._compositionStart();
      })("compositionend", function MaskedInputDirective_compositionend_HostBindingHandler($event) {
        return ctx._compositionEnd($event.target.value);
      });
    }
  },
  inputs: {
    textMaskConfig: [0, "textMask", "textMaskConfig"]
  },
  exportAs: ["textMask"],
  features: [ɵɵProvidersFeature([MASKEDINPUT_VALUE_ACCESSOR]), ɵɵNgOnChangesFeature]
});
var MaskedInputDirective = _MaskedInputDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaskedInputDirective, [{
    type: Directive,
    args: [{
      host: {
        "(input)": "_handleInput($event.target.value)",
        "(blur)": "onTouched()",
        "(compositionstart)": "_compositionStart()",
        "(compositionend)": "_compositionEnd($event.target.value)"
      },
      selector: "[textMask]",
      exportAs: "textMask",
      providers: [MASKEDINPUT_VALUE_ACCESSOR]
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COMPOSITION_BUFFER_MODE]
    }]
  }], {
    textMaskConfig: [{
      type: Input,
      args: ["textMask"]
    }]
  });
})();
var _TextMaskModule = class _TextMaskModule {
};
_TextMaskModule.ɵfac = function TextMaskModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TextMaskModule)();
};
_TextMaskModule.ɵmod = ɵɵdefineNgModule({
  type: _TextMaskModule,
  declarations: [MaskedInputDirective],
  exports: [MaskedInputDirective]
});
_TextMaskModule.ɵinj = ɵɵdefineInjector({});
var TextMaskModule = _TextMaskModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextMaskModule, [{
    type: NgModule,
    args: [{
      declarations: [MaskedInputDirective],
      exports: [MaskedInputDirective]
    }]
  }], null, null);
})();
export {
  MASKEDINPUT_VALUE_ACCESSOR,
  MaskedInputDirective,
  TextMaskModule,
  conformToMask
};
//# sourceMappingURL=@matheo_text-mask.js.map
