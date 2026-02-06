import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-SS62QQNN.js";
import "./chunk-MJFKGM26.js";
import "./chunk-4MWRP73S.js";

// node_modules/headlessui-angular/fesm2020/headlessui-angular.mjs
var id = 1;
var generateId = () => id++;
var MenuDirective = class {
  constructor(renderer, changeDetection) {
    this.renderer = renderer;
    this.changeDetection = changeDetection;
    this.static = false;
    this.expanded = false;
    this.menuItems = [];
    this.activeItem = null;
    this.searchQuery = "";
    this.searchDebounce = null;
  }
  toggle(focusAfterExpand = null, focusButtonOnClose = true) {
    if (this.expanded) {
      this.expanded = false;
      this.menuItemsPanel.collapse();
      this.menuButton.element.removeAttribute("aria-controls");
      this.menuButton.element.removeAttribute("expanded");
      this.menuItems = [];
      this.activeItem = null;
      this.windowClickUnlisten();
      if (focusButtonOnClose) {
        this.menuButton.focus();
      }
      this.changeDetection.markForCheck();
    } else {
      this.expanded = true;
      this.changeDetection.markForCheck();
      setTimeout(() => {
        this.menuItemsPanel.expand();
        this.menuItemsPanel.focus();
        if (this.menuItemsPanel.element != null) {
          this.menuButton.element.setAttribute("aria-controls", this.menuItemsPanel.element.id);
        }
        this.menuButton.element.setAttribute("expanded", "true");
        this.windowClickUnlisten = this.initListeners();
        if (focusAfterExpand) {
          setTimeout(() => this.focusItem(focusAfterExpand));
        }
      });
    }
  }
  focusItem(focusType) {
    const activeItem = this.calculateFocusedItem(focusType);
    if (activeItem === this.activeItem) {
      return;
    }
    this.activeItem = activeItem;
    this.menuItems.forEach((item) => {
      if (this.activeItem) {
        this.menuItemsPanel.element?.setAttribute("aria-activedescendant", this.activeItem.element.id);
      } else {
        this.menuItemsPanel.element?.removeAttribute("aria-activedescendant");
      }
      item.setActive(item === this.activeItem);
    });
  }
  clickActive() {
    this.activeItem?.element.click();
  }
  search(value) {
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }
    this.searchDebounce = setTimeout(() => this.searchQuery = "", 350);
    this.searchQuery += value.toLocaleLowerCase();
    const matchingItem = this.menuItems.find((item) => {
      const itemText = item.element.textContent?.trim().toLocaleLowerCase();
      return itemText?.startsWith(this.searchQuery) && !item.hlMenuItemDisabled;
    });
    if (matchingItem === void 0 || matchingItem === this.activeItem) {
      return;
    }
    this.focusItem({
      kind: "FocusSpecific",
      item: matchingItem
    });
  }
  calculateFocusedItem(focusType) {
    const enabledItems = this.menuItems.filter((item) => !item.hlMenuItemDisabled);
    switch (focusType.kind) {
      case "FocusSpecific":
        return focusType.item;
      case "FocusNothing":
        return null;
      case "FocusFirst":
        return enabledItems[0];
      case "FocusLast":
        return enabledItems[enabledItems.length - 1];
      case "FocusNext":
        if (this.activeItem === null) {
          return enabledItems[0];
        } else {
          const nextIndex = Math.min(enabledItems.indexOf(this.activeItem) + 1, enabledItems.length - 1);
          return enabledItems[nextIndex];
        }
      case "FocusPrevious":
        if (this.activeItem === null) {
          return enabledItems[enabledItems.length - 1];
        } else {
          const previousIndex = Math.max(enabledItems.indexOf(this.activeItem) - 1, 0);
          return enabledItems[previousIndex];
        }
    }
  }
  initListeners() {
    return this.renderer.listen(window, "click", (event) => {
      const target = event.target;
      const active = document.activeElement;
      if (this.menuButton.element.contains(target) || this.menuItemsPanel?.element?.contains(target)) {
        return;
      }
      const clickedTargetIsFocusable = active !== document.body && active?.contains(target);
      this.toggle(null, !clickedTargetIsFocusable);
    });
  }
};
MenuDirective.ɵfac = function MenuDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MenuDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef));
};
MenuDirective.ɵdir = ɵɵdefineDirective({
  type: MenuDirective,
  selectors: [["", "hlMenu", ""]],
  inputs: {
    static: "static"
  },
  exportAs: ["hlMenu"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuDirective, [{
    type: Directive,
    args: [{
      selector: "[hlMenu]",
      exportAs: "hlMenu"
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    static: [{
      type: Input
    }]
  });
})();
var MenuButtonDirective = class {
  constructor(elementRef, menu, renderer) {
    this.menu = menu;
    this.renderer = renderer;
    this.element = elementRef.nativeElement;
    menu.menuButton = this;
  }
  ngOnInit() {
    this.initAttributes(this.element);
    this.renderer.listen(this.element, "click", () => {
      this.menu.toggle();
    });
    this.renderer.listen(this.element, "keydown", (event) => {
      switch (event.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
          event.preventDefault();
          this.menu.toggle({
            kind: "FocusFirst"
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          this.menu.toggle({
            kind: "FocusLast"
          });
          break;
      }
    });
  }
  focus() {
    setTimeout(() => this.element?.focus());
  }
  initAttributes(element) {
    element.id = `headlessui-menu-button-${generateId()}`;
    element.setAttribute("type", "button");
    element.setAttribute("aria-haspopup", "true");
  }
};
MenuButtonDirective.ɵfac = function MenuButtonDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MenuButtonDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(MenuDirective), ɵɵdirectiveInject(Renderer2));
};
MenuButtonDirective.ɵdir = ɵɵdefineDirective({
  type: MenuButtonDirective,
  selectors: [["", "hlMenuButton", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuButtonDirective, [{
    type: Directive,
    args: [{
      selector: "[hlMenuButton]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: MenuDirective
    }, {
      type: Renderer2
    }];
  }, null);
})();
var MenuItemsPanelDirective = class {
  constructor(templateRef, viewContainerRef, menu, renderer) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.menu = menu;
    this.renderer = renderer;
    this.element = null;
    this.menu.menuItemsPanel = this;
  }
  ngOnInit() {
    if (this.menu.static) {
      this.expandInternal();
    }
  }
  expand() {
    if (!this.menu.static) {
      this.expandInternal();
    }
  }
  collapse() {
    if (!this.menu.static) {
      this.viewContainerRef.clear();
      this.element = null;
    }
  }
  focus() {
    this.element?.focus({
      preventScroll: true
    });
  }
  expandInternal() {
    const view = this.viewContainerRef.createEmbeddedView(this.templateRef);
    const element = view.rootNodes[0];
    this.initAttributes(element);
    this.initListeners(element);
    this.element = element;
    view.markForCheck();
  }
  initAttributes(element) {
    element.tabIndex = -1;
    element.id = `headlessui-menu-items-${generateId()}`;
    element.setAttribute("role", "menu");
    element.setAttribute("aria-labelledby", this.menu.menuButton.element.id);
  }
  initListeners(element) {
    this.renderer.listen(element, "keydown", (event) => {
      switch (event.key) {
        case " ":
          if (this.menu.searchQuery !== "") {
            event.preventDefault();
            this.menu.search(event.key);
          } else {
            event.preventDefault();
            this.menu.clickActive();
          }
          break;
        case "Enter":
          event.preventDefault();
          this.menu.clickActive();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.menu.focusItem({
            kind: "FocusNext"
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          this.menu.focusItem({
            kind: "FocusPrevious"
          });
          break;
        case "Home":
        case "PageUp":
          event.preventDefault();
          this.menu.focusItem({
            kind: "FocusFirst"
          });
          break;
        case "End":
        case "PageDown":
          event.preventDefault();
          this.menu.focusItem({
            kind: "FocusLast"
          });
          break;
        case "Escape":
          event.preventDefault();
          this.menu.toggle();
          break;
        case "Tab":
          event.preventDefault();
          break;
        default:
          if (event.key.length === 1) {
            this.menu.search(event.key);
          }
      }
    });
  }
};
MenuItemsPanelDirective.ɵfac = function MenuItemsPanelDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MenuItemsPanelDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(MenuDirective), ɵɵdirectiveInject(Renderer2));
};
MenuItemsPanelDirective.ɵdir = ɵɵdefineDirective({
  type: MenuItemsPanelDirective,
  selectors: [["", "hlMenuItems", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuItemsPanelDirective, [{
    type: Directive,
    args: [{
      selector: "[hlMenuItems]"
    }]
  }], function() {
    return [{
      type: TemplateRef
    }, {
      type: ViewContainerRef
    }, {
      type: MenuDirective
    }, {
      type: Renderer2
    }];
  }, null);
})();
var MenuItemDirective = class {
  constructor(templateRef, viewContainerRef, menu, renderer) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.menu = menu;
    this.renderer = renderer;
    this.hlMenuItemDisabled = false;
    this.context = {
      active: false
    };
    this.menu.menuItems.push(this);
  }
  ngOnInit() {
    this.view = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.context
    });
    this.element = this.view.rootNodes[0];
    this.initAttributes(this.element);
    this.initListeners(this.element);
  }
  setActive(active) {
    this.context.active = active;
    this.view.markForCheck();
  }
  initAttributes(element) {
    element.id = `headlessui-menu-item-${generateId()}`;
    element.tabIndex = -1;
    element.setAttribute("role", "menuitem");
    if (this.hlMenuItemDisabled) {
      this.element.setAttribute("aria-disabled", "true");
    } else {
      this.element.removeAttribute("aria-disabled");
    }
  }
  initListeners(element) {
    this.renderer.listen(element, "pointermove", () => this.menu.focusItem({
      kind: "FocusSpecific",
      item: this
    }));
    this.renderer.listen(element, "pointerleave", () => this.menu.focusItem({
      kind: "FocusNothing"
    }));
    this.renderer.listen(element, "click", (event) => {
      if (this.hlMenuItemDisabled) {
        event.preventDefault();
        return;
      }
      this.menu.toggle();
    });
  }
};
MenuItemDirective.ɵfac = function MenuItemDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MenuItemDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(MenuDirective), ɵɵdirectiveInject(Renderer2));
};
MenuItemDirective.ɵdir = ɵɵdefineDirective({
  type: MenuItemDirective,
  selectors: [["", "hlMenuItem", ""]],
  inputs: {
    hlMenuItemDisabled: "hlMenuItemDisabled"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuItemDirective, [{
    type: Directive,
    args: [{
      selector: "[hlMenuItem]"
    }]
  }], function() {
    return [{
      type: TemplateRef
    }, {
      type: ViewContainerRef
    }, {
      type: MenuDirective
    }, {
      type: Renderer2
    }];
  }, {
    hlMenuItemDisabled: [{
      type: Input
    }]
  });
})();
var MenuModule = class {
};
MenuModule.ɵfac = function MenuModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MenuModule)();
};
MenuModule.ɵmod = ɵɵdefineNgModule({
  type: MenuModule,
  declarations: [MenuDirective, MenuButtonDirective, MenuItemsPanelDirective, MenuItemDirective],
  exports: [MenuDirective, MenuButtonDirective, MenuItemsPanelDirective, MenuItemDirective]
});
MenuModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuModule, [{
    type: NgModule,
    args: [{
      imports: [],
      exports: [MenuDirective, MenuButtonDirective, MenuItemsPanelDirective, MenuItemDirective],
      declarations: [MenuDirective, MenuButtonDirective, MenuItemsPanelDirective, MenuItemDirective],
      providers: []
    }]
  }], null, null);
})();
var ListboxDirective = class {
  constructor(renderer, changeDetection) {
    this.renderer = renderer;
    this.changeDetection = changeDetection;
    this.static = false;
    this.value = null;
    this.valueChange = new EventEmitter();
    this.expanded = false;
    this.listboxOptions = [];
    this.activeOption = null;
    this.searchQuery = "";
    this.searchDebounce = null;
  }
  toggle(focusAfterExpand = null, focusButtonOnClose = true) {
    if (this.expanded) {
      this.expanded = false;
      this.listboxOptionsPanel.collapse();
      this.listboxButton.element.removeAttribute("aria-controls");
      this.listboxButton.element.removeAttribute("expanded");
      this.listboxOptions = [];
      this.activeOption = null;
      this.windowClickUnlisten();
      if (focusButtonOnClose) {
        this.listboxButton.focus();
      }
      this.changeDetection.markForCheck();
    } else {
      this.expanded = true;
      this.changeDetection.markForCheck();
      setTimeout(() => {
        this.listboxOptionsPanel.expand();
        this.listboxOptionsPanel.focus();
        if (this.listboxOptionsPanel.element != null) {
          this.listboxButton.element.setAttribute("aria-controls", this.listboxOptionsPanel.element.id);
        }
        this.listboxButton.element.setAttribute("expanded", "true");
        this.windowClickUnlisten = this.initListeners();
        if (focusAfterExpand) {
          setTimeout(() => this.focusOption(focusAfterExpand));
        }
      });
    }
  }
  select(value) {
    this.valueChange.emit(value);
    this.listboxOptions.forEach((option) => {
      option.select(option.hlListboxOptionValue === value);
    });
  }
  isSelected(value) {
    return this.value === value;
  }
  focusOption(focusType) {
    const activeOption = this.calculateFocusedOption(focusType);
    if (activeOption === this.activeOption) {
      return;
    }
    this.activeOption = activeOption;
    this.listboxOptions.forEach((option) => {
      if (this.activeOption) {
        this.listboxOptionsPanel.element?.setAttribute("aria-activedescendant", this.activeOption.element.id);
      } else {
        this.listboxOptionsPanel.element?.removeAttribute("aria-activedescendant");
      }
      option.setActive(option === this.activeOption);
    });
  }
  clickActive() {
    this.activeOption?.element.click();
  }
  search(value) {
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }
    this.searchDebounce = setTimeout(() => this.searchQuery = "", 350);
    this.searchQuery += value.toLocaleLowerCase();
    const matchingOption = this.listboxOptions.find((option) => {
      const optionText = option.element.textContent?.trim().toLocaleLowerCase();
      return optionText?.startsWith(this.searchQuery) && !option.hlListboxOptionDisabled;
    });
    if (matchingOption === void 0 || matchingOption === this.activeOption) {
      return;
    }
    this.focusOption({
      kind: "FocusSpecific",
      option: matchingOption
    });
  }
  calculateFocusedOption(focusType) {
    const enabledOptions = this.listboxOptions.filter((option) => !option.hlListboxOptionDisabled);
    switch (focusType.kind) {
      case "FocusSpecific":
        return focusType.option;
      case "FocusValue":
        const option = this.listboxOptions.find((o) => o.hlListboxOptionValue === focusType.value);
        if (option) {
          return option;
        }
        return null;
      case "FocusNothing":
        return null;
      case "FocusFirst":
        return enabledOptions[0];
      case "FocusLast":
        return enabledOptions[enabledOptions.length - 1];
      case "FocusNext":
        if (this.activeOption === null) {
          return enabledOptions[0];
        } else {
          const nextIndex = Math.min(enabledOptions.indexOf(this.activeOption) + 1, enabledOptions.length - 1);
          return enabledOptions[nextIndex];
        }
      case "FocusPrevious":
        if (this.activeOption === null) {
          return enabledOptions[enabledOptions.length - 1];
        } else {
          const previousIndex = Math.max(enabledOptions.indexOf(this.activeOption) - 1, 0);
          return enabledOptions[previousIndex];
        }
    }
  }
  initListeners() {
    return this.renderer.listen(window, "click", (event) => {
      const target = event.target;
      const active = document.activeElement;
      if (this.listboxButton.element.contains(target) || this.listboxOptionsPanel?.element?.contains(target)) {
        return;
      }
      const clickedTargetIsFocusable = active !== document.body && active?.contains(target);
      this.toggle(null, !clickedTargetIsFocusable);
    });
  }
};
ListboxDirective.ɵfac = function ListboxDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ListboxDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef));
};
ListboxDirective.ɵdir = ɵɵdefineDirective({
  type: ListboxDirective,
  selectors: [["", "hlListbox", ""]],
  inputs: {
    static: "static",
    value: "value"
  },
  outputs: {
    valueChange: "valueChange"
  },
  exportAs: ["[hlListbox]"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListboxDirective, [{
    type: Directive,
    args: [{
      selector: "[hlListbox]",
      exportAs: "[hlListbox]"
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    static: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    valueChange: [{
      type: Output
    }]
  });
})();
var ListboxButtonDirective = class {
  constructor(elementRef, listbox, renderer) {
    this.listbox = listbox;
    this.renderer = renderer;
    this.element = elementRef.nativeElement;
    listbox.listboxButton = this;
  }
  ngOnInit() {
    this.initAttributes(this.element);
    this.renderer.listen(this.element, "click", () => {
      this.listbox.toggle();
    });
    this.renderer.listen(this.element, "keydown", (event) => {
      switch (event.key) {
        case " ":
        case "Enter":
        case "ArrowDown":
          event.preventDefault();
          if (this.listbox.value) {
            this.listbox.toggle({
              kind: "FocusValue",
              value: this.listbox.value
            });
          } else {
            this.listbox.toggle({
              kind: "FocusFirst"
            });
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (this.listbox.value) {
            this.listbox.toggle({
              kind: "FocusValue",
              value: this.listbox.value
            });
          } else {
            this.listbox.toggle({
              kind: "FocusPrevious"
            });
          }
          break;
      }
    });
  }
  focus() {
    setTimeout(() => this.element?.focus());
  }
  initAttributes(element) {
    element.id = `headlessui-listbox-button-${generateId()}`;
    element.setAttribute("type", "button");
    element.setAttribute("aria-haspopup", "true");
  }
};
ListboxButtonDirective.ɵfac = function ListboxButtonDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ListboxButtonDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ListboxDirective), ɵɵdirectiveInject(Renderer2));
};
ListboxButtonDirective.ɵdir = ɵɵdefineDirective({
  type: ListboxButtonDirective,
  selectors: [["", "hlListboxButton", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListboxButtonDirective, [{
    type: Directive,
    args: [{
      selector: "[hlListboxButton]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: ListboxDirective
    }, {
      type: Renderer2
    }];
  }, null);
})();
var ListboxOptionsPanelDirective = class {
  constructor(templateRef, viewContainerRef, listbox, renderer) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.listbox = listbox;
    this.renderer = renderer;
    this.element = null;
    this.listbox.listboxOptionsPanel = this;
  }
  ngOnInit() {
    if (this.listbox.static) {
      this.expandInternal();
    }
  }
  expand() {
    if (!this.listbox.static) {
      this.expandInternal();
    }
  }
  collapse() {
    if (!this.listbox.static) {
      this.viewContainerRef.clear();
      this.element = null;
    }
  }
  focus() {
    this.element?.focus({
      preventScroll: true
    });
  }
  expandInternal() {
    const view = this.viewContainerRef.createEmbeddedView(this.templateRef);
    const element = view.rootNodes[0];
    this.initAttributes(element);
    this.initListeners(element);
    this.element = element;
    view.markForCheck();
  }
  initAttributes(element) {
    element.tabIndex = -1;
    element.id = `headlessui-listbox-options-${generateId()}`;
    element.setAttribute("role", "listbox");
    element.setAttribute("aria-labelledby", this.listbox.listboxButton.element.id);
  }
  initListeners(element) {
    this.renderer.listen(element, "keydown", (event) => {
      switch (event.key) {
        case " ":
          if (this.listbox.searchQuery !== "") {
            event.preventDefault();
            this.listbox.search(event.key);
          } else {
            event.preventDefault();
            this.listbox.clickActive();
          }
          break;
        case "Enter":
          event.preventDefault();
          this.listbox.clickActive();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.listbox.focusOption({
            kind: "FocusNext"
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          this.listbox.focusOption({
            kind: "FocusPrevious"
          });
          break;
        case "Home":
        case "PageUp":
          event.preventDefault();
          this.listbox.focusOption({
            kind: "FocusFirst"
          });
          break;
        case "End":
        case "PageDown":
          event.preventDefault();
          this.listbox.focusOption({
            kind: "FocusLast"
          });
          break;
        case "Escape":
          event.preventDefault();
          this.listbox.toggle();
          break;
        case "Tab":
          event.preventDefault();
          break;
        default:
          if (event.key.length === 1) {
            this.listbox.search(event.key);
          }
      }
    });
  }
};
ListboxOptionsPanelDirective.ɵfac = function ListboxOptionsPanelDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ListboxOptionsPanelDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ListboxDirective), ɵɵdirectiveInject(Renderer2));
};
ListboxOptionsPanelDirective.ɵdir = ɵɵdefineDirective({
  type: ListboxOptionsPanelDirective,
  selectors: [["", "hlListboxOptions", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListboxOptionsPanelDirective, [{
    type: Directive,
    args: [{
      selector: "[hlListboxOptions]"
    }]
  }], function() {
    return [{
      type: TemplateRef
    }, {
      type: ViewContainerRef
    }, {
      type: ListboxDirective
    }, {
      type: Renderer2
    }];
  }, null);
})();
var ListboxOptionDirective = class {
  constructor(templateRef, viewContainerRef, listbox, renderer) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.listbox = listbox;
    this.renderer = renderer;
    this.hlListboxOptionDisabled = false;
    this.hlListboxOptionValue = null;
    this.context = {
      active: false,
      selected: false
    };
    this.listbox.listboxOptions.push(this);
  }
  ngOnInit() {
    this.context.selected = this.listbox.isSelected(this.hlListboxOptionValue);
    this.view = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: this.context
    });
    this.element = this.view.rootNodes[0];
    this.initAttributes(this.element);
    this.initListeners(this.element);
  }
  setActive(active) {
    this.context.active = active;
    this.view.markForCheck();
  }
  select(selected) {
    this.context.selected = selected;
    this.view.markForCheck();
  }
  initAttributes(element) {
    element.id = `headlessui-listbox-option-${generateId()}`;
    element.tabIndex = -1;
    element.setAttribute("role", "listboxoption");
    if (this.hlListboxOptionDisabled) {
      this.element.setAttribute("aria-disabled", "true");
    } else {
      this.element.removeAttribute("aria-disabled");
    }
  }
  initListeners(element) {
    this.renderer.listen(element, "pointermove", () => this.listbox.focusOption({
      kind: "FocusSpecific",
      option: this
    }));
    this.renderer.listen(element, "pointerleave", () => this.listbox.focusOption({
      kind: "FocusNothing"
    }));
    this.renderer.listen(element, "click", (event) => {
      if (this.hlListboxOptionDisabled) {
        event.preventDefault();
        return;
      }
      this.listbox.select(this.hlListboxOptionValue);
      this.listbox.toggle();
    });
  }
};
ListboxOptionDirective.ɵfac = function ListboxOptionDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ListboxOptionDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ListboxDirective), ɵɵdirectiveInject(Renderer2));
};
ListboxOptionDirective.ɵdir = ɵɵdefineDirective({
  type: ListboxOptionDirective,
  selectors: [["", "hlListboxOption", ""]],
  inputs: {
    hlListboxOptionDisabled: "hlListboxOptionDisabled",
    hlListboxOptionValue: "hlListboxOptionValue"
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListboxOptionDirective, [{
    type: Directive,
    args: [{
      selector: "[hlListboxOption]"
    }]
  }], function() {
    return [{
      type: TemplateRef
    }, {
      type: ViewContainerRef
    }, {
      type: ListboxDirective
    }, {
      type: Renderer2
    }];
  }, {
    hlListboxOptionDisabled: [{
      type: Input
    }],
    hlListboxOptionValue: [{
      type: Input
    }]
  });
})();
var ListboxModule = class {
};
ListboxModule.ɵfac = function ListboxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ListboxModule)();
};
ListboxModule.ɵmod = ɵɵdefineNgModule({
  type: ListboxModule,
  declarations: [ListboxDirective, ListboxButtonDirective, ListboxOptionsPanelDirective, ListboxOptionDirective],
  exports: [ListboxDirective, ListboxButtonDirective, ListboxOptionsPanelDirective, ListboxOptionDirective]
});
ListboxModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListboxModule, [{
    type: NgModule,
    args: [{
      imports: [],
      exports: [ListboxDirective, ListboxButtonDirective, ListboxOptionsPanelDirective, ListboxOptionDirective],
      declarations: [ListboxDirective, ListboxButtonDirective, ListboxOptionsPanelDirective, ListboxOptionDirective],
      providers: []
    }]
  }], null, null);
})();
var TransitionDirective = class {
  constructor(viewContainer, templateRef, changeDetection) {
    this.viewContainer = viewContainer;
    this.templateRef = templateRef;
    this.changeDetection = changeDetection;
    this.viewRef = null;
    this.cancelLeaveAnimation = true;
    this.enterClasses = [];
    this.enterFromClasses = [];
    this.enterToClasses = [];
    this.leaveClasses = [];
    this.leaveFromClasses = [];
    this.leaveToClasses = [];
    this.initial = true;
  }
  set hlTransitionEnter(classes) {
    this.enterClasses = splitClasses(classes);
  }
  set hlTransitionEnterFrom(classes) {
    this.enterFromClasses = splitClasses(classes);
  }
  set hlTransitionEnterTo(classes) {
    this.enterToClasses = splitClasses(classes);
  }
  set hlTransitionLeave(classes) {
    this.leaveClasses = splitClasses(classes);
  }
  set hlTransitionLeaveFrom(classes) {
    this.leaveFromClasses = splitClasses(classes);
  }
  set hlTransitionLeaveTo(classes) {
    this.leaveToClasses = splitClasses(classes);
  }
  set hlTransition(show) {
    if (show) {
      this.cancelLeaveAnimation = true;
      if (this.viewRef) {
        const element2 = this.viewRef.rootNodes[0];
        element2.classList.remove(...this.leaveClasses, ...this.leaveFromClasses, ...this.leaveToClasses);
      } else {
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        if (this.initial) {
          this.initial = false;
          return;
        }
      }
      this.changeDetection.markForCheck();
      const element = this.viewRef.rootNodes[0];
      element.classList.add(...this.enterFromClasses);
      requestAnimationFrame(() => {
        element.classList.remove(...this.enterFromClasses);
        element.classList.add(...this.enterClasses, ...this.enterToClasses);
      });
    } else {
      if (this.initial) {
        this.initial = false;
        return;
      }
      if (!this.viewRef) {
        console.error("viewRef not set");
        return;
      }
      this.cancelLeaveAnimation = false;
      const element = this.viewRef.rootNodes[0];
      element.classList.remove(...this.enterClasses, ...this.enterToClasses);
      element.classList.add(...this.leaveClasses, ...this.leaveFromClasses);
      const duration = getDuration(element);
      requestAnimationFrame(() => {
        element.classList.remove(...this.leaveFromClasses);
        element.classList.add(...this.leaveToClasses);
        setTimeout(() => {
          if (this.cancelLeaveAnimation) {
            return;
          }
          this.viewContainer.clear();
          this.viewRef = null;
        }, duration);
      });
    }
  }
};
TransitionDirective.ɵfac = function TransitionDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TransitionDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ChangeDetectorRef));
};
TransitionDirective.ɵdir = ɵɵdefineDirective({
  type: TransitionDirective,
  selectors: [["", "hlTransition", ""]],
  inputs: {
    hlTransitionEnter: "hlTransitionEnter",
    hlTransitionEnterFrom: "hlTransitionEnterFrom",
    hlTransitionEnterTo: "hlTransitionEnterTo",
    hlTransitionLeave: "hlTransitionLeave",
    hlTransitionLeaveFrom: "hlTransitionLeaveFrom",
    hlTransitionLeaveTo: "hlTransitionLeaveTo",
    hlTransition: "hlTransition"
  },
  exportAs: ["hlTransition"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransitionDirective, [{
    type: Directive,
    args: [{
      selector: "[hlTransition]",
      exportAs: "hlTransition"
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: TemplateRef
    }, {
      type: ChangeDetectorRef
    }];
  }, {
    hlTransitionEnter: [{
      type: Input
    }],
    hlTransitionEnterFrom: [{
      type: Input
    }],
    hlTransitionEnterTo: [{
      type: Input
    }],
    hlTransitionLeave: [{
      type: Input
    }],
    hlTransitionLeaveFrom: [{
      type: Input
    }],
    hlTransitionLeaveTo: [{
      type: Input
    }],
    hlTransition: [{
      type: Input
    }]
  });
})();
var TransitionModule = class {
};
TransitionModule.ɵfac = function TransitionModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TransitionModule)();
};
TransitionModule.ɵmod = ɵɵdefineNgModule({
  type: TransitionModule,
  declarations: [TransitionDirective],
  exports: [TransitionDirective]
});
TransitionModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransitionModule, [{
    type: NgModule,
    args: [{
      imports: [],
      exports: [TransitionDirective],
      declarations: [TransitionDirective],
      providers: []
    }]
  }], null, null);
})();
function splitClasses(classes) {
  return classes.split(" ").filter((className) => className.trim().length > 1);
}
function getDuration(element) {
  let {
    transitionDuration,
    transitionDelay
  } = getComputedStyle(element);
  let [durationMs, delayMs] = [transitionDuration, transitionDelay].map((value) => {
    let [resolvedValue = 0] = value.split(",").filter(Boolean).map((v) => v.includes("ms") ? parseFloat(v) : parseFloat(v) * 1e3).sort((a, z) => z - a);
    return resolvedValue;
  });
  return durationMs + delayMs;
}
export {
  ListboxButtonDirective,
  ListboxDirective,
  ListboxModule,
  ListboxOptionDirective,
  ListboxOptionsPanelDirective,
  MenuButtonDirective,
  MenuDirective,
  MenuItemDirective,
  MenuItemsPanelDirective,
  MenuModule,
  TransitionDirective,
  TransitionModule
};
//# sourceMappingURL=headlessui-angular.js.map
