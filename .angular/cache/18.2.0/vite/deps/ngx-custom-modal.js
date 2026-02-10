import {
  CommonModule,
  NgClass,
  NgIf,
  NgTemplateOutlet
} from "./chunk-OACGOX5T.js";
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  setClassMetadata,
  signal,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-SS62QQNN.js";
import "./chunk-MJFKGM26.js";
import "./chunk-4MWRP73S.js";

// node_modules/ngx-custom-modal/fesm2022/ngx-custom-modal.mjs
var _c0 = ["modalHeader"];
var _c1 = ["modalBody"];
var _c2 = ["modalFooter"];
function NgxCustomModalComponent_Conditional_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxCustomModalComponent_Conditional_0_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 9);
    ɵɵlistener("click", function NgxCustomModalComponent_Conditional_0_button_5_Template_button_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.close());
    });
    ɵɵtext(1, " × ");
    ɵɵelementEnd();
  }
}
function NgxCustomModalComponent_Conditional_0_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxCustomModalComponent_Conditional_0_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxCustomModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
    ɵɵtemplate(4, NgxCustomModalComponent_Conditional_0_ng_container_4_Template, 1, 0, "ng-container", 5)(5, NgxCustomModalComponent_Conditional_0_button_5_Template, 2, 0, "button", 6);
    ɵɵelementEnd();
    ɵɵelementStart(6, "div", 7);
    ɵɵtemplate(7, NgxCustomModalComponent_Conditional_0_ng_container_7_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
    ɵɵelementStart(8, "div", 8);
    ɵɵtemplate(9, NgxCustomModalComponent_Conditional_0_ng_container_9_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("in", ctx_r1.visibleAnimate());
    ɵɵproperty("ngClass", ctx_r1.getCustomClass());
    ɵɵadvance(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.header);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r1.shouldHideCloseButton());
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.body);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.footer);
  }
}
var _NgxCustomModalComponent = class _NgxCustomModalComponent {
  constructor(elementRef, changeDetectorRef, renderer) {
    this.elementRef = elementRef;
    this.changeDetectorRef = changeDetectorRef;
    this.renderer = renderer;
    this.header = null;
    this.body = null;
    this.footer = null;
    this.closeOnOutsideClick = true;
    this.closeOnEscape = true;
    this.hideCloseButton = false;
    this.options = {};
    this.visible = signal(false);
    this.visibleAnimate = signal(false);
  }
  ngOnDestroy() {
    this.close();
  }
  /**
   * Opens the modal
   */
  open() {
    this.renderer.addClass(document.body, "modal-open");
    this.visible.set(true);
    setTimeout(() => this.visibleAnimate.set(true));
  }
  /**
   * Closes the modal
   */
  close() {
    this.renderer.removeClass(document.body, "modal-open");
    this.visibleAnimate.set(false);
    setTimeout(() => {
      this.visible.set(false);
      this.changeDetectorRef.markForCheck();
    }, 200);
  }
  /**
   * Event handler for clicking on the modal container.
   * Closes the modal if clicked outside the modal content.
   */
  onContainerClicked(event) {
    const closeOnOutsideClick = this.options.closeOnOutsideClick ?? this.closeOnOutsideClick;
    if (event.target.classList.contains("modal") && this.isTopMost() && closeOnOutsideClick) {
      this.close();
    }
  }
  /**
   * Keyboard event handler to close the modal with the Escape key.
   */
  onKeyDownHandler(event) {
    const closeOnEscape = this.options.closeOnEscape ?? this.closeOnEscape;
    if (event.key === "Escape" && this.isTopMost() && closeOnEscape) {
      this.close();
    }
  }
  /**
   * Determines if this modal is the topmost in the stack of modals.
   *
   * @returns {boolean} True if the modal is the topmost.
   */
  isTopMost() {
    return !this.elementRef.nativeElement.querySelector(":scope app-modal > .modal");
  }
  /**
   * Gets the custom class to be added to the modal.
   *
   * @returns {string} The custom class.
   */
  getCustomClass() {
    return this.customClass ?? this.options.customClass ?? "";
  }
  /**
   * Determines if the close button should be hidden.
   *
   * @returns {boolean} True if the close button should be hidden.
   */
  shouldHideCloseButton() {
    return this.hideCloseButton || this.options.hideCloseButton || false;
  }
};
_NgxCustomModalComponent.ɵfac = function NgxCustomModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxCustomModalComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Renderer2));
};
_NgxCustomModalComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxCustomModalComponent,
  selectors: [["ngx-custom-modal"]],
  contentQueries: function NgxCustomModalComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c0, 5);
      ɵɵcontentQuery(dirIndex, _c1, 5);
      ɵɵcontentQuery(dirIndex, _c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.body = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footer = _t.first);
    }
  },
  hostBindings: function NgxCustomModalComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgxCustomModalComponent_click_HostBindingHandler($event) {
        return ctx.onContainerClicked($event);
      })("keydown", function NgxCustomModalComponent_keydown_HostBindingHandler($event) {
        return ctx.onKeyDownHandler($event);
      }, false, ɵɵresolveDocument);
    }
  },
  inputs: {
    closeOnOutsideClick: "closeOnOutsideClick",
    closeOnEscape: "closeOnEscape",
    customClass: "customClass",
    hideCloseButton: "hideCloseButton",
    options: "options"
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 1,
  vars: 1,
  consts: [["role", "dialog", "tabindex", "-1", 1, "modal", "fade", 3, "in", "ngClass"], ["role", "dialog", "tabindex", "-1", 1, "modal", "fade", 3, "ngClass"], [1, "modal-dialog"], [1, "modal-content"], [1, "modal-header"], [4, "ngTemplateOutlet"], ["class", "close", "data-dismiss", "modal", "type", "button", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "modal-body"], [1, "modal-footer"], ["data-dismiss", "modal", "type", "button", "aria-label", "Close", 1, "close", 3, "click"]],
  template: function NgxCustomModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NgxCustomModalComponent_Conditional_0_Template, 10, 7, "div", 0);
    }
    if (rf & 2) {
      ɵɵconditional(ctx.visible() ? 0 : -1);
    }
  },
  dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet],
  styles: ["[_nghost-%COMP%]     modal .modal{display:flex;flex:1;align-items:center;justify-content:center}[_nghost-%COMP%]     .modal{position:fixed;top:0;left:0;width:100%;min-height:100%;background-color:#00000026;z-index:42}[_nghost-%COMP%]     .modal.in{opacity:1}"]
});
var NgxCustomModalComponent = _NgxCustomModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCustomModalComponent, [{
    type: Component,
    args: [{
      selector: "ngx-custom-modal",
      standalone: true,
      imports: [CommonModule],
      template: '@if (visible()) {\n  <div class="modal fade" role="dialog" tabindex="-1" [class.in]="visibleAnimate()" [ngClass]="getCustomClass()">\n    <div class="modal-dialog">\n      <div class="modal-content">\n        <div class="modal-header">\n          <ng-container *ngTemplateOutlet="header"></ng-container>\n          <button\n            *ngIf="!shouldHideCloseButton()"\n            class="close"\n            data-dismiss="modal"\n            type="button"\n            aria-label="Close"\n            (click)="close()"\n          >\n            ×\n          </button>\n        </div>\n        <div class="modal-body">\n          <ng-container *ngTemplateOutlet="body"></ng-container>\n        </div>\n        <div class="modal-footer">\n          <ng-container *ngTemplateOutlet="footer"></ng-container>\n        </div>\n      </div>\n    </div>\n  </div>\n}\n',
      styles: [":host ::ng-deep modal .modal{display:flex;flex:1;align-items:center;justify-content:center}:host ::ng-deep .modal{position:fixed;top:0;left:0;width:100%;min-height:100%;background-color:#00000026;z-index:42}:host ::ng-deep .modal.in{opacity:1}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: Renderer2
  }], {
    header: [{
      type: ContentChild,
      args: ["modalHeader"]
    }],
    body: [{
      type: ContentChild,
      args: ["modalBody"]
    }],
    footer: [{
      type: ContentChild,
      args: ["modalFooter"]
    }],
    closeOnOutsideClick: [{
      type: Input
    }],
    closeOnEscape: [{
      type: Input
    }],
    customClass: [{
      type: Input
    }],
    hideCloseButton: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    onContainerClicked: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }],
    onKeyDownHandler: [{
      type: HostListener,
      args: ["document:keydown", ["$event"]]
    }]
  });
})();
export {
  NgxCustomModalComponent
};
//# sourceMappingURL=ngx-custom-modal.js.map
